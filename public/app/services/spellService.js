angular.module('spellService', [])
.factory('spells', ['$http', function($http) {
	var o = { spells: [{
        name: "acid splash",
        level: "0",
        school: "conjuration",
        ritual: "false",
        classes: ["sorcerer", "wizard"],
        castingTime: "1 action",
        range: "60 feet",
        components: ["verbal", "somatic"],
        duration: "instantaneous",
        description: [
            "You hurl a bubble of acid. Choose one creature within range, or choose two creatures within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or take 1d6 acid damage.",
            "This spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
        ],
        page: "211"
      }, {
        name: "aid",
        level: "2",
        school: "abjuration",
        ritual: "false",
        classes: ["cleric", "paladin"],
        castingTime: "1 action",
        range: "30 feet",
        components: ["verbal", "somatic", "material"],
        duration: "8 hours",
        description: [
            "Your spell bolsters your allies with toughness and resolve. Choose up to three creatures within range. Each target's hit point maximum and current hit points increase by 5 for the duration.",
            "AT HIGHER LEVELS: When you cast this spell using a spell slot of 3rd level or higher, a target's hit points increase by an additional 5 for each slot level above 2nd."
        ],
        page: "211"
      }, {
        name: "alter self",
        level: "2",
        school: "transmutation",
        ritual: "false",
        classes: ["sorcerer", "wizard"],
        castingTime: "1 action",
        range: "self",
        components: ["verbal", "somatic"],
        duration: "1 hour, concentration",
        description: [
            "You assume a different form. When you cast the spell, choose one of the following options, the effects of which last for the duration of the spell. While the spell lasts, you can end one option as an action to gain the benefits of a different one.",
            "AQUATIC ADAPTATION: You adapt your body to an aquatic environment, sprouting gills and growing webbing between your fingers. You can breathe underwater and gain a swimming speed equal to your walking speed.",
            "CHANGE APPEARANCE: You transform your appearance. You decide what you look like, including your height, weight, facial features, sound of your voice, hair length, coloration, and distinguishing characteristics, if any. You can make yourself appear as a member of another race, though none of your statistics change. You also can\u2019t appear as a creature of a different size than you, and your basic shape stays the same; if you're bipedal, you can\u2019t use this spell to become quadrupedal, for instance. At any time for the duration of the spell, you can use your action to change your appearance in this way again.",
            "NATURAL WEAPONS: You grow claws, fangs, spines, horns, or a different natural weapon of your choice. Your unarmed strikes deal 1d6 bludgeoning, piercing, or slashing damage, as appropriate to the natural weapon you chose, and you are proficient with your unarmed strikes. Finally, the natural weapon is magic and you have a +1 bonus to the attack and damage rolls you make using it."
        ],
        page: "211"
      }, {
        name: "animal friendship",
        level: "1",
        school: "enchantment",
        ritual: "false",
        classes: ["bard", "druid", "ranger"],
        castingTime: "1 action",
        range: "30 feet",
        components: ["verbal", "somatic", "material"],
        duration: "24 hours",
        description: [
            "This spell lets you convince a beast that you mean it no harm. Choose a beast that you can see within range. It must see and hear you. If the beast’s Intelligence is 4 or higher, the spell fails. Otherwise, the beast must succeed on a Wisdom saving throw or be charmed by you for the spell’s duration. If you or one of your companions harms the target, the spells ends.",
            "AT HIGHER LEVELS: When you cast this spell using a spell slot of 2nd level or higher, you can affect one additional beast for each slot level above 1st."
        ],
        page: "212"
      }] };
	$http.get('/spells/basic').success(function(data) {
		angular.copy(data, o.spells);
	});
	return o;
}])
.controller('spellController', function($scope, spells) {
	$scope.items = spells.spells;

	$scope.levelIncludes = [];
	$scope.includeLevel = function(level) {
		var i = $.inArray(level, $scope.levelIncludes);
		if (i > -1)
			$scope.levelIncludes.splice(i, 1);
		else
			$scope.levelIncludes.push(level);
	};
	$scope.levelFilter = function(spell) {
		if ($scope.levelIncludes.length > 0) {
			if ($.inArray(spell.level, $scope.levelIncludes) < 0)
				return;
		}
		return spell;
	};

	$scope.classIncludes = [];
	$scope.includeClass = function(class_) {
		var i = $.inArray(class_, $scope.classIncludes);
		if (i > -1)
			$scope.classIncludes.splice(i, 1)
		else 
			$scope.classIncludes.push(class_);
	};
	$scope.classFilter = function(spell) {
		if ($scope.classIncludes.length > 0) {
			if (spell.classes.length === 0)
				return spell;
			for (i = 0; i < spell.classes.length; i++) {
				if ($.inArray(spell.classes[i], $scope.classIncludes) >= 0) {
					return spell;
				}
			}
			return;
		}
		return spell;
	};

	$scope.schoolIncludes = [];
    $scope.includeSchool = function(school) {
    	var i = $.inArray(school, $scope.schoolIncludes);
    	if (i > -1) {
        	$scope.schoolIncludes.splice(i, 1);
    	} else {
        	$scope.schoolIncludes.push(school);
    	}
    };
    $scope.schoolFilter = function(spell) {
    	if ($scope.schoolIncludes.length > 0) {
       		if ($.inArray(spell.school, $scope.schoolIncludes) >= 0) {
        	return spell;
        	}
        	return;
      	}
      	return spell;
    };

	$scope.setSpell = function(spell) {
		$scope.modalSpell = spell;
	};
});