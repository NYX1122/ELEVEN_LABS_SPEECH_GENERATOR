function removeReferences(array) {
  try {
    console.log('Removing references...');
    const finalArray = array.map((line) =>
      line.replaceAll(/(?<!\d\.)(?<=[\.\"\”A-Za-z])\d+/g, '')
    );
    console.log('References removed.');
    return finalArray;
  } catch (err) {
    console.error('Error removing references:', err);
  }
}

module.exports = removeReferences;
