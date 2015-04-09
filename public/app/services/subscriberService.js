angular.module('subscriberService', [])
.factory('Subscriber', function($http) {
	var subFactory = {};

	recaptchaSecret = '6Ld4_QQTAAAAANxQGjzIrjp9YYMxwzevDM8FZ5DL';

	subFactory.create = function(userData) {
		$http.post('https://www.google.com/recaptcha/api/siteverify', recaptchaSecret, userData.captcha)
		.success(function() {
			console.log('success');
		})
		.error(function() {
			console.log('failure');
		});
	};

	subFactory.delete = function(id) {
		return $http.delete('/subscribers/' + id);
	};

	return subFactory;
});