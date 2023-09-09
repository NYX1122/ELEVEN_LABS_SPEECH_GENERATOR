const axios = require('axios');
const elevenLabsAPI = 'https://api.elevenlabs.io/v1';

async function customTextToSpeech(
  { apiKey, voiceID, stability, similarityBoost, style, speakerBoost, modelId },
  text
) {
  const voiceURL = `${elevenLabsAPI}/text-to-speech/${voiceID}`;

  try {
    console.log('Fetching speech audio...');
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
    });
    console.log('Audio has been fetched!');
    return response.data;
  } catch (error) {
    console.error('Error fetching speech audio:', error);
    throw error;
  }
}

module.exports = customTextToSpeech;
