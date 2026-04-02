const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoutes = require('./backend/routes/authRoutes');

app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/al0haraze';
const jwtSecret = process.env.JWT_SECRET || 'your_secret_key';

if (!process.env.JWT_SECRET) {
  console.warn('Warning: JWT_SECRET not set in environment variables');
}

if (!process.env.MONGODB_URI) {
  console.warn('Warning: MONGODB_URI not set in environment variables');
}

if (process.env.MONGODB_URI) {
  mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection failed:', err));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
