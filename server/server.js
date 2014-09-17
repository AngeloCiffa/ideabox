var express = require('express'),
    routes = require('./routes');

var router = express.Router();
module.exports = router;

var app = express();

var bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))
// parse application/json
app.use(bodyParser.json())

//Error handling

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);


function logErrors(err, req, res, next) {
    console.error('logErrors', err.toString());
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    console.error('clientErrors ', err.toString());
    res.send(500, {
        error: err.toString()
    });
    if (req.xhr) {
        console.error(err);
        res.send(500, {
            error: err.toString()
        });
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    console.error('lastErrors ', err.toString());
    res.send(500, {
        error: err.toString()
    });
}

/////////////////
//DB related
////////////////

var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost/ideaBoxDB';

var connection = mongoose.createConnection(dbUrl);
connection.on('error', console.error.bind(console, 'DB connection error:'));
connection.once('open', function() {
    console.info('connected to database: ideaBoxDB found')
});

var models = require('./models');
var db = function(req, res, next) {
    req.db = {
        Ideas: connection.model('Ideas', models.Ideas, 'ideas')
        /*   ,Votes: connection.model('Votes', models.Votes, 'votes')*/
    };
    return next();
}

/////////////////
//REST API related
////////////////


//IDEAS
app.get('/api/ideas', db, routes.ideas.getIdeas);
app.post('/api/idea', db, routes.ideas.add);
app.get('/api/idea/:id', db, routes.ideas.getIdea);
//app.put('/api/ideas/:id', db, routes.ideas.updatePost);
app.delete('/api/idea/:id', db, routes.ideas.del);
app.post('/api/vote/:id', db, routes.ideas.upVote);
/////////////////
//NODE related
////////////////

//we serve our content
//app.use(express.static(__dirname));
app.use(express.static('../client/build'));
var server = app.listen(5000, function() {
    console.log('Listening on port %d', server.address().port);
    console.log('Local directory is: %s', '../client/build')
});

//For debug purpose only
function loggerMiddleware(req, res, next) {
    console.log("I have been called awesome")
};
