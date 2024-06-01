const app = require('express')();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const passportLocal = require('passport-local');
const path = require('path');
const userController = require('../controllers/userController.js')
const admins = require('../models/adminsModel.js');
app.use(session({
    secret: "123afjhaklshfkjashfka",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy({}, async (username, password, done) => {
    const admin = await admins.find({ username, password });
    if (!admin[0]) {
        return done(null, null, { message: "incorrect username or password" });
    }
    else {
        return done(null, admin[0]);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
    const admin = await admins.find({ _id });
    done(null, admin[0]);
});
app.post('/login', passport.authenticate("local", {
    successRedirect: "/bus/admin",
    failureRedirect: "/login.html"
}));
function checkAutentic(req, res, next) {
    if (req.isAuthenticated() == false) {
        return res.redirect('/login.html');
    }
    next();
}

app.use(checkAutentic);
app.get('/msg', userController.get_messages);
app.get('/ord', userController.get_order);
app.use(express.static(path.join(__dirname, '..', '..', '..', 'private')));
module.exports = app;