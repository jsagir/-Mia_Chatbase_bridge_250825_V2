const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  try {
    const CHATBASE_API_KEY = process.env.CHATBASE_API_KEY || '41d825f9-ed60-40ce-ba5e-ff9e5cf2f21d';
    const CHATBOT_ID = process.env.CHATBOT_ID || 'MNPuL5RkxOrS4SeEetwE6';
    
    // Try different Chatbase API endpoints to diagnose
    const tests = [];
    
    // Test 1: Try to get chatbot info
    try {
      const chatbotInfo = await axios.get(
        `https://www.chatbase.co/api/v1/chatbot/${CHATBOT_ID}`,
        {
          headers: {
            'Authorization': `Bearer ${CHATBASE_API_KEY}`
          },
          timeout: 5000
        }
      );
      tests.push({
        test: 'Get Chatbot Info',
        status: 'success',
        data: chatbotInfo.data
      });
    } catch (error) {
      tests.push({
        test: 'Get Chatbot Info',
        status: 'failed',
        error: error.response?.data || error.message
      });
    }
    
    // Test 2: Try a minimal chat request
    try {
      const chatResponse = await axios.post(
        'https://www.chatbase.co/api/v1/chat',
        {
          chatbotId: CHATBOT_ID,
          messages: [
            {
              role: 'user',
              content: 'test'
            }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${CHATBASE_API_KEY}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );
      tests.push({
        test: 'Minimal Chat Request',
        status: 'success',
        data: chatResponse.data
      });
    } catch (error) {
      tests.push({
        test: 'Minimal Chat Request',
        status: 'failed',
        error: error.response?.data || error.message,
        statusCode: error.response?.status
      });
    }
    
    // Test 3: Try without chatbotId in body
    try {
      const altResponse = await axios.post(
        `https://www.chatbase.co/api/v1/chat/${CHATBOT_ID}`,
        {
          messages: [
            {
              role: 'user',
              content: 'test'
            }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${CHATBASE_API_KEY}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );
      tests.push({
        test: 'Chat with ID in URL',
        status: 'success',
        data: altResponse.data
      });
    } catch (error) {
      tests.push({
        test: 'Chat with ID in URL',
        status: 'failed',
        error: error.response?.data || error.message,
        statusCode: error.response?.status
      });
    }
    
    return res.status(200).json({
      diagnosis: 'Chatbase API Diagnostic',
      credentials: {
        apiKey: CHATBASE_API_KEY.substring(0, 8) + '...',
        chatbotId: CHATBOT_ID
      },
      tests: tests,
      recommendation: 'Check which test passes to understand the correct API format'
    });
    
  } catch (error) {
    return res.status(500).json({
      error: 'Diagnostic failed',
      details: error.message
    });
  }
};