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
            } else {
                vm.classIncludes.push(class_);
            }
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

        // test list
        vm.spellLists = [

            {
                _id: 'asdfadsfasdf1',
                userid: 'jonwrona',
                name: 'list1',
                spells: [ '55145b1ddd87101a304cd012' ]
            },
            {
                _id: 'asdfasdfasdf2',
                userid: 'jonwrona',
                name: 'list2',
                spells: [ '55145b1ddd87101a304cd012' ]
            }

        ];
        vm.listIncludes = [];
        vm.includeList = function(list) {
            var i = $.inArray(list, vm.listIncludes);
            if (i > -1) {
                vm.listIncludes.splice(i, 1);
            } else {
                vm.listIncludes.push(list);
            }
        };
        vm.listFilter = function(spell) {
            if (vm.listIncludes.length > 0) {
                for (i = 0; i < vm.listIncludes.length; i++) {
                    if ($.inArray(spell._id, vm.listIncludes[i].spells) >= 0) {
                        return spell;
                    }
                }
                return;
            }
            return spell;
        };

        vm.setSpell = function(spell) {
            vm.modalSpell = spell;
        };
    });
