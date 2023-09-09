function editPartTitle(array) {
  try {
    console.log('Editing chapter part title...');
    const title = array[0];
    const chapter = array[1].charAt(0);
    const part = array[1].charAt(2);
    const fixedPartTitle =
      'Chapter ' + chapter + ', Part ' + part + ', ' + title;
    const tempArrayOne = array.filter((_, index) => index !== 1);
    const finalArray = tempArrayOne.map((line, index) =>
      index === 0 ? fixedPartTitle : line
    );
    console.log('Chapter part title has been edited successfully.');
    return finalArray;
  } catch (err) {
    console.error('Error editing chapter part title:', err);
  }
}

module.exports = editPartTitle;
