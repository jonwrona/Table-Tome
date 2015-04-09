angular.module('homeCtrl', ['subscriberService'])
    .controller('SubscriberController', function($scope, Subscriber) {
        $scope.message = "";

        $scope.submit = function() {
            $scope.message = "";
            var params = {
                name: $scope.name,
                email: $scope.email,
                recaptcha: document.getElementById("g-recaptcha-response").value
            };
            Subscriber.create(params)
                .success(function(data) {
                    if (data.success) {
                        // do stuff
                    } else {
                        $scope.message = data.message;
                    }
                });
            grecaptcha.reset();
        };

    });
