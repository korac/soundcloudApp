'use strict'

angular.module('SoundCloudApp').controller('DashboardController', function($scope, $routeParams){
  $scope.first_name = $routeParams.name;
})
