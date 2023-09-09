function removeListenToAudio(array) {
  try {
    console.log('Removing listen to audio...');
    const finalArray = array.filter((line) => line !== 'Listen to the audio');
    console.log('Listen to audio removed.');
    return finalArray;
  } catch (err) {
    console.error('Error removing listen to audio:', err);
  }
}

module.exports = removeListenToAudio;
