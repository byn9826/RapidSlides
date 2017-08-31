var webpack = require('webpack');

const common = {
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
    }
};

const frontend = {
    entry: {
        export: "./source/Export.jsx"
    },
    output: {
        path: __dirname + '/raw',
        filename: '[name].bundle.js'
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
};

const backend = {
    entry: {
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
    }
};

module.exports = [
    Object.assign({} , common, frontend),
    Object.assign({} , common, backend)
];