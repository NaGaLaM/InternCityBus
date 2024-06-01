const mongoose = require('mongoose');

const message = new mongoose.Schema(
    {
        name: String,
        email: String,
        subject: String,
        message: String
    })

module.exports = mongoose.model('Message', message);