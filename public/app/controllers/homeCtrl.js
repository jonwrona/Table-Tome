angular.module('homeCtrl', ['subscriberService'])
    .controller('SubscriberController', function($scope, Subscriber) {
    	$scope.submitted = false;
    	$scope.err = false;
        $scope.submit = function() {
        	console.log($scope.mail);
            var success = Subscriber.create($scope.mail);
            $scope.submitted = true;
            $scope.err = !success;
        };
        $scope.reset = function() {
         	$scope.submitted = false;
        	$scope.err = false;
        };
    });
