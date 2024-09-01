const {
  addExpence,
  getExpences,
  deleteExpence,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/income");

const { addUser, getUsers } = require("../controllers/users");
const router = require("express").Router();

router
  .post("/add-income", addIncome)
  .get("/get-incomes", getIncomes)
  .delete("/delete-income/:id", deleteIncome)
  .post("/add-expense", addExpence)
  .get("/get-expense", getExpences)
  .delete("/delete-expense/:id", deleteExpence)
  .post("/add-user", addUser)
  .get("/users", getUsers);

module.exports = router;
