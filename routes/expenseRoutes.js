const express = require('express');
const router = express.Router();

const {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');

// Routes mapping for /api/expenses
router
  .route('/')
  .post(createExpense)
  .get(getAllExpenses);

// Routes mapping for /api/expenses/:id
router
  .route('/:id')
  .get(getExpenseById)
  .put(updateExpense)
  .delete(deleteExpense);

module.exports = router;
