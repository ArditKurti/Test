var express = require('express');
var router = express.Router();
var isAuth = require('../middleware/isAuthenticated');
var Account = require('../models/account');
var moment = require('moment');
var _ = require('lodash');
var isTeknik = require('../middleware/teknikAuthenticated');

router.get('/',isAuth,isTeknik, function (req, res, next) {
    var info = {username: req.user.username,
        isAdmin: req.user.isAdmin,
        name: req.user.fullname};
    res.render('problemi' , info);
});



router.post('/get-account',isAuth, function (req, res, next) {
    Account.findOne({statusi: 'Hapur'}, function (err, account) {
        if (err) {
            console.log(err);
            res.send(err);
        }

        else if (account) {
            account.statusi = 'ne_punim';
            account.save(function (err) {
                if (err) {
                    res.send('Error');
                }
                else {
                    res.send(account);
                }
            });
        }
        else {
            res.send('no account');
        }
    })
});

router.post('/check-account',isAuth, function (req, res, next) {
    Account.findOne({
            $and: [
                {statusi: 'ne_punim'},
                {createdBy: req.user.username}
            ]
        }
        , function (err, account) {


            if(err){
                console.log(err);
            }
            if(account){
                res.send(account);
            }
            else {

                res.send('Asnje kerkese');
            }
        });



});

router.post('/iZgjidhur',isAuth, function (req, res, next) {

    var id = req.body.id;

    Account.findById(id, function (err, account) {
        if (err) {
            res.send(err);
        }
        console.log(account);
        account.statusi = req.body.statusi;
        account.konstatimiProblemit = req.body.konstatimiProblemit;
        account.save(function (err) {
            if (err) {
                res.send('Error')
            }
            else {
                res.send('ok')
            }
        });

    });
});

router.post('/ePaZgjidhshme',isAuth, function (req, res, next) {

    var id = req.body.id;

    Account.findById(id, function (err, account) {
        if (err) {
            res.send(err);
        }
        console.log(account);
        account.statusi = req.body.statusi;
        account.konstatimiProblemit = req.body.konstatimiProblemit;
        account.save(function (err) {
            if (err) {
                res.send('Error')
            }
            else {
                res.send('ok')
            }
        });

    });
});

module.exports = router;