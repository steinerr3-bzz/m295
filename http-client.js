// Load the http module to perform HTTP requests
const http = require('http');

// The first command-line argument is the URL to which the HTTP GET request will be made
const url = process.argv[2];

// Perform the HTTP GET request
http.get(url, (response) => {
    // Set the encoding of the response to UTF-8
    response.setEncoding('utf8');

    // Handle the 'data' event; this event is fired whenever a chunk of data is received
    response.on('data', (data) => {
        console.log(data); // Print each chunk of data to a new line on the console
    });

    // Handle any errors that occur during the request
    response.on('error', (error) => {
        console.error(error);
    });

    // Optionally, you can handle the 'end' event, though it's not necessary for this task
    response.on('end', () => {
        console.log('Response has ended.');
    });
});
