const router = require("express").Router();

router.get("/", (request, response) => {
  response.send("da li radi");
});

module.exports = { router };
