const fs = require('fs/promises');
const path = require('path');
const distFolder = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const componentsFolder = path.join(__dirname, 'components');
const stylesFolder = path.join(__dirname, 'styles');
const assetsFolder = path.join(__dirname, 'assets');
const distAssetsFolder = path.join(distFolder, 'assets');
const distHTML = path.join(distFolder, 'index.html');
const distCSS = path.join(distFolder, 'style.css');

async function buildPage() {
  try {
    await fs.mkdir(distFolder, { recursive: true });
    await generateHTML();
    await mergeStyles();
    await copyAssets(assetsFolder, distAssetsFolder);

    console.log('Страница успешно собрана');
  }
  catch(error) {
    console.error('Ошибка при сборке страницы', error.message);
  }
}

async function generateHTML() {
  try {
    let template = await fs.readFile(templatePath, 'utf-8');
    const tags = template.match(/{{\w+}}/g);
    if (tags) {
      for (const tag of tags) {
        const componentName = tag.replace(/[{}]/g, '');
        const componentPath = path.join(componentsFolder, `${componentName}.html`);
        try {
          const componentContent = await fs.readFile(componentPath, 'utf-8');
          template = template.replace(tag, componentContent);

        } catch(error) {
        console.warn(`Компонент ${componentName} не найден ${tag} останется`);
      }
    }
  }
    await fs.writeFile(distHTML, template);
    console.log('index.html создан');

  } catch(error) {
    console.error('Ошибка при создании index.html', error.message);
  }
}

async function mergeStyles() {
  try {
    const files = await fs.readdir(stylesFolder, { withFileTypes: true });
    const styles = [];
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const filePath = path.join(stylesFolder, file.name);
        const content = await fs.readFile(filePath, 'utf-8');
        styles.push(content);
      }
    }
    
    console.log('style.css создан');

  }
  catch(error) {
    console.error('Ошибка при создании style.css', error.message);
  }
}

async function copyAssets(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name)

      if (entry.isDirectory()) {
        await copyAssets(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }    
    console.log('Папка assets скопирована');
  } catch(error) {
    console.error('Ошибка при копировании папки assets', error.message);
  }
}

buildPage();