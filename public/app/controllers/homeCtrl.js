angular.module('homeCtrl', ['subscriberService'])
    .controller('SubscriberController', function($scope, Subscriber) {
        $scope.submitted = false;
        $scope.err = false;
        $scope.message = "";
        $scope.submit = function() {
            var submitPromise = Subscriber.subscribe($scope.mail);
            submitPromise.then(function(result) {
                $scope.submitted = true;
                $scope.err = !result.success;
                if ($scope.err) $scope.message = result.message;
            });
        };
        $scope.reset = function() {
            $scope.submitted = false;
            $scope.err = false;
            $scope.message = "";
            document.getElementById('subForm').reset();
        };
    });
