const { glob } = require('glob');

async function getFileTreeData() {
  try {
    console.log('Scanning filetree...');
    const jsFiles = await glob('**/*.js', {
      ignore: [
        'node_modules/**',
        'alias_services/**',
        'setup_module_aliases.js',
        'speech_generator.js',
      ],
    });
    console.log('Filetree scan successful.');
    return jsFiles;
  } catch (error) {
    console.error('Unable to retrieve filetree data:', error);
    throw error;
  }
}

module.exports = getFileTreeData;
