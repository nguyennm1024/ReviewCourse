const route = require('express').Router();
const adminCtrl = require('../controller/adminCtrl')


route.post('/updateInfo', adminCtrl.updateInfo);
route.get('/allStudent', adminCtrl.allStudent);
route.get('/allLecturer',adminCtrl.allLecture);
route.post('/createStudent', adminCtrl.createStudent);
route.post('/createLecturer', adminCtrl.createLecturer);
route.post('/deleteStudent', adminCtrl.deleteStudent)
route.post('/deleteLecturer', adminCtrl.deleteLecturer);
route.post('/allClass', adminCtrl.allClass);
route.post('/studentInClass', adminCtrl.studentInClass);
route.post('/getStudentReport', adminCtrl.getStudentReport)

module.exports = route;