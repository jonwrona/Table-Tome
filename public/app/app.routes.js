angular.module('app.routes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
        // home page
            .when('/', {
                templateUrl: 'app/views/pages/home.html'
            })
            // login page
            .when('/login', {
                templateUrl: 'app/views/pages/login.html'
            })
            // forgot page
            .when('/remindme', {
                templateUrl: 'app/views/pages/remindme.html',
                controller: 'remindController',
                controllerAs: 'remindCtrl'
            })
            // account page
            .when('/account', {
                templateUrl: 'app/views/pages/account.html',
                controller: 'accountController',
                controllerAs: 'accCtrl'
            })
            // spellbook page
            .when('/spellbook', {
                templateUrl: 'app/views/pages/spellbook.html',
                controller: 'spellController',
                controllerAs: 'spellCtrl'
            })
            // verified email page
            .when('/verified/:id', {
                templateUrl: 'app/views/pages/verified.html',
            })
            // otherwise page doesn't exist
            .otherwise({
                templateUrl: 'app/views/pages/404.html'
            });
        $locationProvider.html5Mode(true);
    });
