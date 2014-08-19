objectId = require('mongodb').ObjectID;

exports.getIdeas = function(req, res, next) {
 
    req.db.Ideas.find({}, '_id name description category author votes', function(err, list) {
      if (err) next(err);
      res.json(200, list);
    });
 
};

exports.add = function(req, res, next) {

// var cache = [];
// var result = JSON.stringify(req, function(key, value) {
//     if (typeof value === 'object' && value !== null) {
//         if (cache.indexOf(value) !== -1) {
//             // Circular reference found, discard key
//             return;
//         }
//         // Store value in our collection
//         cache.push(value);
//     }
//     return value;
// });
// cache = null;

// 	console.log('New idea created: ' + result + req.body);
  if (req.body) 
  {
    req.db.Ideas.create({
      name: req.body.name,
      description: req.body.description || null,
      category: req.body.category,
      author:  req.body.author,      
      votes: []
      },
     function(err, docs) {
      if (err) 
      {
        console.error(err);
        next(err);
      } 
      else 
      {
        res.json(200, docs);
      }

    });
  } 
  else
  {
    next(new Error('No data'));
  }
};

exports.getIdea = function(req, res, next) {
  if (req.params.id) 
  {
  	console.log('GET idea id: ' + req.params.id);
    req.db.Ideas.findById(req.params.id, {
      name: true,
      description: true,
      category: true,
      author: true,
      votes: true
    }, function(err, obj) {
      if (err) next(err);
      if (!obj) 
      {
        next('Nothing is found.');
      } 
      else
      {
        res.json(200, obj);
      }
    });
  }
  else 
  {
    next('No idea id');
  }
};

exports.del = function(req, res, next) {
	console.log('DELETE idea id: ' + req.params.id);
  req.db.Ideas.findById(req.params.id, function(err, obj) {
    if (err) next(err);
      obj.remove();
      res.json(200, obj);
    })
};

exports.upVote = function (req, res, next) {
  console.log ('POST vote counted in for id:' + req.params.id);

  req.db.Votes.create({
      voter: 'testestest'
      },
     function(err, docs) {
      if (err) 
      {
        console.error(err);
        next(err);
      } 
      else
      {
         console.log ('docs' + docs);
         req.db.Ideas.update( { _id: req.params.id },
                       { $addToSet: {votes: docs._id} } );
      
      }    

    });

    res.json(200);  

};