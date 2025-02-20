var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require("dotenv").config();
const {connectToMongoDb} = require("./config/db");


const http = require('http') ;

var indexRouter = require('./routes/indexRouter');
var usersRouter = require('./routes/usersRouter');
var osRouter = require('./routes/osRouter');
var clientRouter = require('./routes/clientRouter');
var adminRouter = require('./routes/adminRouter');
var productRouter = require('./routes/productRouter');
var orderRouter = require('./routes/orderRouter');
var cartRouter = require('./routes/cartRouter');
var commentRouter = require('./routes/commentRouter');

var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/os', osRouter);
app.use('/client', clientRouter);
app.use('/admin', adminRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/cart', cartRouter);
app.use('/comment', commentRouter);

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
