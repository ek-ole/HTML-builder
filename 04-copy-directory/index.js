const fs = require('fs/promises');
const path = require('path');
const srcFolder = path.join(__dirname, 'files');
const destFolder = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    await fs.mkdir(destFolder, { recursive: true });
    const existingsFiles = await fs.readdir(destFolder, { withFileTypes: true });
    for (const file of existingsFiles) {
      await fs.rm(path.join(destFolder, file.name), { recursive: true, force: true });  
    }
    const files = await fs.readdir(srcFolder, { withFileTypes: true })
    for (const file of files) {
      const srcPath = path.join(srcFolder, file.name);
      const destPath = path.join(destFolder, file.name)

      if (file.isFile()) {
        await fs.copyFile(srcPath, destPath);
      } else if (file.isDirectoty()) {
        await copyDir(srcPath, destPath);
      }
    }
    console.log('Копирование завершено');
  } catch(error) {
    console.error('Ошибка при копировании:', error.message);
  }
}

copyDir();