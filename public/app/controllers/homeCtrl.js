angular.module('homeCtrl', ['subscriberService'])
    .controller('SubscriberController', function($scope, Subscriber) {
        $scope.message = "";

        $scope.submit = function() {
            $scope.message = "";
            var params = {
                name: $scope.name,
                email: $scope.email,
            };
            Subscriber.create(params)
                .success(function(data) {
                    if (data.success) {
                        $('#subModal').modal('hide');
                        document.getElementById("subForm").reset();
                    } else {
                        $scope.message = data.message;
                    }
                });
        };

    });
