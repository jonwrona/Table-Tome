angular.module('spellService', [])
.factory('Spells', ['$http', function($http) {
	var o = { spells: [] };
	$http.get('/api/spells/basic').success(function(data) {
        console.log(data)
		angular.copy(data, o.spells);
	});
	return o;
}]);
