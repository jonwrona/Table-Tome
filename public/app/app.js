angular.module('tabletome', [
        'ngAnimate',
        'app.routes',
        'mainCtrl',
        'accountCtrl',
        'spellCtrl',
        'remindCtrl',
        'authService',
        'registerService',
        'userService',
        'spellService'
    ])
    // application configuration to integrate token into requests
    .config(function($httpProvider) {
        // attach our auth interceptor to the http requests
        $httpProvider.interceptors.push('AuthInterceptor');
    });
