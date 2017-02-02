/**
 * Created by ardit.kurti on 12/6/2016.
 */
var express = require('express');
var router = express.Router();
var isAuth = require('../middleware/isAuthenticated');
var hasAuth = require('../middleware/notAuthorized');

var User = require('../models/User');

router.get('/',hasAuth, function (req, res, next) {
    var info = {
        username: req.user.username,
        name: req.user.fullname
    };

    User.find({}, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            info.users = users;
            res.render('admin',info);
        }
    });

});

router.post('/delete', isAuth, function (req, res, next) {
    User.findByIdAndRemove(req.body.id, function (err, todo) {

        if (err) {
            console.log(err);
            res.send({err: 'Errore con il database!'})
        }
        else {
            res.send('ok');
        }

    })
});

router.post('/update-role', isAuth, function (req, res, next) {
    console.log('update-role');
    User.findOneAndUpdate({_id: req.body.id}, {isAdmin: req.body.isAdmin}, function (err) {
            if (err) {
                console.log(err);
                res.send({err: 'Errore con il database!'})
            }
            else {
                res.send('ok');
            }
        }
    );
});

router.post('/update-teknik-role', isAuth, function (req, res, next) {
    User.findOneAndUpdate({_id: req.body.id}, {isTeknikTest: req.body.isTeknikTest}, function (err) {
            if (err) {
                console.log(err);
                res.send({err: 'Errore con il database!'})
            }
            else {
                res.send('ok');
            }
        }
    );
});


module.exports = router;