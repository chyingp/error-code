var ErrorCodeModel = require('../model/errorCode');

var add = function(req, res, next){
	var errorCode = new ErrorCodeModel(req.body);
	errorCode.save(function(err){
		if(err){
			res.send(err);
		}else{
			res.json({
				ret_code: 0
			});
		}
	});
};

var del = function(req, res, next){

};


var mod = function(req, res, next){

};

var query = function(req, res, next){
	var options = {
		_id: req.query.id.toObjectId()
	};
	ErrorCodeModel.find(options, function(err, errorCodes){
		console.log(errorCodes);
		res.send(errorCodes);
	});	
};

var express = require('express');
var router = express.Router();

router.post('/add', add);
router.post('/del', del);
router.post('/mod', mod);
router.get('/query', query);

module.exports = router;