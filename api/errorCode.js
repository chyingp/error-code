var ErrorCodeModel = require('../model/errorCode');

var add = function(req, res, next){
	var errorCode = new ErrorCodeModel(req.body);
	errorCode.save(function(err){
		if(err){
			res.send(err);
		}else{
			res.json({
				ret_code: 0,
				data: req.body
			});
		}
	});
};

var del = function(req, res, next){
	var options = {
		_id: req.body.id.toObjectId()
	};
	ErrorCodeModel.find(options).remove(function(err, data){	
		// TODO 判断是否存在
		if(err){
			console.log(err);
		}else{
			res.send(data.result); 
		}
	});	
};


var mod = function(req, res, next){
	var query = {
		code: req.body.code.toString()
	};

	ErrorCodeModel.update(query, {desc: req.body.desc}, function(err, rawResponse){
		if(err){
			console.log(err);
		}else{
			res.send(rawResponse); 
		}
	});
};

var query = function(req, res, next){
	// var options = {
	// 	_id: req.query.id.toObjectId()
	// };
	var options = Object.assign({}, req.query);
	// if(req.query.id){
	// 	options.query._id = req.query.id.toObjectId();
	// }
	ErrorCodeModel.find(options, function(err, errorCodes){
		console.log(errorCodes);
		res.json({
			ret_code: 0,
			data: {
				items: errorCodes,
				total: errorCodes.length
			}			
		});
	});	
};

var express = require('express');
var router = express.Router();

router.post('/add', add);
router.post('/del', del);
router.post('/mod', mod);
router.get('/query', query);

module.exports = router;