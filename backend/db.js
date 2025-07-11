import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    await connect("mongodb://localhost:27017/mydb");

    console.log('MongoDB connected');

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

import './models/user.js';
import './models/card.js';

export default connectDB;
