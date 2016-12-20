var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = require('mongoose').Types.ObjectId;

// from here: http://stackoverflow.com/questions/7878557/cant-find-documents-searching-by-objectid-using-mongoose
String.prototype.toObjectId = function() {
  return new ObjectId(this.toString());
};

// Every String can be casted in ObjectId now
// console.log('545f489dea12346454ae793b'.toObjectId());

var errorCodeSchema = new Schema({
	code: String,  // 错误码
	brief_desc: String,  // 错误描述
	created_at: Date,
	// date: String,
	verbose_desc: String  // 其他信息
});

var errorCodeModel = mongoose.model('code', errorCodeSchema); 

module.exports = errorCodeModel;