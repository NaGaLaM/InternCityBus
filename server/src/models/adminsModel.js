const mongoose = require('mongoose');

const admins = new mongoose.Schema(
    {
        username: String,
        password: String
    }
)

module.exports = mongoose.model("admins", admins);