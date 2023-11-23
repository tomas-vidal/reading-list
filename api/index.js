const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const { User } = require("./models/User");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT;
const saltRounds = Number(process.env.SALT_ROUNDS);

mongoose
  .connect(
    `mongodb+srv://vidalltomas:${process.env.API_KEY}@mernchat.zdjbxno.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Succesfully connected to DB");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("EYSSS");
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", "");
  res.end();
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.SALT_TOKEN, function (err, decoded) {
    if (err) return err;
    res.send(decoded.username).end();
  });
  res.status(401).end();
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });
  if (!user) {
    return;
  }
  bcrypt.compare(password, user.password, function (err, result) {
    if (err) throw err;
    if (result) {
      jwt.sign(
        { username: user.username, _id: user._id },
        process.env.SALT_TOKEN,
        function (err, token) {
          if (err) return err;
          res.cookie("token", token);
          res.send();
        }
      );
    }
  });
});

app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
    if (err) throw err;
    try {
      const newUser = await User.create({
        username: req.body.username,
        password: hash,
      });
      jwt.sign(
        { username: newUser.username, _id: newUser._id },
        process.env.SALT_TOKEN,
        function (err, token) {
          if (err) return err;
          res.cookie("token", token);
          res.send();
        }
      );
    } catch (err) {
      console.error(err);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
