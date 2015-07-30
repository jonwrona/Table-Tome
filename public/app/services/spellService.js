angular.module('spellService', [])
    .factory('Spells', ['$http', function($http) {
        var o = {
            spells: []
        };
        $http.get('/spell/spells').success(function(data) {
            angular.copy(data, o.spells);
        });
        return o;
    }]);
