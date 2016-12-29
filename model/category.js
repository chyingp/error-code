/**
 * 错误分类
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = require('mongoose').Types.ObjectId;

// from here: http://stackoverflow.com/questions/7878557/cant-find-documents-searching-by-objectid-using-mongoose
String.prototype.toObjectId = function() {
  return new ObjectId(this.toString());
};

// Every String can be casted in ObjectId now
// console.log('545f489dea12346454ae793b'.toObjectId());

var categorySchema = new Schema({
	name: String,  // 分类名
	desc: String,  // 分类描述
	created_at: Date,  // 创建时间
	modify_at: Date  // 修改时间
});

var categoryModel = mongoose.model('category', categorySchema); 

module.exports = categoryModel;