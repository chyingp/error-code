var mongoose   = require('mongoose');
var url  = require('url');
var dbConf = {
	hostname: '127.0.0.1',
	port: '27017',
	name: 'errorCode'
};
var dblink = url.format({
	protocol: 'mongodb',
	slashes: true,
	hostname: dbConf.hostname,
	port: dbConf.port,
	pathname: '/' + dbConf.name
});

// console.log(dblink);

mongoose.connect(dblink, function(err){
	if(err){
		console.error('mongodb connected failed!');
	}else{
		console.log('mongodb connected successfully!');	
	}	
});

module.exports = mongoose;