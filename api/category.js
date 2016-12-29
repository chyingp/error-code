var CategoryModel = require('../model/category');
var _ = require('lodash');

var add = function(req, res, next){
	
	var opt = _.pick(req.body, ['name', 'desc']);
	opt.created_at = new Date();
	opt.modify_at = new Date();

	var category = new CategoryModel(opt);

	category.save(function(err){
		if(err){
			res.send(err);
		}else{
			res.json({
				ret_code: 0,
				data: opt
			});
		}
	});
};

var del = function(req, res, next){
	var options = {
		_id: req.body.id.toObjectId()
	};
	CategoryModel.find(options).remove(function(err, data){	
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
		_id: req.body.id.toString()
	};

	CategoryModel.update(query, {desc: req.body.desc, name: req.body.name}, function(err, rawResponse){
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
	CategoryModel.find(options, function(err, categories){
		console.log(categories);
		res.json({
			ret_code: 0,
			data: {
				items: categories,
				total: categories.length
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