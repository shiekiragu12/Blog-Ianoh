const mongoose = require("mongoose");
const { UserInvoice } = require("./UserInvoice");

const transactionSchema = mongoose.Schema(
  {
    user_invoice: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserInvoice",
    },
    transaction_number: {
      type: String,
    },
    phone: {
      type: Number,
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

// Define the middleware function for post-save event
transactionSchema.post("save", function (doc) {
  // Logic to be executed after saving the document
  console.log("Transaction saved:", doc);

  const status = doc.status;
  const user_invoice_id = doc.user_invoice;
  const user_invoice = UserInvoice.find({ _id: user_invoice_id });
  if (status === 0) {
    user_invoice.status = "paid";
    user_invoice.transaction = doc;
    user_invoice.save();
  }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
