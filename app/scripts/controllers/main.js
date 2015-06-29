'use strict';

angular.module('myDashApp')
  .controller('MainCtrl', function ($scope,PubNub) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

