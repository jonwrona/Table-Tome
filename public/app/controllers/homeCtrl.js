angular.module('homeCtrl', ['subscriberService'])
    .controller('SubscriberController', function($scope, Subscriber) {
    	$scope.submitted = false;
    	$scope.err1 = false;
        $scope.submit = function() {
            var thing = Subscriber.create($scope.mail);
            // Is it waiting?
            console.log("thing: "+thing);
            $scope.submitted = true;
            $scope.err1 = !thing;
        };
        $scope.reset = function() {
         	$scope.submitted = false;
        	$scope.err1 = false;
            document.getElementById('subForm').reset();
        };
    });
