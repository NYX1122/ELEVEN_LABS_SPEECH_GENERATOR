function chunkStrings(array, maxChars) {
  let chunks = [];
  let currentChunk = [];
  let currentLength = 0;

  for (let str of array) {
    // Calculate the extra length if this string is added
    const extraLength = currentLength === 0 ? str.length : str.length + 2;

    if (currentLength + extraLength <= maxChars) {
      currentChunk.push(str);
      currentLength += extraLength;
    } else {
      chunks.push(currentChunk);
      currentChunk = [str];
      currentLength = str.length;
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
}

module.exports = chunkStrings;
