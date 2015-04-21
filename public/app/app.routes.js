angular.module('app.routes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
        // home page
            .when('/', {
                templateUrl: 'app/views/pages/home.html'
            })
            // spellbook page
            .when('/spellbook', {
                templateUrl: 'app/views/pages/spellbook.html',
                controller: 'spellController',
                controllerAs: 'spellCtrl'
            })
            // .when('/confirm', {
            // 	templateURL: 'app/views/pages/confirm_email.html'
            // })
            .otherwise({
                templateUrl: 'app/views/pages/confirm_email.html'
            });
        $locationProvider.html5Mode(true);
    });
