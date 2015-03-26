angular.module('mainCtrl', [])
.controller('mainController', function($rootScope, $location, Auth) {
	var vm = this;

	// get info if logged in
	vm.loggedIn = Auth.isLoggedIn();

	// check to see if logged in on every request
	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();
		Auth.getUser()
		.success(function(data) {
			vm.user = data;
		});
	});

	vm.doLogin = function() {
		Auth.login(vm.loginData.username, vm.loginData.password)
		.success(function(data) {
			// if a user successfully logs in?
		});
	};

	vm.doLogout = function() {
		Auth.logout();
		$location.ath('/login');
	};
});