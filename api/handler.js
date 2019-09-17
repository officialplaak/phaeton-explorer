
module.exports = (api, endpoint, param, req, res, next) => {
	if (!api || !api[endpoint]) {
		return new Error('The given endpoint is not defined in the given Api');
	}
	return api[endpoint].call(
		api,
		param,
		(data) => {
			res.json(data);
		},
		(data) => {
			req.json = data;
			return next();
		});
};
