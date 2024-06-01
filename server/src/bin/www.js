const http = require('http');
const mongoose = require('mongoose');
const App = require('../app.js');
const config = require('../config/config.js');
const PORT = config.PORT || 8000;
App._init();
const server = http.createServer(App.app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

