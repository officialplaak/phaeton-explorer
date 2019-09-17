/*
 * PhaetonHQ/phaeton-explorer
 * Copyright © 2018 Phaeton Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Phaeton Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */

const request = require('request');
const HttpStatus = require('http-status-codes');

const validateHttpResponse = (response) => {
	if (response.statusCode === HttpStatus.OK) return true;
	return false;
};

const get = url => new Promise((resolve, reject) => {
	request.get({
		url,
		json: true,
	}, (err, response, body) => {
		if (err || !validateHttpResponse(response)) {
			return reject(err || 'Response was unsuccessful');
		}
		return resolve(body);
	});
});

module.exports = { get };
