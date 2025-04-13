import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/util.js";

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(name);
    console.log(email);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      
      await newUser.save();
      generateToken(newUser._id, res);
      
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Invalid user data" });
    }

 
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in login controller:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

const checkAuth = ()=> {
  
}

export default router;
