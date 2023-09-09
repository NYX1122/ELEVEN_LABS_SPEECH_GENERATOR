const getFileTreeData = require('./alias_services/get_file_tree_data');
const generateAliasName = require('./alias_services/generate_alias_name');
const createAlias = require('./alias_services/create_alias');

async function setupModuleAliases() {
  try {
    console.log('Initializing module aliases setup...');
    const files = await getFileTreeData();

    for (const file of files) {
      try {
        console.log('Passing file to remaining actions...');
        const name = generateAliasName(file);
        await createAlias(name, file);
      } catch (error) {
        console.error('Unable to iterate through files:', error);
        throw error;
      }
    }
    console.log('Module alias setup completed.');
  } catch (error) {
    console.error('Unable to setup module aliases:', error);
    throw error;
  }
}

module.exports = setupModuleAliases;
