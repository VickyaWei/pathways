const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://pathway:test123@cluster0.j7w35.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log(`MongoDB connected`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;

