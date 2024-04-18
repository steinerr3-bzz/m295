const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Bibliothek API',
        description: 'API zur Verwaltung von Büchern in einer Bibliothek',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    basePath: '/',
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: 'Book',
            description: 'Operationen bezüglich Bücher'
        }
    ],
    definitions: {
        Book: {
            isbn: '9783453318789',
            title: 'Der Nasse Fisch',
            author: 'Volker Kutscher',
            year: 2008
        }
    }
};

const app = express();
app.use(express.json());

let books = [
    {
        isbn: '9783453318789',
        title: 'Der Nasse Fisch',
        author: 'Volker Kutscher',
        year: 2008
    },
    {
        isbn: '9783552059087',
        title: 'Gone Girl - Das perfekte Opfer',
        author: 'Gillian Flynn',
        year: 2012
    },
    {
        isbn: '9783257237274',
        title: 'Der Schwarm',
        author: 'Frank Schätzing',
        year: 2004
    }
];

function isValid(book) {
    return book.isbn && book.title && book.author && book.year;
}

app.get("/books", (req, res) => {
    res.json(books.map(book => ({ isbn: book.isbn, title: book.title })));
});

app.get("/books/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const book = books.find(b => b.isbn === isbn);
    if (book) {
        res.json(book);
    } else {
        res.sendStatus(404);
    }
});

app.post("/books", (req, res) => {
    const newBook = req.body;
    if (isValid(newBook)) {
        books.push(newBook);
        res.status(201).json(newBook);
    } else {
        res.sendStatus(422);
    }
});

app.put("/books/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const bookIndex = books.findIndex(b => b.isbn === isbn);
    const newBook = req.body;
    if (bookIndex >= 0 && isValid(newBook)) {
        books[bookIndex] = newBook;
        res.json(newBook);
    } else if (bookIndex < 0) {
        res.sendStatus(404);
    } else {
        res.sendStatus(422);
    }
});

app.delete("/books/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const index = books.findIndex(b => b.isbn === isbn);
    if (index >= 0) {
        books.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

const outputFile = './swagger-output.json';
swaggerAutogen(outputFile, null, doc).then(() => {
    app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(require(outputFile)));
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
        console.log('Swagger UI available at http://localhost:3000/swagger-ui');
    });
});
