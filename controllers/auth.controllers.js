import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const { email, username, password } = req.body;

    let userEmail = await User.findOne({ email });
    let userName = await User.findOne({ username });

    if (userName || userEmail) {
      return res
        .status(409)
        .json({ error: "User with given credentials already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log("Error occurred", err);
    res.status(500).json({ error: "Internal Server error" });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "Username doesn't exist" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET_KEY,
      // { expires: "7d" }
    );

    return res.status(200).json({
      message: "User login successful",
      token,
    });
  } catch (err) {
    console.log("Login error", err);
    res.status(500).send("Internal Server error, login failed");
  }
}
