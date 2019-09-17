
const logger = require('../utils/logger');


module.exports = (api, endpoint, param, deferred, type, getExtraData) =>
	api[endpoint].call(
		api,
		param,
		({ error }) => {
			deferred.resolve();
			logger.error(`${type}.${endpoint} ~>`, `Error retrieving ${type}: ${error}`);
		},
		(data) => {
			deferred.resolve();
			const extraData = getExtraData ? getExtraData(data) : '';
			logger.info(`${type}.${endpoint} ~>`, `${extraData} ${type} retrieved in ${String(deferred.elapsed)} seconds`);
		});
