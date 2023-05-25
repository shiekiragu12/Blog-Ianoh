const User = require("../models/User");
const schedule = require("node-schedule");
const moment = require("moment");
const UserInvoice = require("../models/UserInvoice");

const paymentController = async (req, res) => {
  const user = await User.findOne({ _id: req.query.id });

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  const is_paid_invoice = await UserInvoice.findOne({ user_id: user });
  console.log(is_paid_invoice);
  if (!is_paid_invoice) {
    res.status(400);
    throw new Error("Invoice not found");
  }
  return res.status(200).json(is_paid_invoice);
};

// Function to generate and save the payment invoice
const generatePaymentInvoice = async (req, res) => {
  // Get the current date and format it as desired
  const currentMonth = moment().format("MMMM");
  const currentYear = moment().format("YYYY");

  const users = await User.find();

  users.forEach((user) => {
    // Generate the payment invoice
    const invoice = {
      user_id: user,
      amount: 50,
      status: "unpaid",
      month: currentMonth,
      year: currentYear,
      // Add other invoice details as needed
    };
    UserInvoice.create(invoice);
  });

  console.log("Payment invoice generated and saved successfully.");

  return res
    .status(201)
    .json("Payment invoice generated and saved successfully.");
};

function scheduleMonthlyPaymentInvoice() {
  // Get the current date and time
  const currentDateTime = moment();

  // Calculate the next month's date
  const nextMonthDate = currentDateTime.add(1, "months").startOf("month");

  // Schedule the task to run on the next month's date
  const job = schedule.scheduleJob(nextMonthDate.toDate(), function () {
    generatePaymentInvoice();
    scheduleMonthlyPaymentInvoice(); // Reschedule for the next month
  });

  console.log(
    `Payment invoice scheduled to generate on ${nextMonthDate.format(
      "YYYY-MM-DD"
    )}.`
  );
}

// Start the payment invoice scheduling
scheduleMonthlyPaymentInvoice();

module.exports = { paymentController, generatePaymentInvoice };
