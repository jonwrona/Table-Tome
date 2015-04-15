angular.module('subscriberService', [])
    .factory('Subscriber', ['$http', function($http) {
        var subFactory = {};

        subFactory.create = function(email) {
            $http.post('/api/mail', {
                    email: email
                });
        };

        return subFactory;
    }]);
