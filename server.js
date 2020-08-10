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

app.get('/books', (req, res) => {
  res.send(books);
});

app.get('/books/:bookId', (req, res) => {
  const { bookId } = req.params;
  books.forEach((book) => {
    if (bookId === book.id) {
      authors.forEach((author) => {
        if (book.author === author.id) {
          res.send({
            id: book.id,
            name: book.name,
            isbn: book.isbn,
            author: {
              id: author.id,
              firstName: author.firstName,
              lastName: author.lastName,
            },
          });
        }
      });
    }
  });
});

app.get('/authors', (req, res) => {
  res.send(authors);
});

app.get('/authors/:authorId', (req, res) => {
  const { authorId } = req.params;
  authors.forEach((author) => {
    if (author.id === authorId) {
      res.send(author);
    }
  });
});

app.post('/books', (req, res) => {
  payload = req.body;
  newBook = {
    id: payload.id,
    name: payload.name,
    isbn: parseInt(payload.isbn),
    author: payload.author.id,
  };
  newAuthor = {
    id: payload.author.id,
    firstName: payload.author.firstName,
    lastName: payload.author.lastName,
  };
  authors.push(newAuthor);
  books.push(newBook);
  res.send('book added');
});

app.post('/authors', (req, res) => {
  payload = req.body;
  newAuthor = {
    id: payload.id,
    firstName: payload.firstName,
    lastName: payload.lastName,
  };
  authors.push(newAuthor);
  res.send('author added');
});

app.put('/books/:bookId', (req, res) => {
  payload = req.body;
  const { bookId } = req.params;
  books.forEach((book) => {
    if (book.id === bookId) {
      book.name = payload.name;
      book.isbn = payload.isbn;
      book.author = payload.author.id;
    }
  });
  res.send('book updated');
});

app.put('/authors/:authorId', (req, res) => {
  payload = req.body;
  const { authorId } = req.params;
  authors.forEach((author) => {
    if (author.id === authorId) {
      author.firstName = payload.firstName;
      author.lastName = payload.lastName;
    }
  });
  res.send('author updated');
});
