const mongoose = require("mongoose");

const userInvoiceSchema = mongoose.Schema(
  {
    blog_id: {
      type: String,
    },
    user_id: {
      type: String,
    },
    transaction_id: {
      type: Number,
      required: [true, "Enter your phone"],
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
