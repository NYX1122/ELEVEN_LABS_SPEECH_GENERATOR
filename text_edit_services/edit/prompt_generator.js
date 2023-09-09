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

module.exports = promptGenerator;
