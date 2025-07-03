// app.js
const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const { authenticateToken } = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const app = express();

app.use(express.json());
app.use(logger);
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/books', authenticateToken, bookRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use(errorHandler);

module.exports = app; // ✅ Don't start the server here
