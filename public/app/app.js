angular.module('tabletome', ['ngAnimate', 'app.routes', 'spellService', 'spellCtrl'])
.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
});