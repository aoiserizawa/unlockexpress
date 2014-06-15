var express = require('express');
var router = express.Router();
var namespace = require('express-namespace');
var app = express();


app.namespace('/home', function (){

    /* GET users listing. */
    router.get('/', function(req, res) {
      res.send('respond with a resource');
    });

});

module.exports = router;
