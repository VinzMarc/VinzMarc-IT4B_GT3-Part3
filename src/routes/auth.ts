import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Router } from "express";
import User from "../models/User.js";
import type { RegisterInput, LoginInput } from "../types/index.js";

const router = Router();
const jwtSecret = process.env.JWT_SECRET ?? "dev-secret";

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body as RegisterInput;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
  });

  const token = jwt.sign({ userId: user._id.toString() }, jwtSecret, { expiresIn: "7d" });

  return res.status(201).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body as LoginInput;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id.toString() }, jwtSecret, { expiresIn: "7d" });

  return res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export default router;
