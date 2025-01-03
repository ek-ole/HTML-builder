const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'output.txt');

const writableStream = fs.createWriteStream(filePath, { flags: 'a' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Введите текст для записи в файл. Для выхода введите "exit"');

rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    farewell();
  } else {
    writableStream.write(`${input}\n`);
    console.log('Текст успешно записан в файл. Введите следующий текст. Для выхода введите "exit"');
  }
});

rl.on('SIGINT', () => {
  farewell();
});

function farewell() {
  console.log('\nСпасибо за использование приложения!');
  writableStream.end();
  process.exit();
}