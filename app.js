var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const session = require("express-session"); //session

require("dotenv").config();
const {connectToMongoDb} = require("./config/db");


const logMiddleware = require('./middlewares/logsMiddlewares.js'); //log

const http = require('http') ;

//gemini
const fetch = require('node-fetch');
global.fetch = fetch;
global.Headers = fetch.Headers;
global.Request = fetch.Request;
global.Response = fetch.Response;


var indexRouter = require('./routes/indexRouter');
var usersRouter = require('./routes/usersRouter');
var osRouter = require('./routes/osRouter');
var clientRouter = require('./routes/clientRouter');
var adminRouter = require('./routes/adminRouter');
var productRouter = require('./routes/productRouter');
var orderRouter = require('./routes/orderRouter');
var cartRouter = require('./routes/cartRouter');
var commentRouter = require('./routes/commentRouter');
var geminiRouter = require('./routes/geminiRouter');

var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(logMiddleware)  //log

app.use(cors({
  origin:"http://localhost:3000",
  methods:"GET,POST,PUT,Delete",
}));

app.use(session({   //cobfig session
  secret: "net secret pfe",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: {secure: false},
    maxAge: 24*60*60,
  
  },  
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/os', osRouter);
app.use('/client', clientRouter);
app.use('/admin', adminRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/cart', cartRouter);
app.use('/comment', commentRouter);
app.use('/gemini', geminiRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

 
  res.status(err.status || 500);
  res.json('error');
});

const server = http.createServer(app);

server.listen(process.env.port,() => {
   console.log('app is runnig on port 5000');
  });
