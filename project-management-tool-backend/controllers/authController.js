const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.register = async (req, res) => {
  try {
    console.log("📨 Incoming registration data:", req.body);
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Creating user:", { name, email, password: "******", role });
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      });
  } catch (error) {
    console.error("❌ Registration failed:", error);
    res.status(500).json({ message: 'Registration failed', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });      
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};