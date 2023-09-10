const { glob } = require('glob');
const loggers = require('loggers');
const path = require('path');
const moduleAlias = require('module-alias');

async function getFileTreeData() {
  try {
    loggers.initialize('Scanning filetree...');
    const jsFiles = await glob('**/*.js', {
      ignore: [
        'node_modules/**',
        'alias/**',
        'app.js',
        '.gitignore',
        'package.json',
        'package-lock.json',
        'config_data.js',
      ],
    });
    loggers.success('Filetree scan successful.');
    return jsFiles;
  } catch (error) {
    loggers.error('Unable to retrieve filetree data:', error);
    throw error;
  }
}

function generateAliasName(filePath) {
  loggers.initialize('Extracting filename...');
  const fileName = path.basename(filePath, '.js');

  const extractedFilename = fileName
    .split('_')
    .map((item, index) =>
      index !== 0
        ? item.replace(item.charAt(0), item.charAt(0).toUpperCase())
        : item
    )
    .join('');

  loggers.success('Extracted filename successfully.');
  loggers.output(extractedFilename);
  return extractedFilename;
}

function pathResolver(filePath) {
  loggers.initialize('Resolving path...');
  const segments = filePath.split(path.sep);
  loggers.success('Path successfully resolved.');
  return path.resolve(...segments);
}

async function createAlias(alias, file) {
  try {
    loggers.initialize('Creating alias:');
    loggers.output('Alias: ' + alias);
    loggers.output('Filepath: ' + file);
    await moduleAlias.addAlias(alias, file);
    loggers.success('Successfully created alias.');
  } catch (error) {
    console.error('Unable to create alias:', error);
    throw error;
  }
}

module.exports = {
  getFileTreeData,
  generateAliasName,
  pathResolver,
  createAlias,
};
