const mongoose = require('mongoose');
const Expense = require('../models/expenseModel');

// @desc    Create a new expense
// @route   POST /api/expenses
const createExpense = async (req, res) => {
  try {
    const { title, amount, category, paymentMethod, date, notes } = req.body;

    // Manual validation for required fields
    if (!title || amount === undefined || !category || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, amount, category, paymentMethod',
      });
    }

    // Validate that amount is greater than zero
    if (Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than zero',
      });
    }

    // Create and save new expense to MongoDB
    const expense = await Expense.create({
      title,
      amount,
      category,
      paymentMethod,
      date: date || undefined,
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating expense',
      error: error.message,
    });
  }
};

// @desc    Get all expenses
// @route   GET /api/expenses
const getAllExpenses = async (req, res) => {
  try {
    // Retrieve all expenses sorted by date descending (newest first)
    const expenses = await Expense.find().sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching expenses',
      error: error.message,
    });
  }
};

// @desc    Get single expense by ID
// @route   GET /api/expenses/:id
const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid expense ID format',
      });
    }

    const expense = await Expense.findById(id);

    // If no expense found with that ID
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: `Expense not found with id: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching expense',
      error: error.message,
    });
  }
};

// @desc    Update expense by ID
// @route   PUT /api/expenses/:id
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid expense ID format',
      });
    }

    // If amount is being updated, ensure it's greater than zero
    if (req.body.amount !== undefined && Number(req.body.amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than zero',
      });
    }

    // Find and update the expense
    // { new: true } returns the modified document rather than the original
    // { runValidators: true } enforces schema rules on update
    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedExpense) {
      return res.status(404).json({
        success: false,
        message: `Expense not found with id: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expense updated successfully',
      data: updatedExpense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating expense',
      error: error.message,
    });
  }
};

// @desc    Delete expense by ID
// @route   DELETE /api/expenses/:id
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid expense ID format',
      });
    }

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({
        success: false,
        message: `Expense not found with id: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully',
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting expense',
      error: error.message,
    });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
