angular.module('app.routes', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
	$routeProvider
	// home page
	.when('/', {
		templateUrl: 'app/views/pages/home.html'
	})
	.when('/login', {
		templateUrl: 'app/views/pages/login.html',
		controller: 'mainController',
		controllerAs: 'login'
	});

	$locationProvider.html5Mode(true);
});