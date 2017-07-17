var webpack = require('webpack');

const options = {
    target: () => "electron-main"
};

module.exports = {
    entry: {
        //slides: "./source/Slides.jsx",
        editor: "./source/Editor.jsx"
    },
    target: "electron-main",
    output: {
        path: __dirname + '/static/js',
        filename: '[name].bundle.js'
    },
    node: {
        __filename: true,
        __dirname: true
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
