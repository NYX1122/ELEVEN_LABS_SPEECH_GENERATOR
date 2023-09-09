const moduleAlias = require('module-alias');

async function createAlias(alias, file) {
  try {
    console.log('Creating alias -> ' + file + ':' + alias);
    await moduleAlias.addAlias(alias, file);
    console.log('Successfully created alias.');
  } catch (error) {
    console.log('Unable to create alias:', error);
    throw error;
  }
}

module.exports = createAlias;
