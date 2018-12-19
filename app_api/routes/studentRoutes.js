const route = require('express').Router();
const studentCtrl = require('../controller/studentCtrl')

const jwt = require('jsonwebtoken')
const authMiddleware = require('express-jwt')({
    userProperty: 'payload',
    secret: 'JWT_SECRET'
});
//getClass
route.post('/allClass',authMiddleware ,(req,res) => {
    let bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined') {
        return res.status(403).json({message: "Token undefined"});
    }
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    //console.log(token);
    jwt.verify(token, "JWT_SECRET", (err, authData) => {
        if(err) return res.status(403).json({message:"Token error"});
        if(authData.role === "student")
            studentCtrl.allClass(req,res);
        else return res.status(403).json({message:"You are not student"});
    })
});

route.post('/getReport', authMiddleware,(req,res) => {
    let bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined') {
        return res.status(403).json({message: "Token undefined"});
    }
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    //console.log(token);
    jwt.verify(token, "JWT_SECRET", (err, authData) => {
        if(err) return res.status(403).json({message:"Token error"});
        if(authData.role === "student")
            studentCtrl.getReport(req,res);
        else return res.status(403).json({message:"You are not student"});
    })
});

route.post('/postReport', (req,res) => {
    let bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined') {
        return res.status(403).json({message: "Token undefined"});
    }
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    //console.log(token);
    jwt.verify(token, "JWT_SECRET", (err, authData) => {
        if(err) return res.status(403).json({message:"Token error"});
        if(authData.role === "student")
            studentCtrl.postReport(req,res);
        else return res.status(403).json({message:"You are not student"});
    })
});
// route.post('/getReport', authMiddleware,studentCtrl.getReport);
// route.post('/postReport', authMiddleware,studentCtrl.postReport);

module.exports = route;