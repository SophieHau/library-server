const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const books = require('./books.json');
const authors = require('./authors.json');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, (error) => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

app.get('/books/', (req, res) => {
  res.send(books);
});

app.get('/books/:bookId/', (req, res) => {
  const { bookId } = req.params;
  books.forEach((book) => {
    if (book.id === bookId) {
      res.json(book);
    }
  });
});

app.get('/authors/', (req, res) => {
  res.send(authors);
});

app.get('/books/:authorId/', (req, res) => {
  const { authorId } = req.params;
  books.forEach((author) => {
    if (author.id === authorId) {
      res.json(author);
    }
  });
});
