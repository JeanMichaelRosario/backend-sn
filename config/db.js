const { mongo_url } = require('./config');
const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(mongo_url);
        console.log("Mongo is connected...");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDb;