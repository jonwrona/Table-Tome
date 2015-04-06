angular.module('tabletome', ['ngAnimate', 'app.routes', 'authService', 'spellService', 'mainCtrl'])
.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
});