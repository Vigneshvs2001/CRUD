const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ DB connection error:', err));

// Schema & Model
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String
}));
// Get all users
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
  });
  
// Register User
app.post('/register', async (req, res) => {
  const { name, email } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const user = new User({ name, email });
  await user.save();
  res.json({ message: 'User registered successfully' });
});

// Login User
app.post('/login', async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findOne({ name, email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  res.json({ message: 'Login successful' });
});

// Start server
app.listen(5000, () => {
  console.log('🚀 Server running at http://localhost:5000');
});
