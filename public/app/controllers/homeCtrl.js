angular.module('homeCtrl', ['subscriberService'])
    .controller('SubscriberController', function($scope, Subscriber) {
        $scope.message = "";
        $scope.processing = false;

        function sleep(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds) {
                    break;
                }
            }
        }

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
