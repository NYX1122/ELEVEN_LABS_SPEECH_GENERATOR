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

module.exports = subscriptionInfoProcessor;
