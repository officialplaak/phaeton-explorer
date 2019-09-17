
import AppFilters from './filters.module';

AppFilters.filter('currency', (numberFilter, plkxFilter, fiatFilter, isFiat) => (amount, currency, decimalPlacesCrypto, decimalPlacesFiat) => {
	if (Number(amount) === 0) return 0;

	let factor = 1;
	let equivalent = false;

	if (currency.tickers && currency.tickers.PHA && currency.tickers.PHA[currency.symbol]) {
		factor = currency.tickers.PHA[currency.symbol];
	} else if (currency.symbol !== 'PHA') {
		// Exchange rate not available for current symbol
		return 'N/A';
	}

	if (isFiat(currency)) {
		amount = fiatFilter(amount);
		if (typeof decimalPlacesFiat !== 'number') decimalPlacesFiat = 2;
		return `${numberFilter(amount * factor, decimalPlacesFiat)}`;
	}

	amount = plkxFilter(amount);

	if (typeof decimalPlacesCrypto === 'undefined') {
		amount = numberFilter((amount * factor), 8).replace(/\.?0+$/, '');
		return factor === 1 ? amount : `${amount}`;
	}

	if (currency.symbol === 'PHA') {
		equivalent = Number(amount) === Number(numberFilter((amount * factor), decimalPlacesCrypto));
	}

	amount = numberFilter((amount * factor), decimalPlacesCrypto);
	return (factor !== 1 || decimalPlacesCrypto !== 8) && !equivalent ? `${amount}` : amount;
});
