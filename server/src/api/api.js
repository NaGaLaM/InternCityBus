const api = require('express')();
const user = require('./user.api.js');
const admin = require('./admin.api.js')
api.use('/orders', user);
api.use('/admin', admin);

module.exports = api;
