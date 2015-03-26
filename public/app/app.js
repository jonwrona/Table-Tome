angular.module('app', [
	'ngAnimate',
	'app.routes',

	'authService',
	'userService',

	'mainCtrl',
	'spellsCtrl',
])
.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
});