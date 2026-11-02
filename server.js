const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Built-in middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Base test route
app.get('/', (req, res) => {
  res.send('Expense Tracker API is running...');
});

// Mount Expense Routes
app.use('/api/expenses', expenseRoutes);

// Fallback route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Start listening for incoming network requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
