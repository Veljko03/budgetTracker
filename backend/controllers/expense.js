const ExpenseSchema = require("../models/expenceModel");
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};
exports.addExpence = async (request, response) => {
  const { title, amount, category, description, date } = request.body;

  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);

    const expense = new ExpenseSchema({
      title,
      amount,
      category,
      description,
      date,
      user: user._id,
    });
    if (!title || !amount || !category || !description || !date) {
      return response.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return response
        .status(400)
        .json({ message: "Amount must be possitive number!" });
    }
    //console.log(expense._id);
    user.expenses = user.expenses.concat(expense._id);
    await expense.save();
    await user.save();
    response.status(200).json({ message: "Expense Added" });
  } catch (error) {
    response.status(500).json({ message: "Server Error" });
  }
};

exports.getExpences = async (request, response) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id).populate("expenses");
    response.status(200).json(user.expenses);
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
