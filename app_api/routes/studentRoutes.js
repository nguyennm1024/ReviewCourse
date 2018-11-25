const route = require('express').Router();
const studentCtrl = require('../controller/studentCtrl')

route.post('/getClass', studentCtrl.getClass);
route.post('/getReport', studentCtrl.getReport);
route.post('/postReport', studentCtrl.postReport);

module.exports = route;