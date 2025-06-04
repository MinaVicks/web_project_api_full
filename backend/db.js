const mongoose = require('mongoose');
// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mydb');

    console.log('MongoDB connected successfully');

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
// Export the connectDB function
module.exports = connectDB;
