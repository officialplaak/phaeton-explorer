
import App from './app';

App.run((
	$rootScope,
	$state,
	$location,
	$stateParams,
	$anchorScroll,
	$http,
	gettextCatalog,
	$transitions,
) => {
	gettextCatalog.currentLanguage = 'en';
	$transitions.onSuccess({ to: '*' }, () => {
		$rootScope.titleDetail = '';
		$rootScope.title = $state.current.title;
		$rootScope.isCollapsed = true;

		// Market Watcher
		$http.get('/api/exchanges').then((result) => {
			if (result.data.success && result.data.enabled) {
				$rootScope.marketWatcher = true;
			}
		});

		$location.hash($stateParams.scrollTo);
		$anchorScroll();
	});

	$http.get('/api/nodeConstants').then((result) => {
		if (result && result.data) {
			$rootScope.nodeConstants = result.data;
		}
	});
});
