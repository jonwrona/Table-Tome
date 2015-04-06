angular.module('mainCtrl', [])
.controller('mainController', function($rootScope, $location, Auth) {
	var vm = this;

	// get info if logged in
	vm.loggedIn = Auth.isLoggedIn();

	// check to see if logged in on every request
	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();
		console.log('setting loggedIn to ' + vm.loggedIn);
		Auth.getUser().then(function(data) {
			vm.user = data.data;
		});
	});

	vm.doLogin = function() {
		vm.processing = true;
		vm.error = '';
		Auth.login(vm.loginData.username, vm.loginData.password)
		.success(function(data) {
			if (data.success) $location.path('/');
			else vm.error = data.message;
		});
		vm.processing = false;
	};

	vm.doLogout = function() {
		Auth.logout();
		vm.user = '';
		$location.path('/login');
	};
});