const serverless = require('serverless-webpack');
const externals = require('webpack-node-externals');

module.exports = {
	context: __dirname,
	mode: serverless.lib.webpack.isLocal ? 'development' : 'production',
	devtool: serverless.lib.webpack.isLocal ? 'cheap-module-eval-source-map' : 'source-map',
	entry: serverless.lib.entries,
	resolve: {
		extensions: [ '.tsx', '.ts', '.json' ]
	},
	target: 'node',
	externals: [ externals() ],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: [
					/node_modules/,
					/.serverless/,
					/.webpack/,
					/dist/
				]
			}
		]
	}
};
