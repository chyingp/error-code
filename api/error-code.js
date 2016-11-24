var add = function(req, res, next){
	
};

var del = function(req, res, next){

};


var mod = function(req, res, next){

};

var query = function(req, res, next){

};

var express = require('express');
var router = express.Router();

router.post('/add', add);
router.post('/del', del);
router.post('/mod', mod);
router.post('/query', query);

module.exports = router;

