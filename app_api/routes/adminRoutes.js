const route = require('express').Router();
const adminCtrl = require('../controller/adminCtrl')
const jwt = require('jsonwebtoken')

const authMiddleware = require('express-jwt')({
    userProperty: 'payload',
    secret: 'JWT_SECRET'
});

route.post('/updateInfo', (req,res) => {
    let bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined') {
        return res.status(403).json({message: "Token undefined"});
    }
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    //console.log(token);
    jwt.verify(token, "JWT_SECRET", (err, authData) => {
        if(err) return res.status(403).json({message:"Token error"});
        if(authData.role === "admin")
            adminCtrl.updateInfo(req,res);
        else return res.status(403).json({message:"You are not admin"});
    })
});

route.get('/allStudent', (req,res) => {
    let bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined') {
        return res.status(403).json({message: "Token undefined"});
    }
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    //console.log(token);
    jwt.verify(token, "JWT_SECRET", (err, authData) => {
        if(err) return res.status(403).json({message:"Token error"});
        if(authData.role === "admin")
            adminCtrl.allStudent(req,res);
        else return res.status(403).json({message:"You are not admin"});
    })
});

route.get('/allLecturer', (req,res) => {
    let bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined') {
        return res.status(403).json({message: "Token undefined"});
    }
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    //console.log(token);
    jwt.verify(token, "JWT_SECRET", (err, authData) => {
        if(err) return res.status(403).json({message:"Token error"});
        if(authData.role === "admin")
            adminCtrl.allLecture(req,res);
        else return res.status(403).json({message:"You are not admin"});
    })
});

route.post('/createStudent', (req,res) => {
    let bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined') {
        return res.status(403).json({message: "Token undefined"});
    }
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    //console.log(token);
    jwt.verify(token, "JWT_SECRET", (err, authData) => {
        if(err) return res.status(403).json({message:"Token error"});
        if(authData.role === "admin")
            adminCtrl.createStudent(req,res);
        else return res.status(403).json({message:"You are not admin"});
    })
});

route.post('/createLecturer', (req,res) => {
    let bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined') {
        return res.status(403).json({message: "Token undefined"});
    }
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    //console.log(token);
    jwt.verify(token, "JWT_SECRET", (err, authData) => {
        if(err) return res.status(403).json({message:"Token error"});
        if(authData.role === "admin")
            adminCtrl.createLecturer(req,res);
        else return res.status(403).json({message:"You are not admin"});
    })
});

route.post('/deleteStudent', (req,res) => {
    let bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined') {
        return res.status(403).json({message: "Token undefined"});
    }
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    //console.log(token);
    jwt.verify(token, "JWT_SECRET", (err, authData) => {
        if(err) return res.status(403).json({message:"Token error"});
        if(authData.role === "admin")
            adminCtrl.deleteStudent(req,res);
        else return res.status(403).json({message:"You are not admin"});
    })
});

route.post('/deleteLecturer', (req,res) => {
    let bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined') {
        return res.status(403).json({message: "Token undefined"});
    }
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    //console.log(token);
    jwt.verify(token, "JWT_SECRET", (err, authData) => {
        if(err) return res.status(403).json({message:"Token error"});
        if(authData.role === "admin")
            adminCtrl.deleteLecturer(req,res);
        else return res.status(403).json({message:"You are not admin"});
    })
});

route.post('/allClass', (req,res) => {
    let bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined') {
        return res.status(403).json({message: "Token undefined"});
    }
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    //console.log(token);
    jwt.verify(token, "JWT_SECRET", (err, authData) => {
        if(err) return res.status(403).json({message:"Token error"});
        if(authData.role === "admin")
            adminCtrl.allClass(req,res);
        else return res.status(403).json({message:"You are not admin"});
    })
});

route.post('/studentInClass', (req,res) => {
    let bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined') {
        return res.status(403).json({message: "Token undefined"});
    }
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    //console.log(token);
    jwt.verify(token, "JWT_SECRET", (err, authData) => {
        if(err) return res.status(403).json({message:"Token error"});
        if(authData.role === "admin")
            adminCtrl.studentInClass(req,res);
        else return res.status(403).json({message:"You are not admin"});
    })
});

route.post('/getStudentReport', (req,res) => {
    let bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined') {
        return res.status(403).json({message: "Token undefined"});
    }
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    //console.log(token);
    jwt.verify(token, "JWT_SECRET", (err, authData) => {
        if(err) return res.status(403).json({message:"Token error"});
        if(authData.role === "admin")
            adminCtrl.getStudentReport(req,res);
        else return res.status(403).json({message:"You are not admin"});
    })
});
// route.post('/updateInfo',authMiddleware, adminCtrl.updateInfo);
// route.get('/allStudent', authMiddleware, adminCtrl.allStudent);
// route.get('/allLecturer',authMiddleware,adminCtrl.allLecture);
// route.post('/createStudent',authMiddleware,adminCtrl.createStudent);
// route.post('/createLecturer',authMiddleware,adminCtrl.createLecturer);
// route.post('/deleteStudent', authMiddleware,adminCtrl.deleteStudent)
// route.post('/deleteLecturer', authMiddleware,adminCtrl.deleteLecturer);
// route.post('/allClass', authMiddleware,adminCtrl.allClass);
// route.post('/studentInClass', authMiddleware,adminCtrl.studentInClass);
// route.post('/getStudentReport',authMiddleware ,adminCtrl.getStudentReport)

module.exports = route;