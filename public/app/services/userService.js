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
    })
    .factory('Remind', function($http) {
        var remindFactory = {};

        remindFactory.username = function(email) {
            return $http.post('/user/getusername', {
                email: email
            }).success(function(data) {
                console.log(data);
                return data;
            });
        };

        remindFactory.password = function(email, username) {
            return $http.post('/user/resetpassword', {
                email: email,
                username: username
            }).success(function(data) {
                console.log(data);
                return data;
            });
        };

        return remindFactory;
    });
