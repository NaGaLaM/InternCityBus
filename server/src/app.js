// Node Modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')
// Local modules
const config = require('./config/config.js');
const db = require('./storage/initdb.js')
const api = require('./api/api.js');

class App {
    constructor() {
        this.app = express();
        this.app.use(express.static(path.join(__dirname, '..', '..', 'public')));
    }
    // Initilize all 
    async _init() {
        await this._initDB();
        this._initCors();
        this._reqLoger();
        this._initReq();
        this._initApi();
    }
    // Request logger on of funciton
    _reqLoger() {
        if (config.logger) {
            this.app.use(morgan('dev'));
        }
    }
    // Accesibility for requests
    _initCors() {
        this.app.use(cors(config.cors));
    }
    // initialize json and body parser
    _initReq() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }))
    }

    // DB connection
    async _initDB() {
        db._init();
    }

    _initApi() {
        this.app.use('/bus', api);
    }
}

module.exports = new App();