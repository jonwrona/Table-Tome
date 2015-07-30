angular.module('remindCtrl', ['userService'])
    .controller('remindController', function(Remind) {
        var vm = this;

        vm.usernameErr = '';
        vm.usernameSuccess = '';

        vm.username = function() {
            Remind.username(vm.username.email)
                .success(function(data) {
                    if (data.success) {
                        vm.usernameSuccess = data.message;
                        vm.usernameErr = '';
                    } else {
                        vm.usernameSuccess = '';
                        vm.usernameErr = data.message;
                    }
                });
        };

        vm.password = function() {
        	console.log(vm.password.email + ' ' + vm.password.username);
            Remind.password(vm.password.email, vm.password.username)
                .success(function(data) {
                    if (data.success) {
                        vm.passwordSuccess = data.message;
                        vm.passwordErr = '';
                    } else {
                    	vm.passwordSuccess = '';
                    	vm.passwordErr = data.message;
                    }
                })
        }

    });
