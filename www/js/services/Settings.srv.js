(function(){
	'use strict';

	angular
	.module('app')
	.factory('$settings', Settings);

	function Settings($localstorage, $rootScope) {
		var service = {
			fetch: fetch,
			save: save
		};

		return service;

		function fetch(){
			var settings = $localstorage.getObject('settings') ||
			{
				notification: {
					enabled: true 
				},
				geo: {
					position: true,
				},
				sliders: {
					range: 100
				}
			};
			return settings;
		}

		function save(obj){
			$localstorage.setObject('settings', obj);
			$rootScope.$broadcast('settingsChanged', true);
			return fetch();
		}
	}
})();
