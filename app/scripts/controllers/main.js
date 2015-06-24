'use strict';

/**
 * @ngdoc function
 * @name myDashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myDashApp
 */
angular.module('myDashApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
