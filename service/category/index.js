var CategoryModel = require('../../model/category');
var _ = require('lodash');

function add (req, res, next){
	
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

function del (req, res, next){
	var options = {
		_id: req.body._id.toObjectId()
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


function mod (req, res, next){
	var query = {
		_id: req.body._id.toString()
	};

	var newItem = {
		desc: req.body.desc, 
		name: req.body.name,
		modify_at: new Date()
	};

	CategoryModel.update(query, newItem, function(err, rawResponse){
		if(err){
			console.log(err);
		}else{
			res.send(rawResponse); 
		}
	});
};

function query (req, res, next){
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

exports.add = add;
exports.del = del;
exports.query = query;
exports.mod = mod;