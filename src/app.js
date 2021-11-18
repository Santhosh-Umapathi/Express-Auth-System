const express = require("express");
const bcryptjs = require("bcryptjs");
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

    const encryptedPassword = await bcryptjs.hash(password, 10);

    const user = User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    res.status(201).json("Starter");
  } else {
    res.status(400).send("All fields required");
  }
});

module.exports = app;
