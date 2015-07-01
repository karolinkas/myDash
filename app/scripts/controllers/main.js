'use strict';

angular.module('myDashApp')
  .controller('MainCtrl', ['$scope','$http', function ($scope,$http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    
	    var url = 'https://data.sparkfun.com/output/dZ4EVmE8yGCRGx5XRX1W?callback=JSON_CALLBACK';
	    $http.jsonp(url)
	    .success(function(data){
	        console.log(data.found);
	    });

  }]);

