const wishContinue = require('../wish_continue');

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
    console.log('Handling subscription information...');

    await wishContinue(prompts);

    console.log('Subscription information successfully handled.');
  } catch (error) {
    console.error('Unable to handle subscription information:', error);
    throw error;
  }
}

module.exports = handleSubscriptionInfo;
