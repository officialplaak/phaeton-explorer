
exports.config = {
	specs: [
		'features/*.feature',
	],

	directConnect: true,
	capabilities: {
		browserName: 'chrome',
	},
	framework: 'custom',
	frameworkPath: require.resolve('protractor-cucumber-framework'),

	cucumberOpts: {
		require: 'features/step_definitions/*.js',
		tags: '~@ignore',
		format: 'pretty',
		profile: false,
		'no-source': true,
	},

	params: {
		screenshotFolder: 'e2e-test-screenshots',
		baseURL: 'http://localhost',
		CoreURL: 'https://core.phaeton.com:443',
	},
};
