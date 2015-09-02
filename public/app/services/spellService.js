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
    		return $http.get('/user/lists');
    	};

        listFactory.create = function(name) {
            return $http.post('/user/lists', {
                name: name
            });
        };

        listFactory.add = function(listid, spellid) {
            return $http.put('/user/lists', {
                listid: listid,
                spellid: spellid
            });
        };

        listFactory.remove = function(listid, spellid) {
            return $http.post('/user/lists/remove', {
                listid: listid,
                spellid: spellid
            });
        };

        listFactory.del = function(listid) {
            return $http.post('/user/lists/delete', {
                listid: listid
            });
        };

    	return listFactory;
    }]);
