const mongoose = require('mongoose');

const connectToMongo = async () => {
    const uri = process.env.MONGO_URL; // Read from environment variable
    if (!uri) {
        throw new Error("MONGO_URL is not defined");
    }

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit process if connection fails
    }
};

module.exports = connectToMongo;
