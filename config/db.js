const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("Mongo is connected...");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDb;