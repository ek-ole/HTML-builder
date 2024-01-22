const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const writeStream = fs.createWriteStream('./02-write-file/02-write-file.text', {flags: 'a'});

console.log('Enter text. To complete enter .exit');

const handleInput = (input) => {
    if (input.trim() === 'exit') {
        //console.log('Goodbye!');
        rl.close();
        process.exit();
    } else {
        writeStream.write(input + '\n');
        rl.prompt();
    }
};

rl.on('line', handleInput);
rl.on('close', () => {
    console.log('Googbye!');
    process.exit();
});

rl.prompt();
