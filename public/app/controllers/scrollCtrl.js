var myApp = angular.module('scrollCtrl', ['infinite-scroll']);
myApp.controller('scrollController', function($scope, Spells) {
		$scope.moreSpells = function() {
			$scope.items = spellCtrl.loadItems();
			//var moreSpells = Spells.spells.slice($scope.items.length, $scope.items.length+10);
			//$scope.items = moreSpells;
		};
	});