const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI, {
            connectTimeoutMS: 20000,
        });
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); 
    }
};

module.exports = connectDB;
