angular.module('spellService', [])
    .factory('Spells', ['$http', function($http) {
        var o = {
            spells: []
        };
        $http.get('/api/spells/basic').success(function(data) {
            angular.copy(data, o.spells);
        });
        return o;
    }]);
