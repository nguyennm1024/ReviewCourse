require('dotenv').load();
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')
const logger = require('morgan')
const apiRoute = require('./app_api/routes/index');
const passport = require('passport')
const cors = require('cors');

require('./app_api/config/passport')
require('./app_api/model/db')

const app = express();

app.set('views', path.join(__dirname, 'views'));
//Cho phep nhung html vao trang khac
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());


app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api',apiRoute);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.json({message: err})
  });
  app.listen(5000, () => {
    console.log("Connected to port 5000");
  });
  //module.exports = app;
  