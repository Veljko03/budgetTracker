const incomeSchema = require("../models/incomeModel");
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
//const { use } = require("../routes/transactions");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  console.log(authorization, "auth");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

exports.addIncome = async (request, response) => {
  const { title, amount, category, description, date } = request.body;

  try {
    // if (!userId) {
    //   return response.status(400).json({ message: "User ID is required!" });
    // }

    // // Pronađi korisnika pomoću userId
    // const user = await User.findById(userId);
    // if (!user) {
    //   return response.status(404).json({ message: "User not found!" });
    // }

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);

    // console.log(user);

    const income = new incomeSchema({
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
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const incomes = await incomeSchema
      .find({ user: decodedToken.id }) // Filtriraj po korisniku
      .sort({ createdAt: -1 });

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
