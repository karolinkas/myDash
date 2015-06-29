'use strict';

angular.module('myDashApp').directive('bubble', ['d3Service','PubNub', '$rootScope', function(d3Service,PubNub,$rootScope){
	// Runs during compile
	return {		
		restrict: 'A', 
		link: function($scope, element) {
		

		  PubNub.init({
				subscribe_key: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe'
				}).subscribe({
				channel : 'pubnub-twitter',
				message : function(msg){ console.log(msg.text.length); 
									}
				});


		$scope.channel = 'pubnub-twitter';

		var number;

		PubNub.ngSubscribe({ channel: $scope.channel });
		  $rootScope.$on(PubNub.ngMsgEv($scope.channel), function(ngEvent, payload) {
		    $scope.$apply(function() {
		      if (payload.message.uuid) {
		      	number=payload.message.text.length;
		      	console.log(number);
		      }
		    });
		  });	


			d3Service.d3().then(function(d3) {

				// element.append('<svg></svg>');

				// var margin = {
				//     top: 40,
				//     right: 50,
				//     bottom: 100,
				//     left: 60
				// },
				// 		width = 560 - margin.left - margin.right,
				//     height = 330 - margin.top - margin.bottom;

				// var svg = d3.select('svg')
				//     .attr('width', width + margin.left + margin.right)
				//     .attr('height', height + margin.top + margin.bottom)
				//     .append('g')
				//     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

				// svg.selectAll('circle')
				// 		.data($scope.data)
				// 		.enter()
				// 		.append('circle')
				// 		.attr('r',50)
				// 		.attr('rx', 500)
				// 		.attr('ry', 700);



			});			
		}
	};
}]);
