var ErrorCodeModel = require('../model/errorCode');
var CategoryModel = require('../model/category');
var _ = require('lodash');

var add = function(req, res, next){
	
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

var express = require('express');
var router = express.Router();

router.post('/add', add);
router.post('/del', del);
router.post('/mod', mod);
router.get('/query', query);

module.exports = router;