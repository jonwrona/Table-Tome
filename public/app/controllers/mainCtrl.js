angular.module('mainCtrl', [])
.controller('mainController', function($rootScope, $location, Auth) {
	var vm = this;

	// get info if logged in
	vm.loggedIn = Auth.isLoggedIn();

	// check to see if logged in on every request
	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();
		Auth.getUser().then(function(data) {
			vm.user = data;
		});
	});

	vm.doLogin = function() {
		vm.processing = true;
		Auth.login(vm.loginData.username, vm.loginData.password)
		.success(function(data) {
			if (data.success) $location.path('/');
			else vm.error = data.message;
		});
		vm.processing = false;
	};

	vm.doLogout = function() {
		Auth.logout();
		$location.path('/login');
	};
});