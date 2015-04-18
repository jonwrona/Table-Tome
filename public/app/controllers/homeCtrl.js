angular.module('homeCtrl', ['subscriberService'])
    .controller('SubscriberController', function($scope, Subscriber) {
        $scope.submit = function() {
            Subscriber.create($scope.mail);
        };
    });
