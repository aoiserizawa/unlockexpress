var express = require('express');
var router = express.Router();
var namespace = require('express-namespace');
var app = express();


app.namespace('/home', function (){

    /* GET users listing. */
    router.get('/', function(req, res) {
      res.send('respond with a resource');
    });

    router.get('/land', function(req, res) {
      res.send('this is working master, well done');
    });

});

module.exports = router;
