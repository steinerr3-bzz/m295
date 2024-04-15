const fs = require('fs');

const fileName = process.argv[2];

fs.readFile(fileName, whenDoneReadingCallback);

function whenDoneReadingCallback(err, data) {
    const content = data.toString()
    const numNewLines = content.split('\n').length - 1;

    console.log(numNewLines);
}

