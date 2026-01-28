const express = require('express');
const router = express.Router();
const BorrowController = require('../controllers/BorrowController');
const authMiddleware = require('../middlewares/auth');

// User routes
router.post('/', authMiddleware('user'), BorrowController.borrowBook);
router.get('/history', authMiddleware(), BorrowController.getHistory); // Auth allowed for both user/admin

module.exports = router;
