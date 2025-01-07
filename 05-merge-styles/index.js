const fs = require('fs/promises');
const path = require('path');
const stylesFolder = path.join(__dirname, 'styles');
const outputFolder = path.join(__dirname, 'project-dist');
const bundleFile = path.join(outputFolder, 'bundle.css');

async function mergeStyles() {
  try {
    await fs.mkdir(outputFolder, { recursive: true });
    const files = await fs.readdir(stylesFolder, { withFileTypes: true });
    const styles = [];
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const filePath = path.join(stylesFolder, file.name);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        styles.push(fileContent);
      }
    }
    await fs.writeFile(bundleFile, styles.join('\n'));

    console.log('bundle.css успешно создан')
  }
  catch(error) {
    console.error('Ошибка при создании bundle.css :', error.message);
  }
}
mergeStyles();