var express = require('express');
var router = express.Router();
var Branches = require('../Lib/branches')
var User = require('../Lib/users')
module.exports = function(passport){
	//sends successful login state back to view(angular)
	router.get('/success',function(req,res){
		var manager = false;
		var admin = false;
		if (req.user.role == "manager")
			manager = true;
		if (req.user.role == "admin")
			admin = true;
		res.send({state: 'success', user: req.user.username ? req.user.username: null, manager: manager, admin: admin});
	});
	//send failure login state back to view(angular)
	router.get('/failure',function(req,res){
		res.send({state: 'failure',user:null,message:"Invalid username or password"});
	});
	//login requeset
	router.post('/login',passport.authenticate('login',{
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure'
	}));

	//signup request
	router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

	//logout request
	router.get('/signout', function(req, res) {
		req.session.user = null;
        req.logout();
        res.redirect('/');
    });

	router.get('/facebook', passport.authenticate('facebook', { scope : 'email' }));
	// handle the callback after facebook has authenticated the user
	router.get('/facebook/callback',
	     passport.authenticate('facebook', {
	         successRedirect : '/',
	         failureRedirect : '/'
	     }));
	router.get('/loginState', function(req, res){
		if (req.isAuthenticated())
			res.send({'isLogin':true, 'user': {'displayName': req.user.name}})
		else
			res.send({'isLogin':false})
	});

	router.post('/bookTableAtBranch', isLoggedIn, function(req, res){
			var bookInfo = {
				idOrder: null,
				idTable: req.body.idTable,
				idUser: req.user.id,
				date: req.body.date,
				startTime: req.body.startTime,
				endTime: req.body.endTime,
				phone: req.body.phone,
				name: req.body.name,
				message: req.body.message
			}
			console.log(bookInfo)
			Branches.bookTableAtBranch(bookInfo, function(error, result){
				res.send({"message":"Book Table Successful"})
			});
		});

		router.get('/profile', isLoggedIn, function(req, res){
			res.send({'isLogin':true,
								'user':{
									'displayName': req.user.name,
									'phone': req.user.phone,
									'email': req.user.email,
									'address': req.user.address
									}});
		});

		router.post('/updateUserInfo', isLoggedIn, function(req, res){
			var post = req.body;
			User.updateUserInfo(req.user.id, post, function(error, result){
				res.send({"message": "success"});
			})
		});

	 function isLoggedIn(req, res, next) {

	     // if user is authenticated in the session, carry on
	     if (req.isAuthenticated())
	         return next();

	     // if they aren't redirect them to the home page
	     res.redirect('/');
	 }

	return router;
}
