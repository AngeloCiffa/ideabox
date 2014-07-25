var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function callback () {
  console.log('DB exists')
});

app.use(express.static(__dirname ));

var server = app.listen(5000, function() {
    console.log('Listening on port %d', server.address().port);
    console.log('Local directory is: %s', __dirname)
});