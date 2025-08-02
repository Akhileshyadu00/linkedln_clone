import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js'


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/post', postRoutes);

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log('✅ MongoDB Connected'))
.catch((error) => {
  console.error('❌ MongoDB connection error:', error.message);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
