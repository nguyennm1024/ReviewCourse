const route = require('express').Router();
const authenticationCtrl = require('../controller/authenticationCtrl')

route.post('/login', authenticationCtrl.login);

module.exports = route;