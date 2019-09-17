
import AppCurrency from './currency-selector.module';
import template from './currency-selector.html';

AppCurrency.directive('currencySelector', ($rootScope, $timeout) => {
	const CurrencySelectorLink = () => {
		$timeout(() => {
			$rootScope.currency.symbol = (localStorage && localStorage.getItem('plaak_explorer-currency')) || 'PHA';
		});
	};

	const CurrencySelectorCtrl = function () {
		this.setCurrency = (currency) => {
			$rootScope.currency.symbol = currency;
			$rootScope.isCollapsed = true;

			if (localStorage) {
				localStorage.setItem('plaak_explorer-currency', currency);
			}
		};
	};

	return {
		restrict: 'E',
		replace: true,
		controller: CurrencySelectorCtrl,
		controllerAs: 'cs',
		link: CurrencySelectorLink,
		template,
	};
});
