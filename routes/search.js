var express = require('express');
var router = express.Router();
var Person = require('../models/person');

/* Go to search results. */
router.get('/', function(req, res, next) {
    res.redirect('/');
    return;
});

router.post('/', function(req, res, next) {
    var search = req.body.search;
    res.redirect('/search/' + search);
    return;
});

router.get('/:term', function(req, res, next) {
    var term = req.params.term,
        search = new RegExp(term, "i");

    Person.find({
        $or: [
            { 'first_name': search },
            { 'last_name': search }
        ]
    })
    // only get 10 records
    .limit(10)
    // gives you a fully-fledged promise
    .exec()
    // On resolve return promise object
    .then(function(people) {
        res.render('index', { people: people, term: term });
        return;
    })
    // catch erros and log to console.
    .catch(function(err) {
        res.sendStatus(500);
        console.error(err);
    });
});

router.get('/add/:term', function(req, res, next) {
    var term = req.params.term.trim().split(' '),
        firstName = term.shift(),
        lastName = term.join(' ');

    var person = new Person({
        first_name: firstName,
        last_name: lastName,
        created_at: new Date(),
        updated_at: new Date()
    });

    person
        .save()
        .then(function() {
            res.redirect('/');
            return;
        })
        .catch(function(err) {
            res.sendStatus(500);
            console.error(err);
        });
});

module.exports = router;
