const route = require('express').Router();
const studentCtrl = require('../controller/studentCtrl')

const authMiddleware = require('express-jwt')({
    userProperty: 'payload',
    secret: 'JWT_SECRET'
});

route.post('/getClass', authMiddleware,studentCtrl.getClass);
route.post('/getReport', authMiddleware,studentCtrl.getReport);
route.post('/postReport', authMiddleware,studentCtrl.postReport);

module.exports = route;