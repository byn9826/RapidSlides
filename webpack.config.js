var webpack = require('webpack');

module.exports = {
    entry: {
        //slides: "./source/Slides.jsx",
        editor: "./source/Editor.jsx"
    },
    output: {
        path: __dirname + '/static/js',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
	        {
	        	test: /\.(js|jsx)$/,
		        exclude: /(node_modules|bower_components)/,
		        loader: 'babel-loader',
		        query: {
		            presets: ["react", "es2015"]
		        }
	        }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins : [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false
            }
        })
    ]
}
