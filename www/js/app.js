angular.module('app', [
	'ionic',
	'ngCordova',
	'uiGmapgoogle-maps',
])
/*
* Setup here some information of your app
*/
.constant('mapsAppKey', '')
.constant('contactMail', '')
.constant('ApiEndpoint', {
  /*
  * If you need to use a proxy for CORS issue
  * write your local ip HERE
  */
  url: 'http://192.168.1.106:8100/api'
})

.run(function(
		$ionicPlatform, 
		$cordovaNetwork,
		$localstorage,
		$u,
		$rootScope
	) {
	$ionicPlatform.ready(function() {

		$localstorage.set('online', false);
		if(window.Connection) {
			var isOn = $cordovaNetwork.isOnline();
			$localstorage.set('online', isOn);
			$u.isOnline();
		}

		document.addEventListener("online", function() {
			$localstorage.set('online', true);
			$u.stateOnlineChanged();
		}, false);

		document.addEventListener("offline", function() {
			$localstorage.set('online', false);
			$u.stateOnlineChanged();
		}, false);



		//Enable native scrolling on Android
		if(!ionic.Platform.isIOS()) $ionicConfigProvider.scrolling.jsScrolling(false);

		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
	});
})

.config(function($stateProvider, $urlRouterProvider, $cordovaAppRateProvider, $cordovaInAppBrowserProvider, uiGmapGoogleMapApiProvider, mapsAppKey) {

	/*
	* Config your app here
	*/
	document.addEventListener("deviceready", function () {

		/*
		* Maps Application
		* Insert app Key
		*/
		uiGmapGoogleMapApiProvider.configure({
			key: mapsAppKey,
			v: '3.17',
			libraries: 'geometry'
		});

		/*
		* Rate my app plugin
		* Insert your app url
		var prefs = {
			language: 'en',
			appName: 'Torcia PRO',
			iosURL: '<my_app_id>',
			androidURL: 'https://play.google.com/store/apps/details?id=com.alexintosh.flashlight',
			windowsURL: 'ms-windows-store:Review?name=<...>'
		};

		$cordovaAppRateProvider.setPreferences(prefs);

		/*
		* In App browser config
		* check Docs: http://ngcordova.com/docs/plugins/inAppBrowser/
		var defaultOptions = {
			location: 'yes',
			clearcache: 'yes',
			toolbar: 'yes'
		};
		$cordovaInAppBrowserProvider.setDefaultOptions(defaultOptions);
		*/

	}, false);

/*
* App Routing
*/
$stateProvider

	.state('app', {
		url: "/app",
		abstract: true,
		templateUrl: "templates/menu.html",
		controller: 'AppCtrl'
	})
	.state('app.dashboard', {
		url: "/dashboard",
		cache: false,
		views: {
			'menuContent': {
				templateUrl: "templates/dashboard.html",
				controller: "DashboardCtrl as vm"
			}
		}
	})
	.state('app.settings', {
		url: "/settings",
		views: {
			'menuContent': {
				templateUrl: "templates/settings.html",
				controller: 'SettingsCtrl as vm'
			}
		}
	});

$urlRouterProvider.otherwise('/app/dashboard');
});
