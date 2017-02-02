var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
const localOptions = {usernameField:'username'};


passport.use(new LocalStrategy(localOptions,
    function(username, password, done) {

        User.findOne({username:username},function (err, user) {
            if(err){
                return done(err)
            }
            if(!user){
                return done(null,false)
            }
            //compare passwords - is `password` equal to user.password
            user.comparePassword(password,function (err, isMatch) {
                if(err) {
                    return done(err);
                }
                if(!isMatch) {
                    return done(null,false);
                }

                return done(null,user);
            })
        });

    }
));

router.post('/',loginPost);

function loginPost(req, res, next) {

    // ask passport to authenticate
    passport.authenticate('local', function(err, user) {
        if (err) {
            // if error happens
            return res.redirect('/login');

        }

        if (!user) {
            // if authentication fail, get the error message that we set
            // from previous (info.message) step, assign it into to
            // req.session and redirect to the login page again to display

            return res.redirect('/login');

        }

        // if everything's OK
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }

            // set the message
            return res.redirect('/kerkesa');
        });

    })(req, res, next);
}




router.get('/', function(req, res, next) {
    if(req.user){
        res.redirect('/scheda-ascolti');
    }
    res.render('login', { layout: false });
});

router.post('/register', function (req, res, next) {
    var fullname = req.body.fullname;
    var username = req.body.username;
    var password = req.body.password;

    if(!username || !password || !fullname ){
        return res.status(422).send({error:'Registration failed'});
    }

    User.findOne({username:username}, function (err, existingUser) {
        if(err) {return next(err)}

        //if a user with email does exist, return an error
        if(existingUser){
            return res.status(422).send('Username is in use');
        }


        //if a user with email does not exist, create and save the user record

        const user = new User({
            fullname:fullname,
            username:username,
            password:password,
            isAdmin:false
        });

        user.save(function (err) {
            if(err){return next(err)}
            //Respond to request indicating the user was created
            res.redirect('/admin');

        });

    });

});


module.exports = router;