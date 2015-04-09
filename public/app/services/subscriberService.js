angular.module('subscriberService', [])
.factory('Subscriber', ['$http', function($http) {
	var subFactory = {};

	subFactory.create = function(subData) {
		console.log(subData);
		return $http.post('/api/mail', subData);
	};

	subFactory.delete = function(id) {
		return $http.delete('/api/mail/' + id);
	};

	return subFactory;
}]);