const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path:`${__dirname}/../../config.env`});

const database = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

exports.init = async() => {
    try{
        await mongoose.connect(database);
        console.log('Successfully connected to database!')
    } catch(err) {
        console.log(err.message);
    }
};