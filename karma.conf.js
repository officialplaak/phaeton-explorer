
// Karma configuration
const webpackEnv = { test: true };
const webpackConfig = require('./webpack.config')(webpackEnv);

webpackConfig.watch = true;

const filePattern = 'src/**/*.test.js';
const fileRoot = 'src/tests/index.test.js';
const onJenkins = process.env.ON_JENKINS;
process.env.BABEL_ENV = 'test';
module.exports = function (config) {
	config.set({
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',
		frameworks: ['mocha', 'chai'],
		files: [
			fileRoot,
			{ pattern: filePattern, included: false, served: false, watched: false },
		],
		preprocessors: {
			[fileRoot]: ['webpack'],
		},
		reporters: ['coverage', 'mocha'],
		coverageReporter: {
			reporters: [
				{
					type: onJenkins ? 'lcov' : 'html',
					dir: 'coverage/',
				},
			].concat(onJenkins ? { type: 'text' } : []),
		},
		webpack: webpackConfig,
		webpackMiddleware: {
			noInfo: true,
			// and use stats to turn off verbose output
			stats: {
				// options i.e.
				chunks: false,
			},
		},
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: ['ChromeHeadless'],
		singleRun: true,
		browserNoActivityTimeout: 60000,
		browserDisconnectTolerance: 3,
		concurrency: Infinity,
	});
};
