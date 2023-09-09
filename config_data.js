const subscriptionInfoProcessor = require('./text_edit_services/edit/subscription_info_processors');
const promptGenerator = require('./text_edit_services/edit/prompt_generator');

module.exports = {
  pathToWatch: '../reception',
  apiKey: process.env.API_KEY,
  voiceID: process.env.VOICE_ID,
  stability: 0.35,
  similarityBoost: 0.8,
  style: 0.35,
  speakerBoost: true,
  modelId: 'eleven_multilingual_v2',
  subscriptionInfoProcessor,
  promptGenerator,
};
