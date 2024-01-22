const fs = require('fs');

/* fs.readFile('./text.txt', { encoding: 'utf-8' }, (err, data) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('File read successfully! Here is the data');
    console.log(data);
 }
}); */

const readableStream = fs.createReadStream('text.txt', 'utf-8');
readableStream.on('data', (chunk) => console.log(chunk));
