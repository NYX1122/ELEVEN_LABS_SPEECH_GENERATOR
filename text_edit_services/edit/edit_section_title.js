function editSectionTitle(array) {
  try {
    console.log('Formatting section titles...');
    const finalArray = array.map((line) =>
      line.replace(/\d\.\d\.(\d)/g, 'Section $1,')
    );
    console.log('Section titles formatted.');
    return finalArray;
  } catch (err) {
    console.error('Error formatting section titles:', err);
  }
}

module.exports = editSectionTitle;
