
import AppServices from './services.module';


AppServices.factory('isFiat',
	() => currency => (currency.symbol !== 'LSK' && currency.symbol !== 'BTC'));
