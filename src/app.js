const express = require("express");
require("dotenv").config();

const User = require("./model/user");

const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Starter");
});

app.post("/register", (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (firstName !== "" && lastName !== "" && email !== "" && password !== "") {
    const existingUser = User.findOne({ email });

    if (existingUser) {
      res.status(401).send("User already exists");
    }

    res.status(201).json("Starter");
  } else {
    res.status(400).send("All fields required");
  }
});

module.exports = app;
