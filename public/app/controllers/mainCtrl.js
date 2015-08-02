angular.module('mainCtrl', ['authService', 'registerService'])
    .controller('mainController', function($rootScope, $location, $window, Auth, Register) {
    	var vm = this;

    	vm.loggedIn = Auth.isLoggedIn();

    	$rootScope.$on('$routeChangeStart', function() {
    		vm.loggedIn = Auth.isLoggedIn();
    		Auth.getUser().then(function(data) {
    			vm.user = data.data;
    		});
    	});

    	vm.doLogin = function() {
            vm.login(vm.loginData.username, vm.loginData.password);
    	};

        vm.login = function(username, password) {
            vm.loginProcessing = true;
            vm.loginError = '';
            Auth.login(username, password)
            .success(function(data) {
                vm.loginProcessing = false;
                if (data.success) {
                    $location.path('/account');
                } else {
                    vm.loginError = data.message;
                }
            });
        }

        vm.doRegister = function() {
            vm.registerProcessing = true;
            vm.registerError = '';

            console.log("registering...");
            if (vm.regData.password == vm.regData.passCheck) {
                Register.register(vm.regData.username, vm.regData.email, vm.regData.password)
                .success(function(data) {
                    vm.registerProcessing = false;
                    if (data.success) {
                        vm.login(vm.regData.username, vm.regData.password);
                    } else {
                        vm.registerError = data.message;
                    }
                });
            } else {
                vm.registerError = 'Passwords do not match.';
                vm.registerProcessing = false;
            }
        };

    	vm.doLogout = function() {
    		Auth.logout();
    		vm.user = null;
    		$location.path('/');
    	};
    })
    // verified email controller
    .controller('verifiedController', function($routeParams, Auth) {
        var vm = this;
        Auth.logout();
    });
