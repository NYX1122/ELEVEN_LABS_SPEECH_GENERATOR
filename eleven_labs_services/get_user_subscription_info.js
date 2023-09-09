const axios = require('axios');
const elevenLabsAPI = 'https://api.elevenlabs.io/v1';

async function getUserSubscriptionInfo(apiKey) {
  const URL = `${elevenLabsAPI}/user/subscription`;

  try {
    console.log('Fetching subscription information...');
    const response = await axios({
      method: 'GET',
      url: URL,
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    });
    console.log('Subscription information has been fetched!');
    return response.data;
  } catch (error) {
    console.error('Error fetching subscription information:', error);
    throw error;
  }
}

module.exports = getUserSubscriptionInfo;
