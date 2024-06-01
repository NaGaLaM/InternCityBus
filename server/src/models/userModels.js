const mongoose = require('mongoose');

const orders = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    price:
    {
        type: Number,
        required: true
    },
    seats:
    {
        type: [Number]
    },
    city:
    {
        type: String
    },
    created_at:
    {
        type: Date,
    },
    paytime:
    {
        type: Date
    }
})



module.exports = mongoose.model('Orders', orders);
