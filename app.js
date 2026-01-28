const express = require('express');
const bodyParser = require('body-parser');
const loggerMiddleware = require('./middlewares/logger');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use(express.static('public')); // Serve static files

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Library Management System API',
        version: '1.0.0'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: err.message
    });
});

module.exports = app;
