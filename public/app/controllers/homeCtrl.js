angular.module('homeCtrl', ['subscriberService'])
    .controller('SubscriberController', function($scope, Subscriber) {
        $scope.submitted = false;
        $scope.err = false;
        $scope.submit = function() {
            var submitPromise = Subscriber.subscribe($scope.mail);
            submitPromise.then(function(result) {
                $scope.submitted = true;
                $scope.err = !result;
            });
        };
        $scope.reset = function() {
            $scope.submitted = false;
            $scope.err = false;
            document.getElementById('subForm').reset();
        };
    });
