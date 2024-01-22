const fs = require('fs/promises');
const path = require('path');

async function copyDir(sourceDir, targetDir) {
  try {
    console.log(`Copying ${sourceDir} to ${targetDir}`);
    await fs.mkdir(targetDir, { recursive: true });

    const files = await fs.readdir(sourceDir);

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);

      const stats = await fs.stat(sourcePath);

      if (stats.isDirectory()) {
        await copyDir(sourcePath, targetPath);
      } else {
        await fs.copyFile(sourcePath, targetPath);
      }
    }
    console.log(`Folder ${sourceDir} successfully copied to ${targetDir}`);
  } catch (error) {
    console.log('Error:', error.message);
  }
}

const sourceDirectoy = path.join(__dirname, 'files');
const targetDirectory = path.join(__dirname, 'files-copy');

copyDir(sourceDirectoy, targetDirectory);