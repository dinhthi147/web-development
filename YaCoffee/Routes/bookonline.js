var express = require('express');
var router = express.Router();
var branch = require('../Lib/branches.js')

router.get('/getBranches',function(req,res,next){
	branch.getAllBranch(function(error,branches){
    res.send(branches);
  });
});

router.post('/TablesAtBranch',function(req,res,next){
	branch.getTablesAtBranch(req.body.idBranch, function(error,table){
    res.send(table);
  });
});

router.get('/getListBookTable', function(req,res,next){
	if (req.isAuthenticated() && req.user.role =='manager'){
		branch.getListBookTable(req.user.id, function(error,table){
	    res.send(table);
	  });
	}
});
module.exports = router;
