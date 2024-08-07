const incomeSchema = require("../models/incomeModel");

exports.addIncome = async (request, response) => {
  const { title, amount, category, description, date } = request.body;

  const income = incomeSchema({
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
    await income.save();
    response.status(200).json({ message: "Income Added" });
  } catch (error) {}
  console.log(income);
};
