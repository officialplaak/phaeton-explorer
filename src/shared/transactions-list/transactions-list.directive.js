

import AppTools from '../../app/app-tools.module';
import template from './transactions-list.html';

const transactionsList = AppTools.directive('transactionsList', orderBy => ({
	template,
	scope: {
		txs: '=',
		address: '=',
	},
	link: ($scope) => {
		$scope.filter = orderBy('timestamp', true);
	},
}));

export default transactionsList;
