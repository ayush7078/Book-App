const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  searchBooks
} = require('../controllers/bookController');

router.get('/', getBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
