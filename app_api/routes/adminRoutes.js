const route = require('express').Router();
const adminCtrl = require('../controller/adminCtrl')

const authMiddleware = require('express-jwt')({
    userProperty: 'payload',
    secret: 'JWT_SECRET'
});

route.post('/updateInfo',authMiddleware, adminCtrl.updateInfo);
route.get('/allStudent', authMiddleware, adminCtrl.allStudent);
route.get('/allLecturer',authMiddleware,adminCtrl.allLecture);
route.post('/createStudent',authMiddleware,adminCtrl.createStudent);
route.post('/createLecturer',authMiddleware,adminCtrl.createLecturer);
route.post('/deleteStudent', authMiddleware,adminCtrl.deleteStudent)
route.post('/deleteLecturer', authMiddleware,adminCtrl.deleteLecturer);
route.post('/allClass', authMiddleware,adminCtrl.allClass);
route.post('/studentInClass', authMiddleware,adminCtrl.studentInClass);
route.post('/getStudentReport',authMiddleware ,adminCtrl.getStudentReport)

module.exports = route;