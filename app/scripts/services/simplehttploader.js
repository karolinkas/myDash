'use strict';

angular.module('myDashApp')
  .factory('SimpleHttpLoader', ['$http' ,
  function ($http) {
    return function(url) {
      return $http.get(url);     
      };
  }]);
