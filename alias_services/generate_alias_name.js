function generateAliasName(filePath) {
  return filePath
    .split('\\')
    .find((item) => item.includes('.js'))
    .split('_')
    .map((item, index) =>
      index !== 0
        ? item.replace(item.charAt(0), item.charAt(0).toUpperCase())
        : item
    )
    .join('')
    .replace('.js', '');
}

module.exports = generateAliasName;
