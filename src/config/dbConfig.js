const mongoose = require('mongoose');
const serverconfig = require('./serverconfig');

async function connectDB() {
   try {
       await mongoose.connect(serverconfig.DB_URL);
       console.log("Successfully connected to the mongodb server....");
   } catch (error) {
        console.log("Not able to connect to the mongodb server");
        console.log(error);
   } 
}

module.exports = connectDB;