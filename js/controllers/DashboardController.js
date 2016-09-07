'use strict'

angular.module('SoundCloudApp').controller('DashboardController', function($scope, $routeParams, LoginService, $location, $window, SoundService, $q, $mdSidenav){
  $scope.first_name = $routeParams.name;
  $scope.user = {};
  $scope.favorites = [];

  if($window.SC.isConnected()){
    SoundService.getUser().promise.then(response => {
      $scope.user = {
        id: response.id,
        avatar_url: response.avatar_url,
        full_name: response.full_name,
        username: response.username
      }
    });

    SoundService.getFavorites().promise.then(response  => {
      $scope.favorites = response;
      console.log(response);
    })
  }else{
    $location.path("/login");
  }

  $scope.logout = function(){
    $location.path('/login');
  }

  $scope.getFavorites = function(){
    SoundService.getFavorites().promise.then(response => {
      console.log(response);
    })
  }
})
