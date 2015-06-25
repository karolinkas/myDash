'use strict';

angular.module('myDashApp').directive('barchart', [function(){
	// Runs during compile
	return {		
		restrict: 'A', 
		link: function($scope, element) {
			element.append('<svg></svg>');
		}
	};
}]);