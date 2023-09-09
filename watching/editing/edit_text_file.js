const readTextFile = require('../../text_edit_services/read/read_text_file');
const editPartTitle = require('../../text_edit_services/edit/edit_part_title');
const removeListenToAudio = require('../../text_edit_services/edit/remove_listen_to_audio');
const removeReferences = require('../../text_edit_services/edit/remove_references');
const editSectionTitle = require('../../text_edit_services/edit/edit_section_title');
const chunkStrings = require('../../text_edit_services/edit/chunk_strings');

async function editTextFile(path) {
  try {
    console.log('Generating processed string...');

    const textString = await readTextFile(path);

    const linesArray = textString
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) => line.replace('\r', ''));

    const tempArrayOne = editPartTitle(linesArray);

    const tempArrayTwo = removeListenToAudio(tempArrayOne);

    const tempArrayThree = editSectionTitle(tempArrayTwo);

    const tempArrayFour = removeReferences(tempArrayThree);

    const chunkArrays = chunkStrings(tempArrayFour, 5000);

    const joinedChunkArrays = chunkArrays.map((chunk) =>
      chunk.join('\r\n\r\n')
    );

    console.log('Processed string has been generated.');
    return joinedChunkArrays;
  } catch (err) {
    console.error('Error editing file:', err);
  }
}

module.exports = editTextFile;
