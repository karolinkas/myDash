'use strict';

angular.module('myDashApp')
  .controller('MainCtrl', ['$scope','SimpleHttpLoader', function ($scope,SimpleHttpLoader) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.log ={
    	src: 'files/access.log',
    	data: ''
    }; 

    new SimpleHttpLoader($scope.log.src)
     .then(function(response){
      $scope.log.data = response.data;
     });
  }]);

