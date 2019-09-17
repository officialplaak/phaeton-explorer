
module.exports = [
	{
		path: 'getLastBlocks',
		service: 'blocks',
		params: req => req.query.n,
	}, {
		path: 'getBlock',
		service: 'blocks',
		params: req => req.query.blockId,
	}, {
		path: 'getHeight',
		service: 'blocks',
		params: req => req.query.height,
	}, {
		path: 'getBlockStatus',
		service: 'blocks',
		params: () => undefined,
	},
];
