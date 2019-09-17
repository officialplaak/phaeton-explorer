
import AppHeader from './header.module';

const HeaderConstructor = function ($rootScope) {
	this.updateBlockStatus = (res) => {
		if (res.success) {
			$rootScope.blockStatus = {
				height: res.height,
				fee: res.fee,
				milestone: res.milestone,
				reward: res.reward,
				supply: res.supply,
				nethash: res.nethash,
			};
		}
	};

	this.updatePriceTicker = (res) => {
		if (res.success) {
			$rootScope.currency.tickers = res.tickers;
		}

		// When ticker for user-stored currency is not available - switch to PHA temporarily
		if ($rootScope.currency.symbol !== 'PHA' &&
			(!$rootScope.currency.tickers ||
			!$rootScope.currency.tickers.PHA ||
			!$rootScope.currency.tickers.PHA[$rootScope.currency.symbol])) {
			$rootScope.currency.symbol = 'PHA';
		}
	};

	return this;
};

// eslint-disable-next-line no-unused-vars
AppHeader.factory('Header', $rootScope => HeaderConstructor);
