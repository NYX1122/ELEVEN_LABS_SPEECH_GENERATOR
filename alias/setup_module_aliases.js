const loggers = require('loggers');
const {
  getFileTreeData,
  generateAliasName,
  pathResolver,
  createAlias,
} = require('aliasServices');

async function setupModuleAliases() {
  try {
    loggers.initialize('Initializing module aliases setup...');
    const files = await getFileTreeData();

    for (const file of files) {
      try {
        loggers.initialize('Passing file to remaining actions...');

        const name = generateAliasName(file);

        const resolvedPath = pathResolver(file);

        await createAlias(name, resolvedPath);
      } catch (error) {
        loggers.error('Unable to iterate through files:', error);
        throw error;
      }
    }
    loggers.success('Module alias setup completed.');
  } catch (error) {
    loggers.error('Unable to setup module aliases:', error);
    throw error;
  }
}

module.exports = setupModuleAliases;
