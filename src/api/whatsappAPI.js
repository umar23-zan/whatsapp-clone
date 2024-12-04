import axios from 'axios';

const sendWhatsAppMessage = async (to, templateName) => {
  try {
    const response = await axios.post('http://localhost:5000/send-message', {
      to,
      templateName,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default sendWhatsAppMessage;
