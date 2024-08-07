const ExpenseSchema = require("../models/expenceModel");

exports.addExpence = async (request, response) => {
  const { title, amount, category, description, date } = request.body;

  const expense = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });
  try {
    if (!title || !amount || !category || !description || !date) {
      return response.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return response
        .status(400)
        .json({ message: "Amount must be possitive number!" });
    }
    await expense.save();
    response.status(200).json({ message: "Expense Added" });
  } catch (error) {
    response.status(500).json({ message: "Server Error" });
  }
  console.log(expense);
};

exports.getExpences = async (request, response) => {
  try {
    const expense = await ExpenseSchema.find().sort({ createdAt: -1 });
    response.status(200).json(expense);
  } catch (error) {
    response.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpence = async (request, response) => {
  const { id } = request.params;
  //console.log(request.params);
  ExpenseSchema.findByIdAndDelete(id)
    .then((expence) => {
      response.status(200).json({ message: "Expense Deleted" });
    })
    .catch((error) => {
      response.status(500).json({ message: "Server Error" });
    });
};
