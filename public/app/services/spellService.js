angular.module('spellService', [])
    .factory('Spells', ['$http', function($http) {
        var o = {
            spells: []
        };
        $http.get('/basic/spells').success(function(data) {
            angular.copy(data, o.spells);
        });
        return o;
    }]);
