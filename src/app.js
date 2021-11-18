const express = require("express");
require("dotenv").config();
//DB
require("./database").connect();
//Model
const { User } = require("./model");

const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Starter");
});

app.post("/register", async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (firstName !== "" && lastName !== "" && email !== "" && password !== "") {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(401).send("User already exists");
    }

    res.status(201).json("Starter");
  } else {
    res.status(400).send("All fields required");
  }
});

module.exports = app;
