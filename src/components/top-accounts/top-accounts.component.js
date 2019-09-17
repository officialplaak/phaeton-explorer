
import AppTopAccounts from './top-accounts.module';
import template from './top-accounts.html';

const Highcharts = require('highcharts');


const TopAccountsConstructor = function (lessMore, $http) {
	this.chartData = [];
	this.topAccounts = lessMore({
		url: '/api/getTopAccounts',
		key: 'accounts',
	});
	const rootpage = this;
	this.topAccounts.loadData();


	rootpage.getTOPAddress = () => {
		const resData = [];
		$http.get('/api/getTopAccounts?sort=balance:desc&offset=0&limit=100').then((resp) => {
		// alert(JSON.stringify(resp));
			if (resp.data.success) {
				for (let i = 0; i < resp.data.accounts.length; i++) {
					resData.push({ name: `${resp.data.accounts[i].address}`, y: Number(resp.data.accounts[i].balance) });
				}
				const finaldata = JSON.parse(JSON.stringify(resData));
				this.makechart(finaldata);
			}
		});
	/*

		vm.makechart();
		*/
	};

	rootpage.makechart = (resData) => {
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

	rootpage.getTOPAddress();
};


AppTopAccounts.component('topAccounts', {
	template,
	controller: TopAccountsConstructor,
	controllerAs: 'vm',
});
