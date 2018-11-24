const mongoose = require('mongoose');
const route = require('express').Router();
const adminRoutes = require('./adminRoutes');
const studentRoutes = require('./studentRoutes');
const lecturerRoutes = require('./lecturerRoutes');
const authenticationRoutes = require('./authenticationRoutes')

route.use('/', authenticationRoutes);
route.use('/admin', adminRoutes);
route.use('/student', studentRoutes);
route.use('/lecturer', lecturerRoutes);

module.exports = route;