const fs = require('fs');

const filePath = process.argv[2];
fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
        console.error("Error", err);
        return;
    }
    const numNewLines = data.split('\n').length - 1;

    console.log(numNewLines);
});


