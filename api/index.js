const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const { User } = require("./models/User");
const app = express();
const cookieParser = require("cookie-parser");
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

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("EYSSS");
});

app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
    if (err) throw err;
    try {
      await User.create({ username: req.body.username, password: hash });
    } catch (err) {
      console.error(err);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
