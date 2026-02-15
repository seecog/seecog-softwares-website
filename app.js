// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var debug = require('debug')('server-education:server');
// var http = require('http');

// var app = express();



// //express handlebars start
// var hbs = require( 'express-handlebars');
// app.set('view engine', 'hbs');
// app.engine( 'hbs', hbs( {
//   extname: 'hbs',
//   defaultView: 'default',
//   layoutsDir: __dirname + '/views/layouts/',
//   partialsDir: __dirname + '/views/partials/'
// }));
// //express handlebars end


// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


//   // var port = normalizePort(process.env.PORT || '3002');
// var port = 3002;
// app.set('port', port);

// /**
//  * Create HTTP server.
//  */

// var server = http.createServer(app);

// /**
//  * Listen on provided port, on all network interfaces.
//  */

// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);

// /**
//  * Normalize a port into a number, string, or false.
//  */

// function normalizePort(val) {
//   var port = parseInt(val, 10);

//   if (isNaN(port)) {
//     // named pipe
//     return val;
//   }

//   if (port >= 0) {
//     // port number
//     return port;
//   }

//   return false;
// }

// /**
//  * Event listener for HTTP server "error" event.
//  */

// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }

//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port;

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

// /**
//  * Event listener for HTTP server "listening" event.
//  */

// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }

require('dotenv').config({ path: 'properties.env' });
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var recruitRouter = require('./routes/recruit');
var flashMiddleware = require('./middleware/flash');

var app = express();

/* ===============================
   HANDLEBARS SETUP
================================ */
var hbs = require('express-handlebars');

app.engine('hbs', hbs({
   extname: 'hbs',
   defaultLayout: 'default',
   layoutsDir: path.join(__dirname, 'views/layouts'),
   partialsDir: path.join(__dirname, 'views/partials'),
   runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
   },
   helpers: {
      eq: function (a, b) { return a === b; },
      array: function () {
         return Array.prototype.slice.call(arguments, 0, -1);
      }
   }
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/* ===============================
   GLOBAL VARIABLES (YEAR FOR FOOTER)
================================ */
app.use(function (req, res, next) {
   res.locals.year = new Date().getFullYear();
   // Add render logging for debugging
   const _render = res.render;
   res.render = function (view, options, callback) {
      console.log(`[RENDER] View: ${view}, Layout: ${options && options.layout !== undefined ? options.layout : 'default'}`);
      _render.call(this, view, options, callback);
   };
   next();
});

/* ===============================
   MIDDLEWARE
================================ */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
   secret: process.env.SESSION_SECRET || 'seecog-admin-secret-change-in-production',
   resave: false,
   saveUninitialized: false,
   cookie: {
     secure: process.env.USE_HTTPS === '1',
     httpOnly: true,
     maxAge: 24 * 60 * 60 * 1000
   }
}));
app.use(flashMiddleware);
app.use(express.static(path.join(__dirname, 'public')));

/* ===============================
   ROUTES
================================ */
app.use('/admin', adminRouter);
app.use('/recruit', recruitRouter);
app.use('/', indexRouter);

/* ===============================
   404 HANDLER
================================ */
app.use(function (req, res, next) {
   next(createError(404));
});

/* ===============================
   ERROR HANDLER
================================ */
app.use(function (err, req, res, next) {
   console.error('[SERVER ERROR]', err);
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};
   res.status(err.status || 500);
   // Force NO layout for error page to see the actual error content instead of the homepage fallback
   res.render('error', { layout: false });
});

/* ===============================
   EXPORT APP
================================ */
module.exports = app;
