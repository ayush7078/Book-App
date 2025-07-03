const { readJSON, writeJSON } = require('../utils/fileUtils');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const booksPath = path.join(__dirname, '../data/books.json');
exports.getBooks = async (req, res, next) => {
  try {
    let books = await readJSON(booksPath);
    const { page, limit } = req.query;
    if (page && limit) {
      const start = (page - 1) * limit;
      books = books.slice(start, start + parseInt(limit));
    }
    // Remove userId from each book before sending
    res.json(books);
  } catch (err) {
    next(err);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const books = await readJSON(booksPath);
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    // Destructure to exclude userId before sending
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.addBook = async (req, res, next) => {
  try {
    const { title, author, genre, publishedYear } = req.body;
    const newBook = {
      id: uuidv4(),
      title,
      author,
      genre,
      publishedYear,
      userId: req.user.id
    };
    const books = await readJSON(booksPath);
    books.push(newBook);
    await writeJSON(booksPath, books);
     
    res.status(201).json(newBook); 
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const books = await readJSON(booksPath);
    const index = books.findIndex(b => b.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Book not found' });
    if (books[index].userId !== req.user.id)

  return res.status(403).json({ message: 'You do not have permission to update this book' });

    books[index] = { ...books[index], ...req.body };
    await writeJSON(booksPath, books);
  
 
    res.json(books[index]);
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    let books = await readJSON(booksPath);
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.userId !== req.user.id)

  return res.status(403).json({ message: 'You do not have permission to update this book' });

    books = books.filter(b => b.id !== req.params.id);
    await writeJSON(booksPath, books);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.searchBooks = async (req, res, next) => {
  try {
    const books = await readJSON(booksPath);
    const genreQuery = req.query.genre;

    let result = books;

    if (genreQuery) {
      const lowerQuery = genreQuery.toLowerCase();
      result = books.filter(book =>
        book.genre && book.genre.toLowerCase().includes(lowerQuery)
      );
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
};
