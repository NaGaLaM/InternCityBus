const orders = require('../models/userModels');
const message = require('../models/messageModel');
module.exports = class UserService {
    static async get_orders(filter) {
        try {
            const data = await orders.find({ city: filter, created_at: { $gte: new Date().getDate() } }, { seats: true, _id: false, created_at: true });
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    static async post_orders(data) {
        try {
            await orders.create(data);
            console.log(`order added successfully`);
        } catch (error) {
            console.log(error);
        }
    }

    static async send_message(data) {
        try {
            await message.create(data);
            console.log('message sent successfully');
        } catch (error) {

        }
    }
}