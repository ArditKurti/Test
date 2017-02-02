var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var info = {username: req.user.username,
        name: req.user.fullname,
        isAdmin: req.user.isAdmin};
    res.redirect('/kerkesa' ,info);
});

router.get('/logout', logout);

function logout(req, res) {
    if (req.isAuthenticated()) {

        req.session.isLogged = false;
        req.logout();
    }
    res.redirect('/login');
}

module.exports = router;
