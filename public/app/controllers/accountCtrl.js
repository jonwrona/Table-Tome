angular.module('accountCtrl', ['authService'])
    .controller('accountController', function(Auth) {
        var vm = this;

        vm.active = 'account';

        console.log(Auth.isLoggedIn());
        Auth.getUser().then(function(data) {
            vm.user = data.data;
            console.log(vm.user);
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

    });
