var express = require('express');
var router = express.Router();
var isAuth = require('../middleware/isAuthenticated');
var Account = require('../models/account');
var isTeknik = require('../middleware/teknikAuthenticated');

/* GET users listing. */
router.get('/',isAuth,function(req, res, next) {
    var info = {username: req.user.username,
        name: req.user.fullname,
        isAdmin: req.user.isAdmin};
    res.render('kerkesa', info);
});

router.post('/save',isAuth,function(req, res, next) {

    var inputKlienti = req.body.inputKlienti;
    var inputKerkesa = req.body.inputKerkesa;
    var inputZona = req.body.inputZona;
    var inputData = req.body.inputData;
    var inputTelefon = req.body.inputTelefon;
    var inputCelular = req.body.inputCelular;
    var inputEmail = req.body.inputEmail;
    var inputProblemi = req.body.inputProblemi;

    var account = new Account({
        klienti             : inputKlienti,
        kerkesa             : inputKerkesa,
        zona                : inputZona,
        data                : inputData,
        telefon             : inputTelefon,
        celular             : inputCelular,
        mail                : inputEmail,
        problemi            : inputProblemi,
        konstatimiProblemit : "",
        createdAt           : new Date(),
        createdBy           : req.user.username,
        statusi             : "Hapur"
    });

    account.save(function(err) {
        if (err) {
            res.redirect('/kerkesa?valid=true&type=warning&message=Errore%20con%20il%20DB,%20Nuk%20u%20inserua');
        }
        else {
            res.redirect('/kerkesa?valid=true&type=success&message=u%20inserua');
        }
    });



});


module.exports = router;