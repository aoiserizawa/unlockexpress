var routes = require('./index');
var users = require('./users');

module.exports = function(app){
    // define routes

    app.use('/', routes);
    app.use('/users', users);
};
