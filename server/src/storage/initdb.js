// const { initMysql } = require('./mysql.js');
const initMongo = require('./mongo.js');
module.exports = class initDB {
    static async _init() {
        // initMysql();
        initMongo();
    }
}
