
const config = require('./config.global');

/**
 * CONFIGURATION
 */
config.host = '0.0.0.0'; // Interface to listen on, 0.0.0.0 to listen on all available
//config.port = 8082; // Port to listen on
config.port = 6040; // Port to listen on
//config.port = 9001; // Port to listen on
//config.port=443;
/**
 * PHA node http://13.250.116.189:6040/
 
 443
 */

/* 
 // Test Net Local dev server 
config.PHA.host =  '103.15.67.74';
config.PHA.port =  8000;
config.PHA.apiPath = '/api';

*/
// Main Net Live  server 

config.PHA.host =  'http://149.28.172.230';
config.PHA.port =  8000;
config.PHA.apiPath = '/api';



/**
 * FreeGeoIP server
 */
config.freegeoip.host =  '127.0.0.1';

/**
 * Redis server
 */
config.redis.host =  '127.0.0.1';
config.redis.port =  6380;
config.redis.db =  0;
config.redis.password = '';

// Time in seconds to store cache in Redis
config.cacheTTL = 20;

// Collect logs (true - enabled, false - disabled)
config.log.enabled = true;
// Output for logs - can be device file or ordinary path
config.log.file = './logs/explorer.log';
// Log level - (trace, debug, info, warn, error)
config.log.level = 'info';

/**
 * Header price tickers, Currency switcher
 */
// Exchange rates support (true - enabled, false - disabled)
config.exchangeRates.enabled = true;
// Interval in ms for checking exchange rates (default: 30 seconds)
config.exchangeRates.updateInterval = 30000;

// Configuration for different currency pairs, set false to disable pair
// LSK/BTC pair, supported: poloniex
config.exchangeRates.exchanges.LSK.BTC = false;
// LSK/CNY pair, supported: jubi, bitbays
config.exchangeRates.exchanges.LSK.CNY = false;
// BTC/USD pair, supported: bitfinex, bitstamp, btce
config.exchangeRates.exchanges.BTC.USD = false;
// BTC/EUR pair, supported: bitstamp, bitmarket
config.exchangeRates.exchanges.BTC.EUR = false;
// BTC/RUB pair, supported: btce, exmo
config.exchangeRates.exchanges.BTC.RUB = false;
// BTC/PLN pair, supported: bitmarket
config.exchangeRates.exchanges.BTC.PLN = false;

/**
 * Market watcher
 */
// Market watcher support (true - enabled, false - disabled)
config.marketWatcher.enabled = true;
// Poloniex exchange support (true - enabled, false - disabled)
config.marketWatcher.exchanges.poloniex = true;
// Bittrex exchange support (true - enabled, false - disabled);
config.marketWatcher.exchanges.bittrex = true;
// Interval in ms for updating candlestick data (default: 30 seconds)
config.marketWatcher.candles.updateInterval = 30000;
// Build candles based on trades form last 30 days
config.marketWatcher.candles.poloniex.buildTimeframe = 60 * 60 * 24 * 30;
// Interval in ms for updating order book data (default: 15 seconds)
config.marketWatcher.orders.updateInterval = 15000;

/**
 * Cache delegate info in order to replace address by username
 */
// Delegate caching support (true - enabled, false - disabled)
config.cacheDelegateAddress.enabled = true;
// Interval in ms for checking new delegates registration (default: 60 seconds)
config.cacheDelegateAddress.updateInterval = 60000;

module.exports = config;
