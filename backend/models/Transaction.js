const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    user_invoice: {
      type: String,
    },
    transaction_number: {
      type: String,
    },
    phone: {
      type: Number,
      required: [true, "Enter your phone"],
    },
    checkout_id: {
      type: String,
    },
    reference: {
      type: String,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
    },
    user: {
      type: String,
    },
    status: {
      type: String,
    },
    receipt_number: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
