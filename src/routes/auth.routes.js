const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  const user = await userModel.create({
    username,
    password,
  });

  res.status(201).json({
    message: "user register successfully",
    user,
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username: username,
  });
  //console.log(user);

  if (!user) {
    return res.status(401).json({
      message: "invalid username",
    });
  }

  const isvalidpass = password == user.password;

  //console.log(isvalidpass);

  if (!isvalidpass) {
    return res.status(401).json({
      message: "invalid password!!",
    });
  }

  res.status(201).json({
    message: "user login successfully",
  });
});

module.exports = router;
