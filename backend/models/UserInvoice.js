const mongoose = require("mongoose");

const userInvoiceSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    transaction_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
    amount: {
      type: String,
    },
    status: {
      type: String,
    },
    month: {
      type: String,
    },
    year: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const UserInvoice = mongoose.model("UserInvoice", userInvoiceSchema);

module.exports = UserInvoice;
