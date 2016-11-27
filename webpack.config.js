module.exports = {
	entry: './public/js/index.js',  // 注意不要写 js/entry.js
	output: {
		path: __dirname,
		filename: 'public/bundle/bundle.js'
	}
};