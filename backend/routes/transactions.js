const { addIncome } = require("../controllers/income");

const router = require("express").Router();

router.post("/add-income", addIncome);
router.get("/", (request, response) => {
  response.send("majmube");
});

module.exports = router;
