angular.module('tabletome', ['ngAnimate', 'app.routes', 'authService', 'spellService', 'mainCtrl', 'spellCtrl'])
.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
});