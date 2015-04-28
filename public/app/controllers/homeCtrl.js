angular.module('homeCtrl', ['subscriberService'])
    .controller('SubscriberController', function($scope, Subscriber) {
    	$scope.submitted = false;
    	$scope.err = false;
        $scope.submit = function() {
            $scope.err = !Subscriber.create($scope.mail);
            $scope.submitted = true;
            console.log($scope.err);
        };
        $scope.reset = function() {
         	$scope.submitted = false;
        	$scope.err = false;
            document.getElementById('subForm').reset();
        };
    });
