const fs = require('fs');

const filePath = process.argv[2];

const content = fs.readFileSync(filePath, 'utf8');

const numNewLines = content.split('\n').length - 1;

console.log(numNewLines);
