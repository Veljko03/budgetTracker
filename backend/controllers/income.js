const incomeSchema = require("../models/incomeModel");
const User = require("../models/usersModel");

exports.addIncome = async (request, response) => {
  const { title, amount, category, description, date, userId } = request.body;

  try {
    if (!userId) {
      return response.status(400).json({ message: "User ID is required!" });
    }

    // Pronađi korisnika pomoću userId
    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({ message: "User not found!" });
    }

    const income = incomeSchema({
      title,
      amount,
      category,
      description,
      date,
      user: userId,
    });
    if (!title || !amount || !category || !description || !date) {
      return response.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return response
        .status(400)
        .json({ message: "Amount must be possitive number!" });
    }
    user.incomes = user.incomes.concat(income._id);
    await income.save();
    await user.save();
    response.status(200).json({ message: "Income Added" });
  } catch (error) {
    response.status(500).json({ message: "Server Error" });
  }
};

exports.getIncomes = async (request, response) => {
  try {
    const incomes = await incomeSchema.find().sort({ createdAt: -1 });
    response.status(200).json(incomes);
  } catch (error) {
    response.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (request, response) => {
  const { id } = request.params;
  //console.log(request.params);
  incomeSchema
    .findByIdAndDelete(id)
    .then((income) => {
      response.status(200).json({ message: "Income Deleted" });
    })
    .catch((error) => {
      response.status(500).json({ message: "Server Error" });
    });
};
