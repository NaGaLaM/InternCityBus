const mongoose = require('mongoose');
const config = require('../config/config.js');
async function init() {
    try {
        mongoose.connect(config.DB.MongoDB)
        console.log(`Successfully connected to MongoDB`)
    } catch (error) {
        console.log(error);
    }
}

module.exports = init;