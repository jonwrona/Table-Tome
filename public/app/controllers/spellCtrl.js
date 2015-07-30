angular.module('spellCtrl', [])
    .controller('spellController', function($rootScope, Spells) {
        var vm = this;

        vm.items = Spells.spells;

        vm.predicate = 'name';
        vm.reverse = false;

        vm.levelIncludes = [];
        vm.includeLevel = function(level) {
            var i = $.inArray(level, vm.levelIncludes);
            if (i > -1) {
                vm.levelIncludes.splice(i, 1);
                if (vm.levelIncludes.length == 0)
                    $('#clearlevels').attr('checked', 'checked');
            } else {
                vm.levelIncludes.push(level);
                $('#clearlevels').removeAttr('checked');
            }
        };
        vm.clearLevelFilter = function() {
            vm.levelIncludes = [];
            $('#clearlevels').attr('checked', 'checked');
            $('.level-filter').removeAttr('checked');
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
            if (i > -1) {
                vm.classIncludes.splice(i, 1);
            }
            else {
                vm.classIncludes.push(class_);
            }
        };
        vm.clearClassFilter = function() {
            vm.classIncludes = [];
            $('#clearclasses').prop('checked', true);
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
        vm.clearSchoolFilter = function() {
            vm.schoolIncludes = [];
            $('#clearschools').prop('checked', true);
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
        vm.clearSourceFilter = function() {
            vm.sourceIncludes = [];
            $('#clearsources').prop('checked', true);
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
    });
