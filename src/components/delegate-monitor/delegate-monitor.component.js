
import AppDelegateMonitor from './delegate-monitor.module';
import template from './delegate-monitor.html';
import './delegate-monitor.css';

const DelegateMonitorConstructor = function (delegateMonitor, orderBy, $rootScope, $http) {
	const vm = this;
	vm.tab = 1;
	vm.active1 = '';
	vm.active2 = 'tabdeactive';
	vm.active3 = 'tabdeactive';
	vm.active4 = 'tabdeactive';

	vm.block1 = '';
	vm.block2 = 'tabhide';
	vm.block3 = 'tabhide';
	vm.block4 = 'tabhide';


	delegateMonitor(vm);

	vm.getStandby = (n) => {
		let offset = 0;

		if (n) {
			offset = (n - 1) * 20;
		}

		vm.standbyDelegates = null;

		$http.get(`/api/delegates/getStandby?n=${offset}`).then((resp) => {
			if (resp.data.success) {
				vm.standbyDelegates = resp.data.delegates;
			}
			if (resp.data.pagination) {
				vm.pagination = resp.data.pagination;
			}
		});
	};

	vm.filterTxs = (direction) => {
		vm.tab = direction;
		if (direction === 1) {
			vm.active1 = '';
			vm.active2 = 'tabdeactive';
			vm.active3 = 'tabdeactive';
			vm.active4 = 'tabdeactive';
			vm.block1 = '';
			vm.block2 = 'tabhide';
			vm.block3 = 'tabhide';
			vm.block4 = 'tabhide';
		} else if (direction === 2) {
			vm.active2 = '';
			vm.active1 = 'tabdeactive';
			vm.active3 = 'tabdeactive';
			vm.active4 = 'tabdeactive';
			vm.block2 = '';
			vm.block1 = 'tabhide';
			vm.block3 = 'tabhide';
			vm.block4 = 'tabhide';
		} else if (direction === 3) {
			vm.active3 = '';
			vm.active1 = 'tabdeactive';
			vm.active2 = 'tabdeactive';
			vm.active4 = 'tabdeactive';
			vm.block3 = '';
			vm.block1 = 'tabhide';
			vm.block2 = 'tabhide';
			vm.block4 = 'tabhide';
		} else if (direction === 4) {
			vm.active4 = '';
			vm.active1 = 'tabdeactive';
			vm.active2 = 'tabdeactive';
			vm.active3 = 'tabdeactive';
			vm.block4 = '';
			vm.block1 = 'tabhide';
			vm.block2 = 'tabhide';
			vm.block3 = 'tabhide';
		}
	};

	vm.getStandby(1);

	vm.tables = {
		active: orderBy('rate'),
		standby: orderBy('rate'),
	};

	vm.decimalPlaceCrypto = 0;
	vm.decimalPlaceFiat = 0;
};

AppDelegateMonitor.component('delegateMonitor', {
	template,
	controller: DelegateMonitorConstructor,
	controllerAs: 'vm',
});
