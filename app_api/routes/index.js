const route = require('express').Router();
const adminRoute = require('./adminRoutes')

route.use('/admin', adminRoute);

module.exports =route;