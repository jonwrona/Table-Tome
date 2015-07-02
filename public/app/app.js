angular.module('tabletome', [
        'ngAnimate',
        'app.routes',
        'mainCtrl',
        'spellCtrl',
        'authService',
        'spellService'
    ])
    // application configuration to integrate token into requests
    .config(function($httpProvider) {
        // attach our auth interceptor to the http requests
        $httpProvider.interceptors.push('AuthInterceptor');
    });
