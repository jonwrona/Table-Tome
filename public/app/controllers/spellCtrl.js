angular.module('spellCtrl', ['authService', 'spellService'])
    .filter('spellById', function() {
        return function(input, id) {
            for (var i = 0; i < input.length; i++) {
                if (input[i]._id == id) {
                    return input[i];
                }
            }
            return null;
        }
    }).controller('spellController', function($rootScope, $filter, Spells, SpellLists, Auth) {
        var vm = this;

        vm.items = Spells.spells;

        vm.loaded = false;
        vm.spellLists = [];
        if (Auth.isLoggedIn()) {
            SpellLists.refresh().success(function(data) {
                vm.spellLists = data.lists;
                vm.loaded = true;
            });
        }

        vm.disp = "+";

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

        vm.setSpell = function(spell) {
            vm.modalSpell = spell;
        };

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

        vm.createList = function() {
            if (vm.newSpellListName) {
                var name = vm.newSpellListName;
                vm.newSpellListName = "";
                SpellLists.create(name).success(function(data) {
                    if (data.success) {
                        SpellLists.refresh().success(function(data2) {
                            vm.spellLists = data2.lists;
                        });
                    } else {
                        alert("I'm sorry, you can only have five spell lists. If you wish to create a new list, you must delete one.");
                    }
                });
            }
        };

        vm.addSpell = function(listid, spellid) {
            SpellLists.add(listid, spellid).success(function(data) {
                if (data.success) {
                    SpellLists.refresh().success(function(data2) {
                        vm.spellLists = data2.lists;
                    });
                } else {
                    alert(data.message);
                }
            });
        };

        vm.removeSpell = function(listid, spellid) {
            SpellLists.remove(listid, spellid).success(function(data) {
                if (data.success) {
                    for (var i = 0; i < vm.listIncludes.length; i++) {
                        if (vm.listIncludes[i]._id == listid) {
                            var ind = vm.listIncludes[i].spells.indexOf(spellid);
                            if (ind >= 0) {
                                vm.listIncludes[i].spells.splice(ind, 1);
                            }
                        }
                    }
                    console.log(vm.listIncludes);
                    SpellLists.refresh().success(function(data2) {
                        vm.spellLists = data2.lists;
                    });
                } else {
                    alert(data.message);
                }
            });
        };

        vm.deleteList = function(listid) {
            SpellLists.del(listid).success(function(data) {
                if (data.success) {
                    for (var i = 0; i < vm.listIncludes.length; i++) {
                        if (vm.listIncludes[i]._id == listid) {
                            vm.listIncludes.splice(i, 1);
                        }
                    }
                    console.log(vm.listIncludes);
                    SpellLists.refresh().success(function(data2) {
                        vm.spellLists = data2.lists;
                    });
                } else {
                    alert(data.message);
                }
            });
        };

        vm.findName = function(spellid) {
            if (!vm.loaded) return "Loading...";
            var spell = $filter('spellById')(vm.items, spellid);
            if (!spell) return "Spell not found!";
            return spell.name;
        };
    });
