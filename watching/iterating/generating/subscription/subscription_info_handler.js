const logger = require('loggers');
const wishContinue = require('wishContinue');

async function handleSubscriptionInfo(
  subscriptionInfo,
  processedCharacterCount,
  configData
) {
  const prompts = configData.promptGenerator(
    configData.subscriptionInfoProcessor(
      subscriptionInfo,
      processedCharacterCount
    )
  );
  try {
    logger.initialize('Handling subscription information...');

    await wishContinue(prompts);

    logger.success('Subscription information successfully handled.');
  } catch (error) {
    logger.error('Unable to handle subscription information:', error);
    throw error;
  }
}

module.exports = handleSubscriptionInfo;
