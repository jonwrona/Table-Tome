angular.module('registerService', [])
    .factory('Register', function($http) {
    	var regFactory = {};

    	regFactory.register = function(username, email, password) {
    		return $http.post('/user/register', {
                username: username,
                password: password,
                email: email
            }).success(function(data) {
                return data;
            });
    	};

    	return regFactory;
    });
