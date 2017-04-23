var ErrorCodeModel = require('../../model/errorCode');
var CategoryModel = require('../../model/category');
var _ = require('lodash');

// laravel like form validation 
// https://www.npmjs.com/package/validatorjs

function add (req, res, next){
	
	// var opt = _.pick(req.body, ['code', 'brief_desc', 'verbose_desc', 'category_id']);
	// opt.created_at = new Date();

	// var errorCode = new ErrorCodeModel(opt);

	// errorCode.save(function(err){
	// 	if(err){
	// 		res.send(err);
	// 	}else{
	// 		res.json({
	// 			ret_code: 0,
	// 			data: opt
	// 		});
	// 	}
	// });

	var opt = _.pick(req.body, [
		'code', 
		'brief_desc', 
		'verbose_desc', 
		'category_id'
	]);
	opt.created_at = new Date();

	req.checkBody('code').notEmpty('错误码不能为空').isInt('错误码为正整数');
	req.checkBody('brief_desc').notEmpty('描述不能为空').isString('描述必须是字符串');
	req.checkBody('category_id').isString('分类必须是字符串');  // TODO 检测错误分类是否存在
	req.checkBody('verbose_desc').isString('详细描述必须是字符串');

	req.getValidationResult()
	   .then(function(result){
	   		if(result.isEmpty()){
	   			return opt;
	   		}
	   		
	   		var msg = result.array().map((item) => item.msg ).join(', ');
			res.json({
				ret_code: '200100',
				ret_msg: msg
			});
   			return;

	   })
	   .then(function(opt){
			
			var errorCode = new ErrorCodeModel(opt);

			ErrorCodeModel.find({code: opt.code}, function(error, items){
				if(items.length) {
					res.json({
						ret_code: '200101',
						ret_msg: '错误码已存在'
					});
				}else{
					errorCode.save(function(error){
						if(error){
							res.json({
								ret_code: '200202',
								ret_msg: error.message
							});
						}else{
							res.json({
								ret_code: '0',
								data: opt
							});
						}
					});
				}
			});
	   })
	   .catch(function(error){
			res.json({
				ret_code: '200101',
				ret_msg: error.message
			});
	   });
};

function del (req, res, next){
	var _id = req.body._id;
	var options = {
		_id: _id.toObjectId()
	};
	ErrorCodeModel.find(options).remove(function(err, data){	
		// TODO 判断是否存在
		if(err){
			res.json({ret_code: '200300', ret_msg: err.message})
		}else{
			if(data.result.n === 0) {
				res.json({ret_code: '200302', ret_msg: '错误码不存在'});
			}else{
				res.json({ret_code: '0', data: {_id: _id}, ret_msg: 'ok'})
			}
		}
	});	
};


function mod (req, res, next){	

	req.checkBody('_id').notEmpty('id不能为空').isString('id格式不对');
	req.checkBody('brief_desc').isString('描述必须是字符串');
	req.checkBody('category_id').isString('分类必须是字符串');  // TODO 检测错误分类是否存在
	req.checkBody('verbose_desc').isString('详细描述必须是字符串');

	req.getValidationResult()
	   .then(function(result){
	   		if(result.isEmpty()){
	   			return opt;
	   		}
	   		
	   		var msg = result.array().map((item) => item.msg ).join(', ');
			res.json({
				ret_code: '200100',
				ret_msg: msg
			});
   			return;

	   })
	   .then(function(opt){
			ErrorCodeModel.update({_id: req.body._id}, req.body, function(err, rawResponse){
				if(err){
					console.log(err);
					res.json({
						ret_code: '200401',
						ret_msg: err.message
					});
				}else{
					res.send({
						ret_code: '0',
						ret_msg: rawResponse
					}); 
				}
			});
			return;
			
			var errorCode = new ErrorCodeModel(opt);
			var _id = req.body._id;

			ErrorCodeModel.find({code: opt.code}, function(error, items){
				if(items.length) {
					res.json({
						ret_code: '200101',
						ret_msg: '错误码已存在'
					});
				}else{
					errorCode.save(function(error){
						if(error){
							res.json({
								ret_code: '200202',
								ret_msg: error.message
							});
						}else{
							res.json({
								ret_code: '0',
								data: opt
							});
						}
					});
				}
			});
	   })
	   .catch(function(error){
			res.json({
				ret_code: '200101',
				ret_msg: error.message
			});
	   });
};

function query (req, res, next){

	var options = Object.assign({}, req.query);
	var queryOptions = _.defaults(options, {
		page_size: 10,
		page_num: 1
	});

	ErrorCodeModel.find(queryOptions, function(err, errorCodes){
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
				ret_code: '0',
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