var express = require('express');
var router = express.Router();
var Person = require('../models/person');

/* Go to home page. */
router.get('/', function(req, res, next) {
    res.redirect('/');
    return;
});

router.put('/:id', function(req, res, next) {
    var id = req.params.id,
        body = req.body;

    Person.findOneAndUpdate(
        { _id: id },
        {
            first_name: body.first_name,
            last_name: body.last_name,
            updated_at: body.updated_at
        }
    )
    .then(function() {
        res.sendStatus(200);
        console.log(id + ' has been updated');
        return;
    })
    .catch(function(err){
        res.sendStatus(500);
        console.log(err);
    });
});

router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    Person.find(
        { _id: id }
    )
    .remove()
    .exec()
    .then(function() {
        res.sendStatus(200);
        console.log(id + ' has been updated');
        return;
    })
    .catch(function(err){
        res.sendStatus(500);
        console.log(err);
    });
});

module.exports = router;
