const fs = require('fs/promises');
const path = require('path');

const secretFolderPath = path.join(__dirname, 'secret-folder');

async function displayFileInfo() {
    try {
        const files = await fs.readdir(secretFolderPath, {withFileTypes: true});
        for (const file of files) {
            if (file.isFile()) {
                const filePath = path.join(secretFolderPath, file.name);
                const stats = await fs.stat(filePath);
                const fileExtesion = path.extname(file.name).slice(1);
                console.log(`${file.name} - ${fileExtesion} - ${stats.size} bytes`);
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

displayFileInfo();