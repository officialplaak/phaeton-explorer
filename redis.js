
const redis = require('redis');
const logger = require('./utils/logger');

module.exports = function (config) {
	const client = redis.createClient(
		config.redis.port,
		config.redis.host,
		{ db: config.redis.db });

	if (config.redis.password) {
		client.auth(config.redis.password, (err) => {
			if (err) {
				logger.error(`Can't connect to redis: ${err}`);
			}
		});
	}

	client.on('connect', () => {
		logger.info(`Redis: Connected to ${config.redis.host}:${config.redis.port}`);
	});

	client.on('error', (err) => {
		logger.error(`Redis: ${err.message}`);
	});

	client.on('reconnecting', () => {
		logger.warn('Redis: reconnecting...');
	});

	return client;
};
