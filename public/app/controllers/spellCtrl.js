angular.module('spellCtrl', ['infinite-scroll'])
    .controller('spellController', function($rootScope, $timeout, Spells) {
        var vm = this;

        vm.items = Spells.spells;
        vm.loadItems = function() {
            vm.items = Spells.spells.slice(0,14);
            return vm.items;
        };

        vm.predicate = 'name';
        vm.reverse = false;

        vm.levelIncludes = [];
        vm.clearLevels = function() {
            for (i = 0; i < vm.levelIncludes.length; i++) {
                var id = "";
                if (vm.levelIncludes[i] == 0) id = "#cantrip";
                else id = "#lvl" + vm.levelIncludes[i];
                angular.element(document.querySelector(id)).attr('checked', false);
            }
            vm.levelIncludes = [];
            console.log(angular.element(document.querySelector('.dropdown-menu')));
        }
        vm.includeLevel = function(level) {
            var i = $.inArray(level, vm.levelIncludes);
            if (i > -1)
                vm.levelIncludes.splice(i, 1);
            else
                vm.levelIncludes.push(level);
        };
        vm.levelFilter = function(spell) {
            if (vm.levelIncludes.length > 0) {
                if ($.inArray(spell.level, vm.levelIncludes) < 0)
                    return;
            }
            return spell;
        };

        vm.classIncludes = [];
        vm.includeClass = function(class_) {
            var i = $.inArray(class_, vm.classIncludes);
            if (i > -1)
                vm.classIncludes.splice(i, 1);
            else
                vm.classIncludes.push(class_);
        };
        vm.classFilter = function(spell) {
            if (vm.classIncludes.length > 0) {
                if (spell.classes.length === 0)
                    return spell;
                for (i = 0; i < spell.classes.length; i++) {
                    if ($.inArray(spell.classes[i], vm.classIncludes) >= 0) {
                        return spell;
                    }
                }
                return;
            }
            return spell;
        };

        vm.schoolIncludes = [];
        vm.includeSchool = function(school) {
            var i = $.inArray(school, vm.schoolIncludes);
            if (i > -1) {
                vm.schoolIncludes.splice(i, 1);
            } else {
                vm.schoolIncludes.push(school);
            }
        };
        vm.schoolFilter = function(spell) {
            if (vm.schoolIncludes.length > 0) {
                if ($.inArray(spell.school, vm.schoolIncludes) >= 0) {
                    return spell;
                }
                return;
            }
            return spell;
        };

        vm.sourceIncludes = [];
        vm.includeSource = function(source) {
            var i = $.inArray(source, vm.sourceIncludes);
            if (i > -1) {
                vm.sourceIncludes.splice(i, 1);
            } else {
                vm.sourceIncludes.push(source);
            }
        };
        vm.sourceFilter = function(spell) {
            if (vm.sourceIncludes.length > 0) {
                if (spell.books.length === 0)
                    return spell;
                for (i = 0; i < spell.books.length; i++) {
                    if ($.inArray(spell.books[i].book, vm.sourceIncludes) >= 0) {
                        return spell;
                    }
                }
                return;
            }
            return spell;
        }

        vm.setSpell = function(spell) {
            vm.modalSpell = spell;
        };
    })
    .controller('scrollController', function($scope, Spells) {
        $scope.moreSpells = function() {
            //$scope.items = spellCtrl.loadItems();
            var moreSpells = Spells.spells.slice($scope.items.length, $scope.items.length+10);
            $scope.items.push(moreSpells);
        };
    });
