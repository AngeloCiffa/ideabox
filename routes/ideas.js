objectId = require('mongodb').ObjectID;

exports.getIdeas = function(req, res, next) {
 
    req.db.Ideas.find({}, '_id name description category author votes', function(err, list) {
      if (err) next(err);
      res.json(200, list);
    });
 
};

exports.add = function(req, res, next) {
  if (req.body) {
    req.db.Ideas.create({
      name: req.body.name,
      description: req.body.description || null,
      category: req.body.category ,
      author: {
        id: 12121212,
        name: req.body.author
      },
      votes: 0
    }, function(err, docs) {
      if (err) {
        console.error(err);
        next(err);
      } else {
        res.json(200, docs);
      }

    });
  } else {
    next(new Error('No data'));
  }
};

exports.getIdea = function(req, res, next) {
  if (req.params.id) {
    req.db.Ideas.findById(req.params.id, {
      name: true,
      description: true,
      category: true,
      author: true,
      votes: true
    }, function(err, obj) {
      if (err) next(err);
      if (!obj) {
        next('Nothing is found.');
      } else {
        res.json(200, obj);
      }
    });
  } else {
    next('No idea id');
  }
};

exports.del = function(req, res, next) {
  req.db.Ideas.findById(req.params.id, function(err, obj) {
    if (err) next(err);
      obj.remove();
      res.json(200, obj);
    })
};