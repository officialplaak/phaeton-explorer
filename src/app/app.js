
import angular from 'angular';
import 'angular-ui-router';
import 'angular-resource';
import 'angular-animate';
import 'angular-ui-bootstrap';
import 'angular-gettext';
import 'angular-advanced-searchbox';


// import 'babel-polyfill';

// styles
import 'amstock3/amcharts/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'angular-advanced-searchbox/dist/angular-advanced-searchbox.min.css';
import '../assets/styles/common.css';
import '../assets/styles/flags.css';
import '../assets/styles/tableMobile.css';
import '../assets/styles/style.css';
// import '../assets/styles/w3.css';


// submodules
import '../components/blocks';
import '../components/address';
import '../components/transactions';
import '../components/delegate';
import '../components/delegate-monitor';
import '../components/top-accounts';
import '../components/search';
import '../components/header';
import '../components/footer';
import '../components/currency-selector';
import '../components/activity-graph';
import '../components/home';
import '../components/bread-crumb';
import '../components/market-watcher';
import '../components/network-monitor';

import '../filters';
import '../services';
import '../directives';
import './app-tools.module';
import '../shared';

const App = angular.module('plaak_explorer', [
	'ngAnimate',
	'ngResource',
	'ui.router',
	'ui.bootstrap',
	'gettext',
	'angular-advanced-searchbox',

	'plaak_explorer.breadCrumb',
	'plaak_explorer.filters',
	'plaak_explorer.services',
	'plaak_explorer.header',
	'plaak_explorer.footer',
	'plaak_explorer.blocks',
	'plaak_explorer.transactions',
	'plaak_explorer.address',
	'plaak_explorer.delegate',
	'plaak_explorer.topAccounts',
	'plaak_explorer.search',
	'plaak_explorer.tools',
	'plaak_explorer.currency',
	'plaak_explorer.activityGraph',
	'plaak_explorer.delegateMonitor',
	'plaak_explorer.home',
	'plaak_explorer.networkMonitor',
	'plaak_explorer.marketWatcher',
]);

export default App;
