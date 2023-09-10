const logger = require('loggers');
const { getUserSubscriptionInfo } = require('elevenLabsFetchers');
const subscriptionInfoHandler = require('subscriptionInfoHandler');
const fetchHandler = require('fetchHandler');

async function generateAndSaveAudio(
  text,
  configData,
  fileName,
  iteration,
  processedCharCounts
) {
  const totalCharactersToProcess = processedCharCounts.reduce(
    (acc, count) => acc + count,
    0
  );
  logger.initialize('Initializing audio generation...');
  if (iteration !== 0) {
    try {
      await fetchHandler(
        configData,
        text,
        fileName,
        processedCharCounts[iteration]
      );
      logger.success('Successfully generated audio.');
    } catch (error) {
      logger.error('Error generating audio:', error);
      throw error;
    }
  } else {
    try {
      const subscriptionInfo = await getUserSubscriptionInfo(configData);

      await subscriptionInfoHandler(
        subscriptionInfo,
        totalCharactersToProcess,
        configData
      );

      await fetchHandler(
        configData,
        text,
        fileName,
        processedCharCounts[iteration]
      );
      logger.success('Successfully generated audio.');
    } catch (error) {
      logger.error('Error generating audio:', error);
      throw error;
    }
  }
}

module.exports = generateAndSaveAudio;
