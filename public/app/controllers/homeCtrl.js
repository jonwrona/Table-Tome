angular.module('homeCtrl', ['subscriberService'])
    .controller('SubscriberController', function($scope, Subscriber) {
        $scope.submit = function() {
        	console.log("PLEASE JESUS");
            Subscriber.create($scope.mail);
        };
    });
