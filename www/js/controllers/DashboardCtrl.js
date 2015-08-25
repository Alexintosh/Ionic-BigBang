(function(){
	'use strict';

	angular
	.module('app')
	.controller('DashboardCtrl', DashboardCtrl);

	function DashboardCtrl($scope, $rootScope, $u) {
		var vm = this;
				
		$scope.$on('$ionicView.afterEnter', function(){
			init();
		});

		function init(){
			//Do something	
		}
	}
})();
