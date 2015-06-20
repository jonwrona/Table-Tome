angular.module('app.routes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            // home page
            .when('/', {
                templateUrl: 'app/views/pages/home.html'
            // login page
            }).when('/login', {
                templateUrl: 'app/views/pages/login.html'
            })
            // spellbook page
            .when('/spellbook', {
                templateUrl: 'app/views/pages/spellbook.html',
                controller: 'spellController',
                controllerAs: 'spellCtrl'
            })
            // mailing list success and failure pages
            .when('/mail/success', {
                templateUrl: 'app/views/pages/mail/success.html'
            })
            .when('/mail/failure', {
                templateUrl: 'app/views/pages/mail/failure.html'
            })
            // otherwise page doesn't exist
            .otherwise({
                templateUrl: 'app/views/pages/404.html'
            });
        $locationProvider.html5Mode(true);
    });
