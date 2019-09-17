
const config = {};
config.PHA = {};
config.freegeoip = {};
config.redis = {};
config.log = {};
config.exchangeRates = {
	exchanges: {
		LSK: {},
		BTC: {},
	},
};
config.marketWatcher = { exchanges: {}, candles: { poloniex: {} }, orders: {} };
config.cacheDelegateAddress = {};

module.exports = config;
