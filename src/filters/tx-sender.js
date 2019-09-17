
import AppFilters from './filters.module';

AppFilters.filter('txSender', () => tx =>
	tx.senderUsername || (tx.knownSender && tx.knownSender.owner) ||
	tx.senderId);
