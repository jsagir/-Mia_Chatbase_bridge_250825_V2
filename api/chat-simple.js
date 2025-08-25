const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }
  
  try {
    const CHATBASE_API_KEY = process.env.CHATBASE_API_KEY || '41d825f9-ed60-40ce-ba5e-ff9e5cf2f21d';
    const CHATBOT_ID = process.env.CHATBOT_ID || 'MNPuL5RkxOrS4SeEetwE6';
    
    const { message, conversation } = req.body;
    
    // Support both single message and conversation array
    let messages;
    if (message) {
      messages = [{ role: 'user', content: message }];
    } else if (conversation) {
      messages = conversation;
    } else {
      return res.status(400).json({ error: 'No message or conversation provided' });
    }
    
    // Try different API formats
    const requestBody = {
      messages: messages,
      chatbotId: CHATBOT_ID,
      stream: false,
      // Try adding these fields that might be required
      temperature: 0.7,
      model: "gpt-3.5-turbo"
    };
    
    console.log('Sending to Chatbase:', JSON.stringify(requestBody, null, 2));
    
    const response = await axios.post(
      'https://www.chatbase.co/api/v1/chat',
      requestBody,
      {
        headers: {
          'Authorization': `Bearer ${CHATBASE_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 30000
      }
    );
    
    const botResponse = response.data.text || response.data.answer || response.data.message || response.data;
    return res.status(200).json({ 
      response: botResponse,
      rawResponse: response.data 
    });
    
  } catch (error) {
    console.error('Error details:', error.response?.data || error.message);
    
    return res.status(error.response?.status || 500).json({
      error: 'Failed to get response',
      details: error.message,
      chatbaseError: error.response?.data,
      suggestion: 'Check if chatbot ID is correct and chatbot is published'
    });
  }
};