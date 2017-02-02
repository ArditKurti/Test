var express = require('express');
var router = express.Router();
var isAuth = require('../middleware/isAuthenticated');
var Account = require('../models/account');
var moment = require('moment');
var _ = require('lodash');
var hasAuth = require('../middleware/notAuthorized');

router.get('/',isAuth,hasAuth, function(req, res, next) {
    var info = {username: req.user.username,
        isAdmin: req.user.isAdmin,
        name : req.user.fullname};
    res.render('report' , info);
});


router.post('/get-all', isAuth, function(req, res, next) {

    Account.find({
        createdAt: {
            $gte: moment(req.body.startTime),
            $lt: moment(req.body.endTime)
        }
    }).lean().exec(function(err, accounts) {
        if (err) {
            console.log(err);
            res.status(404);
        }

        var data = {
            data: accounts
        };
        res.send(data);

    });

});


module.exports = router;