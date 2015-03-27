angular.module('app', ['ngAnimate', 'app.routes', 'authService', 'mainCtrl'])
.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
});