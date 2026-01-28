const mysql = require('mysql2/promise');
const { Book, sequelize } = require('./models');
require('dotenv').config();

async function setup() {
    try {
        // 1. Create DB if not exists
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
        });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`- Database '${process.env.DB_NAME}' created/exists.`);
        await connection.end();

        // 2. Sync and Seed
        await sequelize.authenticate();
        await sequelize.sync({ force: true });

        await Book.bulkCreate([
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', stock: 5 },
            { title: 'To Kill a Mockingbird', author: 'Harper Lee', stock: 10 },
            { title: '1984', author: 'George Orwell', stock: 8 },
            { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', stock: 15 },
            { title: 'The Hobbit', author: 'J.R.R. Tolkien', stock: 7 }
        ]);

        console.log('- Seeding successful!');
        process.exit(0);
    } catch (error) {
        console.error('Setup failed:', error);
        process.exit(1);
    }
}

setup();
