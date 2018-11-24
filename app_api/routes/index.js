const mongoose = require('mongoose');
const route = require('express').Router();
const adminRoutes = require('./adminRoutes');
const studentRoutes = require('./studentRoutes');
const lecturerRoutes = require('./lecturerRoutes');

route.use('/admin', adminRoutes);
route.use('/student', studentRoutes);
route.use('/lecturer', lecturerRoutes);

module.exports = route;