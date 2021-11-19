const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
  try {
    const { firstName, lastName, email, password } = req.body;

    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        console.log("🚀 --- app.post --- existingUser", existingUser);
        return res.status(401).send("User already exists");
      }

      const encryptedPassword = await bcryptjs.hash(password, 10);

      const user = await User.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const token = jwt.sign(
        {
          user_id: user._id,
          email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 3600,
        }
      );

      user.token = token;
      user.password = undefined;
      console.log("🚀 --- app.post --- user", user);

      return res.status(201).json(user);
    } else {
      return res.status(400).send("All fields required");
    }
  } catch (error) {
    console.log("🚀 --- app.post --- error", error);
    return res.status(400).send("Error Occured");
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email !== "" && password !== "") {
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        res.status(401).send("Not registered");
      }

      const isPasswordValid = await bcryptjs.compare(
        password,
        existingUser.password
      );

      if (!isPasswordValid) {
        res.status(401).send("Incorrect Password");
      }

      const token = jwt.sign(
        {
          user_id: existingUser._id,
          email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 3600,
        }
      );

      existingUser.token = token;
      existingUser.password = undefined;

      res.status(200).json(existingUser);
    } else {
      res.status(400).send("All fields required");
    }
  } catch (error) {
    console.log("🚀 --- app.post --- error", error);
    res.status(400).send("Error Occured");
  }
});

module.exports = app;
