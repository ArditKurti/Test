var express = require('express');
var router = express.Router();
var isAuth = require('../middleware/isAuthenticated');

router.get('/',isAuth,function (req, res, next) {
    var info = {
        username: req.user.username,
        name: req.user.fullname
    };
    res.render("notAuthorized", info);
});


module.exports = router;