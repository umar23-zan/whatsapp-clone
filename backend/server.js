const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post('/send-message', async (req, res) => {
  try {
    const { to, templateName } = req.body;

    // Replace the following URL and headers with your API configuration
    const response = await axios.post('https://graph.facebook.com/v17.0/488012394399398/messages', {
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: templateName,
        language: { code: 'en_US' },
      },
    }, {
      headers: {
        Authorization: `Bearer EAAPhRwaTRvABOwfZCuyFZAz7PtKZAQfLux2RgD3R6tih95EBz6nqMYgPMI5wRaitUGslONsEYLabvseiJDP0SEQ03NXeHFrkRXsL7T57NdarbjVEzZCaNxwuokBCe5FQOGs63smNZAVxzEsUdePQ8NUjQHhbdppZBfZC2TdsTuqfRFcZCE8h2yCSx4kbwgFoOG4GmpUyrZCgJzBYkGaogzxBqs7uZAJZAcZD`,
        'Content-Type': 'application/json',
      },
    });

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);

    // Improved error handling
    const errorMessage = error.response
      ? error.response.data
      : error.message || 'Unknown error occurred';

    res.status(500).json({ success: false, error: errorMessage });
  }
});

// Verification endpoint for webhook
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = 'my_secure_verify_token_23102002';
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified successfully!');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Endpoint to receive webhook events
app.post('/webhook', (req, res) => {
  console.log('Webhook event received:', req.body);

  // Process the webhook event
  res.sendStatus(200); // Respond to Meta to acknowledge receipt
});


app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
