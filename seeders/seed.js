const { Book, sequelize } = require('../models');

const seedData = async () => {
    try {
        await sequelize.sync({ force: true }); // Reset database for seeding

        await Book.bulkCreate([
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', stock: 5 },
            { title: 'To Kill a Mockingbird', author: 'Harper Lee', stock: 10 },
            { title: '1984', author: 'George Orwell', stock: 8 },
            { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', stock: 15 },
            { title: 'The Hobbit', author: 'J.R.R. Tolkien', stock: 7 }
        ]);

        console.log('Data seeder berhasil dijalankan!');
        process.exit();
    } catch (error) {
        console.error('Gagal menjalankan seeder:', error);
        process.exit(1);
    }
};

seedData();
