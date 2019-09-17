
import AppFilters from './filters.module';

/**
 * @todo check the possibility of removing hard coded hashes
 */
AppFilters.filter('nethash', () => (nethash) => {
	switch (nethash) {
	case 'da3ed6a45429278bac2666961289ca17ad86595d33b31037615d4b8e8f158bba':
		return 'Testnet';
	case 'ed14889723f24ecc54871d058d98ce91ff2f973192075c0155ba2b7b70ad2511':
		return 'Mainnet';
	case 'ef3844327d1fd0fc5785291806150c937797bdb34a748c9cd932b7e859e9ca0c':
		return 'Betanet';
	default:
		return 'local';
	}
});
