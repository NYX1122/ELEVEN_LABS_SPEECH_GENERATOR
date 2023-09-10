const logger = require('loggers');
const axios = require('axios');

async function getUserSubscriptionInfo({ apiKey, elevenLabsApi }) {
  const URL = `${elevenLabsApi}/user/subscription`;

  try {
    logger.initialize('Fetching subscription information...');
    const response = await axios({
      method: 'GET',
      url: URL,
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    });
    logger.success('Subscription information has been fetched!');
    return response.data;
  } catch (error) {
    logger.error('Error fetching subscription information:', error);
    throw error;
  }
}

async function getGeneratedAudio(
  {
    apiKey,
    voiceID,
    elevenLabsApi,
    stability,
    similarityBoost,
    style,
    speakerBoost,
    modelId,
  },
  text
) {
  const voiceURL = `${elevenLabsApi}/text-to-speech/${voiceID}/stream`;

  try {
    logger.initialize('Fetching speech audio...');
    const response = await axios({
      method: 'POST',
      url: voiceURL,
      data: {
        text: text,
        voice_settings: {
          similarity_boost: similarityBoost,
          stability,
          style,
          use_speaker_boost: speakerBoost,
        },
        model_id: modelId,
      },
      headers: {
        Accept: 'audio/mpeg',
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      responseType: 'stream',
    });
    if (!response.data) {
      throw new Error('No data received from the API.');
    }
    logger.success('Audio has been fetched!');
    return response;
  } catch (error) {
    logger.error('Error fetching speech audio:', error);
    throw error;
  }
}

module.exports = { getUserSubscriptionInfo, getGeneratedAudio };
