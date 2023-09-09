const getUserSubscriptionInfo = require('./eleven_labs_services/get_user_subscription_info');
const subscriptionInfoHandler = require('./handlers/subscription_info_handler');
const fetchHandler = require('./fetch_handler');

async function generateAndSaveAudio(text, configData) {
  const processedCharacterCount = text.length;
  try {
    console.log('Initializing audio generation...');

    const subscriptionInfo = await getUserSubscriptionInfo(configData.apiKey);

    await subscriptionInfoHandler(
      subscriptionInfo,
      processedCharacterCount,
      configData
    );

    await fetchHandler(configData, text);
  } catch (error) {
    console.error('Error generating audio:', error);
    throw error;
  }
}

module.exports = generateAndSaveAudio;
