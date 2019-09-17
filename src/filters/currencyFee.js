
import AppFilters from './filters.module';

AppFilters.filter('currencyFee', currencyFilter => (amount, currency, decimalPlacesCrypto, decimalPlacesFiat) => {
	if (currency.symbol === 'PHA' && typeof decimalPlacesCrypto === 'undefined') {
		decimalPlacesCrypto = 1;
	}

	return currencyFilter(amount, currency, decimalPlacesCrypto, decimalPlacesFiat);
});
