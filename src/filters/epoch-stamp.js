
import AppFilters from './filters.module';

AppFilters.filter('epochStamp', $rootScope => (d) => {
	const epoch = $rootScope.nodeConstants && $rootScope.nodeConstants.epoch ?
		$rootScope.nodeConstants.epoch :
		'2016-05-24T17:00:00.000Z';

	return new Date((((Date.parse(epoch) / 1000) + d) * 1000));
});
