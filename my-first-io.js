const fs = require('fs');

const fileName = process.argv[2];

const buffer = fs.readFileSync(fileName);

const content = buffer.toString()

const numNewLines = content.split('\n').length - 1;

console.log(numNewLines);
