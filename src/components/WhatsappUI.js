import React, { useState } from 'react';
import sendWhatsAppMessage from '../api/whatsappAPI';

function WhatsappUI() {
  const [phone, setPhone] = useState('');
  const [template, setTemplate] = useState('hello_world');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      // Call your API function here
      const response = await sendWhatsAppMessage(phone, template);
      setStatus({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
      setStatus({
        success: false,
        message: error.error || JSON.stringify(error) || 'Error sending message',
      });
    }
  };

  return (
    <div>
      <h1>Send WhatsApp Message</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Phone Number:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            required
          />
        </label>
        <br />
        <label>
          Template Name:
          <select value={template} onChange={(e) => setTemplate(e.target.value)}>
            <option value="hello_world">Hello World</option>
            {/* Add more template options here */}
          </select>
        </label>
        <br />
        <button type="submit">Send Message</button>
      </form>
      {status && (
  <p style={{ color: status.success ? 'green' : 'red' }}>
    {typeof status.message === 'string'
      ? status.message
      : JSON.stringify(status.message)} {/* Convert objects to strings */}
  </p>
)}
    </div>
  );
}

export default WhatsappUI;
