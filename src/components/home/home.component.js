
import AppHome from './home.module';
import template from './home.html';

const Highcharts = require('highcharts');

const HomeConstructor = function ($scope, $http, $interval) {
	const vm = this;
	vm.tab = 1;
	vm.active1 = '';
	vm.active2 = 'tabdeactive';
	vm.block1 = '';
	vm.block2 = 'tabhide';
	vm.chartData = [];
	vm.getLastBlocks = () => {
		$http.get('/api/getLastBlocks').then((resp) => {
			if (resp.data.success) {
				if (vm.blocks && vm.blocks.length > 0) {
					// $scope.totalln = vm.blocks.length;
					if (vm.blocks[0].id !== resp.data.blocks[0].id) {
						vm.blocks = resp.data.blocks;
					}
				} else {
					vm.blocks = resp.data.blocks;
				}
			}
			vm.getTOPAddress();
		});
	};

	vm.getTOPAddress = () => {
		const resData = [];
		$http.get('/api/getTopAccounts?sort=balance:desc&offset=0&limit=100').then((resp) => {
			// alert(JSON.stringify(resp));
			if (resp.data.success) {
				for (let i = 0; i < resp.data.accounts.length; i++) {
					resData.push({ name: `${resp.data.accounts[i].address}`, y: Number(resp.data.accounts[i].balance) });
				}
				const finaldata = JSON.parse(JSON.stringify(resData));
				vm.makechart(finaldata);
			}
		});
		/*

		vm.makechart();
		*/
	};

	vm.makechart = (resData) => {
		// alert(JSON.stringify(resData));

		Highcharts.chart('container1', {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie',
			},
			title: {
				text: 'Accounts',
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
						},
					},
				},
			},
			series: [{
				name: 'Balance',
				colorByPoint: true,
				data: resData,
			}],
		});
	};

	vm.filterTxs = (direction) => {
		vm.tab = direction;
		if (direction === 1) {
			vm.active1 = '';
			vm.active2 = 'tabdeactive';
			vm.block1 = '';
			vm.block2 = 'tabhide';
		} else {
			vm.active2 = '';
			vm.active1 = 'tabdeactive';
			vm.block2 = '';
			vm.block1 = 'tabhide';
		}
	};


	vm.blocksInterval = $interval(() => {
		vm.getLastBlocks();
	}, 30000);

	vm.getLastBlocks();

	vm.getLastTransactions = () => {
		$http.get('/api/getLastTransactions').then((resp) => {
			if (resp.data.success) {
				if (vm.txs && vm.txs.length > 0) {
					if (vm.txs[0] !== resp.data.transactions[0]) {
						vm.txs = resp.data.transactions;
					}
				} else {
					vm.txs = resp.data.transactions;
				}
			}
		});
	};

	vm.transactionsInterval = $interval(() => {
		vm.getLastTransactions();
	}, 30000);

	vm.getLastTransactions();
};

AppHome.component('home', {
	template,
	controller: HomeConstructor,
	controllerAs: 'vm',
});
