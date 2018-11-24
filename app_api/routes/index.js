const mongoose = require('mongoose');
const route = require('express').Router();
const adminRoutes = require('./adminRoutes');
const studentRoutes = require('./studentRoutes');

route.use('/admin', adminRoutes);
route.use('/student', studentRoutes);

module.exports = route;