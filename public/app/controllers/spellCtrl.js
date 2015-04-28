angular.module('spellCtrl', [])
    .controller('spellController', function($rootScope, Spells) {
        var vm = this;

        vm.items = [];
        vm.loadItems = function() {
            vm.items = Spells.spells.slice(0,14);
            return vm.items;
        };

        vm.levelIncludes = [];
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
                vm.classIncludes.splice(i, 1)
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

        vm.setSpell = function(spell) {
            vm.modalSpell = spell;
        };
    });
