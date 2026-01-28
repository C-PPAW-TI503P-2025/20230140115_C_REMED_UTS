const { Book, BorrowLog, sequelize } = require('../models');

const BorrowController = {
    // User: Borrow a book
    borrowBook: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { bookId, latitude, longitude } = req.body;
            const userId = req.headers['x-user-id'];

            if (!bookId || latitude === undefined || longitude === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Data tidak lengkap (bookId, latitude, longitude diperlukan)'
                });
            }

            const book = await Book.findByPk(bookId, { transaction: t });
            if (!book) {
                await t.rollback();
                return res.status(404).json({
                    success: false,
                    message: 'Buku tidak ditemukan'
                });
            }

            if (book.stock <= 0) {
                await t.rollback();
                return res.status(400).json({
                    success: false,
                    message: 'Stok buku habis, peminjaman ditolak'
                });
            }

            // Record borrowing
            const borrowLog = await BorrowLog.create({
                userId,
                bookId,
                latitude,
                longitude,
                borrowDate: new Date()
            }, { transaction: t });

            // Reduce stock
            await book.update({ stock: book.stock - 1 }, { transaction: t });

            await t.commit();

            res.status(201).json({
                success: true,
                message: 'Peminjaman buku berhasil',
                data: borrowLog
            });
        } catch (error) {
            await t.rollback();
            res.status(500).json({
                success: false,
                message: 'Gagal melakukan peminjaman',
                error: error.message
            });
        }
    },

    // User/Admin: Get borrowing history
    getHistory: async (req, res) => {
        try {
            const { userId } = req.query;
            const userRole = req.headers['x-user-role'];

            let whereClause = {};

            // If user, can only see their own history
            if (userRole === 'user') {
                whereClause.userId = req.headers['x-user-id'];
            } else if (userId) {
                // Admin can filter by userId
                whereClause.userId = userId;
            }

            const history = await BorrowLog.findAll({
                where: whereClause,
                include: [{ model: Book, as: 'book', attributes: ['title', 'author'] }],
                order: [['borrowDate', 'DESC']]
            });

            res.status(200).json({
                success: true,
                message: 'Riwayat peminjaman berhasil diambil',
                data: history
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil riwayat peminjaman',
                error: error.message
            });
        }
    }
};

module.exports = BorrowController;
