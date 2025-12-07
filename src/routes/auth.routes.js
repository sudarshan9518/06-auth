const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");

const jwt = require("jsonwebtoken")



router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  const user = await userModel.create({
    username,
    password,
  });



  const token = jwt.sign({
    id:user._id,
  },process.env.JWT_SECRET)

  res.cookie("token", token)




  res.status(201).json({
    message: "user register successfully",
    user,
    token
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

router.get("/user", async(req, res)=>{
  const {token} = req.cookies;

  if(!token){
    return res.status(401).json({
      message :"unauthorized"
    })
  }

  try{
    const decode = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findOne({
      
      _id : decode.id

    }).select("-password  -__v").lean()
  
  
    res.status(201).json({
      message:  "user fetch succesfully",
      user
    })

  }
  catch(err){
    return res.status(401).json({
      message :"unauthorized - invalid token"
    })
  }

   
})
module.exports = router;
