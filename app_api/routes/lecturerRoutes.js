const route = require('express').Router();
const lecturer = require('../controller/lecturerCtrl')
const jwt = require('jsonwebtoken')

const authMiddleware = require('express-jwt')({
    userProperty: 'payload',
    secret: 'JWT_SECRET'
});

route.post('/allClass', authMiddleware, (req,res) => {
    let bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined') {
        return res.status(403).json({message: "Token undefined"});
    }
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    //console.log(token);
    jwt.verify(token, "JWT_SECRET", (err, authData) => {
        if(err) return res.status(403).json({message:"Token error"});
        if(authData.role === "lecturer")
            lecturer.allClass(req,res);
        else return res.status(403).json({message:"You are not lecturer"});
    })
});

route.post('/studentInClass', authMiddleware, (req,res) => {
    let bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === 'undefined') {
        return res.status(403).json({message: "Token undefined"});
    }
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    //console.log(token);
    jwt.verify(token, "JWT_SECRET", (err, authData) => {
        if(err) return res.status(403).json({message:"Token error"});
        if(authData.role === "lecturer")
            lecturer.studentInClass(req,res);
        else return res.status(403).json({message:"You are not lecturer"});
    })
});
module.exports = route;