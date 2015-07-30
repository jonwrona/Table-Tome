angular.module('accountCtrl', ['authService', 'userService'])
    .controller('accountController', function(Auth) {
        var vm = this;

        vm.active = 'account';

        Auth.getUser().then(function(data) {
            vm.user = data.data;
        });

        vm.isActive = function(tab) {
            if (vm.active == tab) {
                return "active";
            } else {
                return "";
            }
        };

        vm.setActive = function(tab) {
            vm.active = tab;
        };

    })
    .controller('accountSettingsController', function($window, User) {
        var vm = this;

        vm.processing = false;
        vm.err = '';
        vm.accData = {};

        vm.verifyErr = '';
        vm.verifySuccess = '';
        vm.verify = function(email) {
            console.log(email);
            User.verify(email)
                .success(function(data) {
                    console.log(data);
                    if (data.success) {
                        vm.verifySuccess = data.message;
                        vm.verifyErr = '';
                    } else {
                        vm.verifySuccess = '';
                        vm.verifyErr = data.message;
                    }
                });
        };

        vm.submit = function() {
            vm.processing = true;
            vm.err = '';

            if (vm.accData.password) {
                if (vm.accData.password != vm.passcheck) {
                    vm.err = 'New password verification does not match new password.'
                    vm.passcheck = '';
                    vm.password = '';
                    vm.processing = false;
                    return;
                }
            }

            User.reauth(vm.password)
                .success(function(data) {
                    if (!data.success) {
                        vm.processing = false;
                        vm.err = data.message;
                        vm.passcheck = '';
                        vm.password = '';
                        return;
                    }
                    User.update(vm.accData).success(function(data) {
                        vm.processing = false;
                        if (!data.success) {
                            vm.err = data.message;
                            vm.passcheck = '';
                            vm.password = '';
                        } else {
                            vm.accData = {};
                            vm.passcheck = '';
                            vm.password = '';
                            vm.err = '';
                            $window.location.reload();
                        }
                    });
                });
        };
    });
