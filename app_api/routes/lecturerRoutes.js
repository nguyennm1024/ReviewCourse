const route = require('express').Router();
const studentCtrl = require('../controller/lecturerCtrl')

const authMiddleware = require('express-jwt')({
    userProperty: 'payload',
    secret: 'JWT_SECRET'
});

route.post('/allClass', authMiddleware,studentCtrl.allClass);

module.exports = route;