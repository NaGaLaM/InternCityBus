const { DB } = require('../config/config');
const knex = require('knex')(DB.mysql);


async function initMysql() {
    try {
        await knex.raw('select 1');
        console.log('MySql connected successfully');
    } catch (error) {
        console.log(error, 'MYSQL ERROR!');
    }
}

module.exports = {
    initMysql,
    DB
};
