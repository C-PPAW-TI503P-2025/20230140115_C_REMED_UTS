const { Book } = require('../models');

const BookController = {
    // Public: Get all books (with pagination)
    getAllBooks: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;

            const { count, rows } = await Book.findAndCountAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            });

            res.status(200).json({
                success: true,
                message: 'Data buku berhasil diambil',
                data: rows,
                pagination: {
                    total: count,
                    page,
                    limit,
                    totalPages: Math.ceil(count / limit)
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil data buku',
                error: error.message
            });
        }
    },

    // Public: Get book by ID
    getBookById: async (req, res) => {
        try {
            const book = await Book.findByPk(req.params.id);
            if (!book) {
                return res.status(404).json({
                    success: false,
                    message: 'Buku tidak ditemukan'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Detail buku berhasil diambil',
                data: book
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil detail buku',
                error: error.message
            });
        }
    },

    // Admin: Create book
    createBook: async (req, res) => {
        try {
            const { title, author, stock } = req.body;
            if (!title || !author) {
                return res.status(400).json({
                    success: false,
                    message: 'Title dan Author tidak boleh kosong'
                });
            }
            if (stock < 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Stock tidak boleh negatif'
                });
            }

            const newBook = await Book.create({ title, author, stock });
            res.status(201).json({
                success: true,
                message: 'Buku berhasil ditambahkan',
                data: newBook
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal menambahkan buku',
                error: error.message
            });
        }
    },

    // Admin: Update book
    updateBook: async (req, res) => {
        try {
            const { title, author, stock } = req.body;
            const book = await Book.findByPk(req.params.id);

            if (!book) {
                return res.status(404).json({
                    success: false,
                    message: 'Buku tidak ditemukan'
                });
            }

            if (stock !== undefined && stock < 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Stock tidak boleh negatif'
                });
            }

            await book.update({ title, author, stock });
            res.status(200).json({
                success: true,
                message: 'Buku berhasil diupdate',
                data: book
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengupdate buku',
                error: error.message
            });
        }
    },

    // Admin: Delete book
    deleteBook: async (req, res) => {
        try {
            const book = await Book.findByPk(req.params.id);
            if (!book) {
                return res.status(404).json({
                    success: false,
                    message: 'Buku tidak ditemukan'
                });
            }

            await book.destroy();
            res.status(200).json({
                success: true,
                message: 'Buku berhasil dihapus'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal menghapus buku',
                error: error.message
            });
        }
    }
};

module.exports = BookController;
