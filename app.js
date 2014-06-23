var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbr   = require('express3-handlebars'); // "express3-handlebars"

var app = express();

var server = require('http').createServer(app),
io = require('socket.io').listen(server);

// Pass the Express instance to the routes module
var routes = require('./routes/main')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbr({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//socket io recieving message
io.sockets.on('connection', function(socket){

    socket.on('changeText', function(data){
        io.sockets.emit('newText', data);

    });
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

server.listen(3000);
