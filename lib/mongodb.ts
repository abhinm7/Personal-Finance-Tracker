import mongoose from 'mongoose';


async function connectDB() {
  // If already connected, return
  if (mongoose.connections[0].readyState) return;

  
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw new Error('Cannot connect to database');
  }
}

export default connectDB;