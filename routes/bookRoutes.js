const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const authMiddleware = require('../middlewares/auth');

// Public routes
router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getBookById);

// Admin routes
router.post('/', authMiddleware('admin'), BookController.createBook);
router.put('/:id', authMiddleware('admin'), BookController.updateBook);
router.delete('/:id', authMiddleware('admin'), BookController.deleteBook);

module.exports = router;
