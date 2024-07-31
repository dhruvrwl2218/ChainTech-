import { Router } from "express";
import { User } from "../models/user.js";
// Registration endpoint
const router = Router();
router.post("/register", async (req, res) => {
  const { username, email, password, phoneNumber, dateOfBirth, gender } =
    req.body;
  console.log(req.body);
  try {
    const newUser = new User({
      username,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      gender,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful", user: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit user details endpoint
router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, password, phoneNumber, dateOfBirth, gender } =
    req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password, phoneNumber, dateOfBirth, gender },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user details endpoint
router.get("/details/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
