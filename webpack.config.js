
const Path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Webpack = require('webpack');
const NgAnnotatePlugin = require('ng-annotate-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageConfig = require('./package.json');

/**
 * Utils
 */
const removeEmpty = arr => arr.filter(p => !!p);

/**
 * Path and env configs
 */
const PATHS = {
	app: Path.join(__dirname, 'src'),
	dev: Path.resolve(__dirname, 'public'),
	build: Path.join(__dirname, 'dist'),
	test: Path.join(__dirname, 'test'),
	vendors: /node_modules|bower_components/,
};

const LivePATHS = {
	app: Path.join(__dirname, 'src'),
	dev: Path.resolve(__dirname, 'public'),
	build: Path.join(__dirname, 'dist'),
	test: Path.join(__dirname, 'test'),
	vendors: /node_modules|bower_components/,
};

process.traceDeprecation = true;
const whichpath=1

if(whichpath==1)
{
	PATHS.dev=LivePATHS.dev
}
else if(whichpath==2)
{
	PATHS.dev=LivePATHS.build
}
module.exports = () => ({
	devtool: 'hidden',
	entry: Path.resolve(__dirname, `${PATHS.app}/main.js`),
	output: {
		filename: '[name].bundle.js',
		path: Path.resolve(__dirname, PATHS.dev),
		sourceMapFilename: '[name].map',
	},
	devServer: {
		contentBase: PATHS.dev,
		compress: true,
		port: 9001,
		proxy: {
			'/socket.io': 'https://core.plaak.com:443',
			'/api': 'https://core.plaak.com:443/api/',
		},
	},
	resolve: {
		alias: {
			sigma: Path.resolve(__dirname, 'node_modules/sigma/build/sigma.require.js'),
		},
	},
	plugins: removeEmpty([
		new HtmlWebpackPlugin({
			template: 'src/index.ejs',
			serviceName: process.env.SERVICE_NAME,
			clientId: process.env.CLIENT_ID,
			version: packageConfig.version,
		}),
		new BundleAnalyzerPlugin({
			openAnalyzer: false,
			analyzerMode: 'static',
		}),
		new Webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			mangle: false,
		}),
		new Webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			chunks: ['main'],
			minChunks: module => PATHS.vendors.test(module.resource),
		}),
		new Webpack.ProvidePlugin({
			app: `exports?exports.default!${Path.join(PATHS.app, 'app')}`,
			$: Path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js'),
		}),
		new Webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),

		new NgAnnotatePlugin({
			add: true,
		}),
	]),
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					quiet: true,
					emitWarning: true,
					fix: true,
				},
			},
			{
				test: /\.js$/,
				exclude: PATHS.vendors,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ['env', 'stage-3'],
						plugins: ['syntax-trailing-function-commas'],
						env: {
							test: {
								plugins: ['istanbul'],
							},
						},
					},
				}],
			}, {
				test: /\.scss$/,
				loader: 'style!css!scss',
				include: PATHS.app,
			}, {
				test: /\.css$/,
				// exclude: PATHS.vendors,
				use: ['style-loader', 'css-loader'],
			}, {
				test: /\.html$/,
				exclude: /node_modules/,
				use: [{
					loader: 'html-loader',
					options: {
						minimize: true,
					},
				}],
			}, {
				test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file-loader?name=fonts/[name].[ext]',
			}, {
				test: /\.(swf)$/,
				loader: 'file-loader?name=[name].[ext]',
			}, {
				test: /\.(png|jpg|gif|svg)$/,
				use: [{
					loader: 'file-loader',
					options: {
						query: {
							name: 'img/[name].[ext]',
						},
					},
				},
				{
					loader: 'image-webpack-loader',
					options: {
						query: {
							mozjpeg: {
								progressive: true,
							},
							gifsicle: {
								interlaced: true,
							},
							optipng: {
								optimizationLevel: 7,
							},
						},
					},
				}],
			}, {
				test: /\/sigma.*\.js?$/,
				use: [{
					loader: 'imports-loader?sigma',
				}],
			},
		],
	},
});
