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
            // otherwise page doesn't exist
            .otherwise({
                templateUrl: 'app/views/pages/404.html'
            });
        $locationProvider.html5Mode(true);
    });
