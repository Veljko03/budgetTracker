const express = require("express");
const { db } = require("./db/db");
const { router } = require("./routes/transactions");
const app = express();
require("dotenv").config();

//routes
router();

const PORT = process.env.PORT;
const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

server();
