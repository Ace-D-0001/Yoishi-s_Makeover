const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yoishis_makeover', {
      serverSelectionTimeoutMS: 3000 // Quick timeout for local offline testing
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`MongoDB Connection Warning: ${error.message}`);
    console.log("Running in offline mock-data fallback mode.");
    return false;
  }
};

module.exports = connectDB;
