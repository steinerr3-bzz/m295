const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());

const books = []; // Dies wird als einfacher Ersatz für eine Datenbank verwendet.

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:isbn', (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Buch nicht gefunden');
    }
});

app.post('/books', (req, res) => {
    const book = req.body;
    if (book.isbn && book.title && book.year && book.author) {
        books.push(book);
        res.status(201).json(book);
    } else {
        res.status(422).send('Unvollständige Daten');
    }
});

app.put('/books/:isbn', (req, res) => {
    const index = books.findIndex(b => b.isbn === req.params.isbn);
    if (index !== -1) {
        const updatedBook = req.body;
        if (updatedBook.isbn && updatedBook.title && updatedBook.year && updatedBook.author) {
            books[index] = updatedBook;
            res.json(updatedBook);
        } else {
            res.status(422).send('Unvollständige Daten');
        }
    } else {
        res.status(404).send('Buch nicht gefunden');
    }
});

app.delete('/books/:isbn', (req, res) => {
    const index = books.findIndex(b => b.isbn === req.params.isbn);
    if (index !== -1) {
        books.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Buch nicht gefunden');
    }
});

app.patch('/books/:isbn', (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book) {
        const updatedFields = req.body;
        if (updatedFields.isbn || updatedFields.title || updatedFields.year || updatedFields.author) {
            Object.assign(book, updatedFields);
            res.json(book);
        } else {
            res.status(422).send('Unvollständige Daten');
        }
    } else {
        res.status(404).send('Buch nicht gefunden');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
