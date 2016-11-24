var mongoose   = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/monitor', function(err){
	if(err){
		console.error('mongodb connected failed!');
		return;
	}
	console.log('mongodb connected successfully!');
});

module.exports = mongoose;