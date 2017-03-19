var ErrorCodeModel = require('../../model/errorCode');
var CategoryModel = require('../../model/category');
var _ = require('lodash');

function add (req, res, next){
	
	var opt = _.pick(req.body, ['code', 'brief_desc', 'verbose_desc', 'category_id']);
	opt.created_at = new Date();

	var errorCode = new ErrorCodeModel(opt);

	errorCode.save(function(err){
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


function mod (req, res, next){
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

function query (req, res, next){

	var options = Object.assign({}, req.query);

	ErrorCodeModel.find(options, function(err, errorCodes){
		CategoryModel.find({}, function(err, categories){
			var map = categories.reduce(function(ret, item){
				ret[item._id.toString()] = item.name;
				return ret;
			}, {});

			errorCodes.forEach(function(item){
				// console.log(typeof item.category_id);
				if(map[item.category_id]){
					item.category_name = map[item.category_id];
				}
			});

			res.json({
				ret_code: 0,
				data: {
					items: errorCodes,
					total: errorCodes.length
				}			
			});			
		});		
	});	
};

exports.query = query;
exports.add = add;
exports.del = del;
exports.mod = mod;