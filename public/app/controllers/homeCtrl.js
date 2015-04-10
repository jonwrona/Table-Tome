angular.module('homeCtrl', ['subscriberService'])
    .controller('SubscriberController', function($scope, Subscriber) {
        $scope.message = "";
        $scope.processing = false;

        $scope.submit = function() {
            $scope.processing = true;
            $scope.message = "";
            var params = {
                name: $scope.name,
                email: $scope.email,
            };
            Subscriber.create(params)
                .success(function(data) {
                    if (data.success) {
                        $('#subModal').modal('hide');
                        document.getElementById('subForm').reset();
                        $scope.processing = false;
                    } else {
                        $scope.message = data.message;
                        $scope.processing = false;
                    }
                });
        };

    });
