module.exports = {
	entry: './public/js/index.js',  // 注意不要写 js/entry.js
	output: {
		path: __dirname,
		filename: 'public/bundle/bundle.js'
	},
	module: {
	  loaders: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel-loader',
	      query: {
	        presets: ['es2015', 'react', 'stage-2']
	      }
	    }
	  ]
	}	
};