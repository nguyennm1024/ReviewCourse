const mongoose = require('mongoose');
const uri = 'mongodb://localhost/btl';

mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.on('connected', () => console.log('connected to ' + uri));
mongoose.connection.on('disconnected', () => console.log('disconnected to ' + uri));
mongoose.connection.on('error', err => console.log(err));

require('./admin');
require('./class');
require('./lecturer');
require('./report');
require('./student');
//require('./seed')