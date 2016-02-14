var express = require('express');
var router = express.Router();
var Person = require('../models/person');

var maxResults = 9;

/* GET home page. */
router.get('/', function(req, res, next) {
    Person.find()
        .limit(maxResults)
        .exec()
        .then(function(people) {
            res.render('index', {
                people: people,
                prev: 0,
                next: 2,
                favorite: false
            });
            return;
        })
        .catch(function(err) {
            res.sendStatus(500);
            console.log(err);
        });
});

router.get('/page/:num', function(req, res, next) {
    var currentPage = parseInt(req.params.num, 10);

    Person.find()
        .skip(currentPage * maxResults)
        .limit(maxResults)
        .exec()
        .then(function(people) {
            res.render('index', {
                people: people,
                currentPage: currentPage,
                prev: (currentPage - 1),
                next: (currentPage + 1),
                favorite: false
            });
            return;
        })
        .catch(function(err) {
            res.sendStatus(500);
            console.log(err);
        });
});

router.get('/favorites', function(req, res, next) {
    Person.find(
            { favorite: 1 }
        )
        .exec()
        .then(function(people) {
            res.render('index', {
                people: people,
                favorite: true
            });
            return;
        })
        .catch(function(err) {
            res.sendStatus(500);
            console.log(err);
        });
});

router.get('/privacy', function(req, res, next) {
    res.render('static', { title: 'Privacy Policy'});
});

router.get('/terms', function(req, res, next) {
    res.render('static', { title: 'Terms of Use'});
});

router.get('/logout', function(req, res, next) {
    res.render('logout');
});

module.exports = router;
