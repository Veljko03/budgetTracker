const express = require("express");
const { db } = require("./db/db");

const { readdirSync } = require("fs");

const app = express();
require("dotenv").config();
app.use(express.json());
//routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

const PORT = process.env.PORT;
const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

server();
