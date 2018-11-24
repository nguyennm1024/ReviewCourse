<<<<<<< HEAD
const mongoose = require('mongoose');
const route = require('express').Router();
const adminRoutes = require('./adminRoutes');
const studentRoutes = require('./studentRoutes');

route.use('/admin', adminRoutes);
route.use('/student', studentRoutes);

module.exports = route;
=======
const route = require('express').Router();
const adminRoute = require('./adminRoutes')

route.use('/admin', adminRoute);

module.exports =route;
>>>>>>> d2f873040586ae7ced9092f6d8116e2dc8e7c814
