angular.module('subscriberService', [])
    .factory('Subscriber', function($http) {
        var subscribe = function(email_) {
            return $http.post('/api/mail', {
                email: email_
            }).then(function(result) {
                return result.data.success;
            });
        };
        return { subscribe: subscribe };
    });
