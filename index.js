const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());

// In-memory database for books 
let books = [
    { id: 1, name: "Harry Potter" },
    { id: 2, name: "Rich Dad Poor Dad" }
];

// GET endpoint to fetch all books 
app.get('/books', (req, res) => {
    res.json(books);
});

// POST endpoint to add a new book record 
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        name: req.body.name
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});