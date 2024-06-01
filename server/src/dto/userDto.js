module.exports = class User {
    name = null;
    surname = null;
    username = null;
    password = null;
    constructor(data) {
        this.name = data.name;
        this.surname = data.surname;
        this.username = data.username;
        this.password = data.password;
    }
};