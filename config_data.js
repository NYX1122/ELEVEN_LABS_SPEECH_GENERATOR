const path = require('path');

function subscriptionInfoProcessor(subscriptionInfo, processedCharacterCount) {
  const characterCount = subscriptionInfo.character_count;
  const characterLimit = subscriptionInfo.character_limit;
  const percentCharsUsed = Math.round((characterCount / characterLimit) * 100);
  const percentCharsUsedFuture = Math.round(
    ((characterCount + processedCharacterCount) / characterLimit) * 100
  );
  return {
    characterCount,
    characterLimit,
    percentCharsUsed,
    percentCharsUsedFuture,
    processedCharacterCount,
  };
}

function promptGenerator({
  characterCount,
  characterLimit,
  percentCharsUsed,
  percentCharsUsedFuture,
  processedCharacterCount,
}) {
  return (prompts = [
    {
      text:
        'You have used ' +
        percentCharsUsed +
        '% of your available characters for this month.',
    },
    {
      text:
        'That is ' +
        characterCount +
        ' of ' +
        characterLimit +
        ' total characters.',
    },
    {
      text:
        'If you proceed, you will be adding ' +
        processedCharacterCount +
        ' to your total used characters, raising your percentage to ' +
        percentCharsUsedFuture +
        '%, and your total used characters to ' +
        (characterCount + processedCharacterCount) +
        '.',
    },
    {
      text: 'Would you like to continue? (y) or (n)',
      needsAnswer: true,
    },
  ]);
}

module.exports = {
  folderToWatch: path.resolve('reception'),
  folderToOutput: path.resolve('output'),
  apiKey: process.env.API_KEY,
  voiceID: process.env.VOICE_ID,
  elevenLabsApi: 'https://api.elevenlabs.io/v1',
  stability: 0.35,
  similarityBoost: 0.8,
  style: 0.35,
  speakerBoost: true,
  modelId: 'eleven_multilingual_v2',
  subscriptionInfoProcessor,
  promptGenerator,
};
