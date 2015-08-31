angular.module('spellService', [])
    .factory('Spells', ['$http', function($http) {
        var o = {
            spells: []
        };
        $http.get('/spell/spells').success(function(data) {
            angular.copy(data, o.spells);
        });
        return o;
    }])
    .factory('SpellLists', ['$http', function($http) {
    	var listFactory = {};

    	listFactory.refresh = function() {
    		return $http.get('/user/lists').lists;
    	};

    	return listFactory;
    }]);
