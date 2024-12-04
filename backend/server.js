const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const API_URL = 'https://graph.facebook.com/v21.0/488012394399398/messages';
const ACCESS_TOKEN = 'EAAPhRwaTRvABOwfZCuyFZAz7PtKZAQfLux2RgD3R6tih95EBz6nqMYgPMI5wRaitUGslONsEYLabvseiJDP0SEQ03NXeHFrkRXsL7T57NdarbjVEzZCaNxwuokBCe5FQOGs63smNZAVxzEsUdePQ8NUjQHhbdppZBfZC2TdsTuqfRFcZCE8h2yCSx4kbwgFoOG4GmpUyrZCgJzBYkGaogzxBqs7uZAJZAcZD'; // Replace with your access token

app.post('/send-message', async (req, res) => {
  const { to, templateName } = req.body;

  const payload = {
    messaging_product: 'whatsapp',
    to,
    type: 'template',
    template: {
      name: templateName,
      language: {
        code: 'en_US'
      }
    }
  };

  try {
    const response = await axios.post(API_URL, payload, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.response.data });
  }
});

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
