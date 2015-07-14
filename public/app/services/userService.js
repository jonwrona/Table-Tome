angular.module('userService', [])
    .factory('User', function($http) {
        var userFactory = {};

        userFactory.reauth = function(password) {
            return $http.post('/user/reauth', {
                password: password
            }).success(function(data) {
                return data;
            });
        };

        userFactory.update = function(userData) {
            return $http.put('/user/update', userData)
                .success(function(data) {
                    return data;
                });
        };

        return userFactory;
    });
