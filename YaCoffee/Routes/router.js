var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	res.render('index',{title:"YaCoffee"});
});

router.get('/login',function(req,res,next){
	if (req.isAuthenticated()){
		console.log("authenticated")
		res.redirect('/profile')
	}
	else
		res.render('login');
});

router.get('/register',function(req,res,next){
	res.render('register');
});

router.get('/buyonline',function(req,res,next){
	res.render('buyonline');
});

router.get('/profile',function(req,res,next){
	if (req.isAuthenticated()){
		res.render('profile');
	} else {
		res.send('404 not found (you haven\'t log in)');
	}
});

router.get('/manager',function(req,res,next){
	if (req.isAuthenticated() && req.user.role =='manager'){
		res.render('manager');
	}
	else{
		res.send('404 not found (you haven\'t log in or you\'re not a manager)');
	}
});

module.exports = router;
