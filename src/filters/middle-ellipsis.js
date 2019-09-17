
import AppFilters from './filters.module';

AppFilters.filter('middleEllipsis', () => (str, maxVisibleDigits) => {
	if (typeof str !== 'string') return '';
	if (str.length <= (maxVisibleDigits + 1)) return str;
	const visibleDigits = Math.floor(maxVisibleDigits / 2);
	return `${str.substr(0, visibleDigits)}\u2026${str.substr(str.length - visibleDigits)}`;
});
