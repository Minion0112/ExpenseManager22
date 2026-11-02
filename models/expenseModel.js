const mongoose = require('mongoose');

// Define Schema for an Expense
const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an expense title'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Please provide an amount'],
      min: [0.01, 'Amount must be greater than zero'],
    },
    category: {
      type: String,
      required: [true, 'Please provide an expense category'],
      trim: true,
    },
    paymentMethod: {
      type: String,
      required: [true, 'Please specify a payment method'],
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    // Automatically creates and manages 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

// Create the model from schema
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
