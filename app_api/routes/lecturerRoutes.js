const route = require('express').Router();
const studentCtrl = require('../controller/lecturerCtrl')

route.post('/allClass', studentCtrl.allClass);

module.exports = route;