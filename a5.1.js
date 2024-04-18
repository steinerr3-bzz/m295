const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

let books = [
    {
        isbn: '978-3-16-148410-0',
        title: 'Der Alchimist',
        year: 1988,
        author: 'Paulo Coelho'
    },
    {
        isbn: '978-3-16-148411-1',
        title: 'Harry Potter und der Stein der Weisen',
        year: 1997,
        author: 'J.K. Rowling'
    }
];

app.use(bodyParser.json());

function validateBook(req, res, next) {
    const { isbn, title, year, author } = req.body;
    if (!isbn || !title || !year || !author) {
        return res.status(422).json({ error: 'All fields are required' });
    }
    next();
}

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    const book = books.find(b => b.isbn === isbn);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
});

app.post('/books', validateBook, (req, res) => {
    const { isbn, title, year, author } = req.body;
    const newBook = { isbn, title, year, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:isbn', validateBook, (req, res) => {
    const { isbn } = req.params;
    const { title, year, author } = req.body;
    const index = books.findIndex(b => b.isbn === isbn);
    if (index === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    books[index] = { isbn, title, year, author };
    res.json(books[index]);
});

app.delete('/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    books = books.filter(b => b.isbn !== isbn);
    res.status(204).send();
});

app.patch('/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    const { title, year, author } = req.body;
    const index = books.findIndex(b => b.isbn === isbn);
    if (index === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    if (title) books[index].title = title;
    if (year) books[index].year = year;
    if (author) books[index].author = author;
    res.json(books[index]);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});