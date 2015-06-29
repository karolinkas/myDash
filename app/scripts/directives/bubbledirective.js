'use strict';

angular.module('myDashApp').directive('bubble', ['d3Service','PubNub', function(d3Service,PubNub){
	// Runs during compile
	return {		
		restrict: 'A', 
		link: function($scope, element) {
		
		var data;

	  PubNub.init({
			subscribe_key: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe'
			}).subscribe({
			channel : 'pubnub-twitter',
			message : function(msg){ console.log(msg.text.length); 
								var data = msg.text.length; 
								return data; 
								}
			});

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
						.data()
						.enter()
						.append('circle')



			});			
		}
	};
}]);
