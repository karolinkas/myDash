'use strict';

angular.module('myDashApp').directive('bubble', ['d3Service', function(d3Service){
	// Runs during compile
	return {		
		restrict: 'A', 
		link: function($scope, element) {
		
	 
			d3Service.d3().then(function(d3) {

				element.append('<svg></svg>');

				var margin = {
				    top: 40,
				    right: 50,
				    bottom: 100,
				    left: 60
				},
						width = 560 - margin.left - margin.right,
				    height = 330 - margin.top - margin.bottom;

				var svg = d3.select('svg')
				    .attr('width', width + margin.left + margin.right)
				    .attr('height', height + margin.top + margin.bottom)
				    .append('g')
				    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

				svg.selectAll('circle')
						.data($scope.data)
						.enter()
						.append('circle')
						.attr('r',50)
						.attr('rx', 500)
						.attr('ry', 700);



			});			
		}
	};
}]);
