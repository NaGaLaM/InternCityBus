const messageModel = require('../models/messageModel.js');
const userModels = require('../models/userModels.js');
const UserService = require('../services/userService.js');
const Mailer = require('../services/nodemailer.js');
module.exports = class UserController {
    static async get_messages(req, res) {
        try {
            const data = await messageModel.find({}, {}, {});
            res.send(data);
        } catch (error) {
            console.log(error);
        }
    }

    static async get_order(req, res) {
        try {
            const data = await userModels.find({}, {}, {});
            res.send(data);
        } catch (error) {
            console.log(error);
        }
    }

    static async get_orders(req, res) {
        try {
            const { city } = req.params;
            const filter = city == 1 ? 'Աբովյան' : city == 2 ? "Արմավիր" : city == 3 ? "Ապարան" : false;
            const data = await UserService.get_orders(filter);
            res.send(data);

        } catch (error) {
            console.log(error, 'error getting users');
        }
    }

    static async post_orders(req, res) {
        try {
            const data = req.body
            data.date.month -= 1;
            let created_at = new Date(2024, data.date.month, data.date.day + 1);
            data.created_at = created_at;
            data.paytime = new Date();
            console.log(data);
            await UserService.post_orders(data);
            await Mailer.sendMail({ mail: data.mail, city: data.city, price: data.price, count: data.count }, JSON.stringify({ name: data.name, city: data.city, seats: data.seats }));
            res.send();
        } catch (error) {
            console.log(error, 'User controller error');
        }
    }

    static async send_message(req, res) {
        try {
            const data = req.body;
            await UserService.send_message(data);
            res.send("Message successfully sent");
        } catch (error) {
            console.log(error);
        }
    }

}