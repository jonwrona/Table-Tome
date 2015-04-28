angular.module('homeCtrl', ['subscriberService'])
    .controller('SubscriberController', function($scope, Subscriber) {
    	$scope.submitted = false;
    	$scope.err = false;
        $scope.submit = function() {
            var thing = !Subscriber.create($scope.mail);
            console.log(thing);
            $scope.submitted = true;
            $scope.err = thing;
        };
        $scope.reset = function() {
         	$scope.submitted = false;
        	$scope.err = false;
            document.getElementById('subForm').reset();
        };
    });
