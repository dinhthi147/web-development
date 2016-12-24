var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var User = require('../Lib/users.js');
var FacebookStrategy = require('passport-facebook').Strategy;
module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user:', user.name, ' ', user.id);
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        User.findById(user.id, function(err, user) {
            console.log('deserializing user:',user.name, ' ', user.id);
            done(err, user);
        });
    });

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
          User.findByUsername(username, function(err, user) {
                    if (err)
                        return done(err);
                    if (user == null){
                        console.log('User Not Found with username '+username);
                        return done(null, false);
                    }
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false); // redirect back to login page
                    }
                    return done(null, user);
                }
            );
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            User.findByUsername(username, function(err, user) {
                // In case of any error, return using the done method
                if (err){
                    console.log('Error in SignUp: '+ err);
                    return done(err);
                }
                // already exists
                if (user != null) {
                    console.log('User already exists with username: '+ username);
                    return done(null, false);
                } else {
                    // if there is no user, create the user
                    if (username != null ) {
                      var newUser = {
                        id: null,
                        username: username,
                        password: createHash(password),
                        idGoogle: null,
                        idFacebook: null,
                        name: req.body.name,
                        phone: null,
                        email: null,
                        address: null,
                        role: null
                      }

                      // INSERT user to database
                      User.addUser(newUser, function(result){
                        if (result) {
                          console.log(newUser.username + ' Registration succesful');
                          User.findByUsername(username, function(err, user){
                            return done(null, user);
                          });
                        }
                        else {
                          console.log('Error in Saving user: ' + username);
                        }
                      });
                    }
                }
            });
        })
    );

    passport.use('facebook', new FacebookStrategy({
      clientID: '1782878718649718',
      clientSecret: '5b74cdd6141defed02df659367c2cefa',
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'photos', 'email', 'gender']
    },
    function(req, accessToken, refreshToken, profile, cb) {
      User.findByFacebookID(profile.id, function (err, user) {
        if (user == null){
          var post = {
            id: null,
            username: null,
            password: null,
            idGoogle: null,
            idFacebook: profile.id,
            name: profile.displayName,
            phone: null,
            email: profile.emails[0].value,
            address: null,
            role: null
          }
          User.addUser(post, function(err, result){
              User.findByFacebookID(profile.id, function(err, user){
                return cb(err, user);
              });
          });
        }
        else {
          return cb(err, user);
        }
      });
    }
    ));

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};
