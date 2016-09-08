'use strict'

angular.module('SoundCloudApp').controller('DashboardController', function($scope, $routeParams, LoginService, $location, $window, SoundService, $q, $mdSidenav, $document){
  $scope.first_name = $routeParams.name;
  $scope.user = {};
  $scope.favorites = [];
  $scope.selectedTrack;
  $scope.sound;

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
      $scope.selectedTrack = $scope.favorites[0];
    })
  }else{
    $location.path("/login");
  }

  $scope.logout = function(){
    $location.path('/login');
  }

  // $scope.play = function(){
  //   console.log("playay");
  //   console.log($scope.sound);
  //   $scope.sound.stop();
  // }

  $scope.selectTrack = function(track) {
    console.log(track)
    $scope.selectedTrack = track;
    // $window.SC.get('/tracks', {genres: "trance"}).then(function(tracks){
    //   console.log(tracks[0]);
    // })
    // $window.SC.oEmbed(track.uri, {auto_play: true}, $document[0].getElementById('playme')).then(function(embed){
    //   console.log(embed);
    // })
    $window.SC.stream("/tracks/181271912").then(function(sound){
      // $scope.sound = sound;
      sound.play();
    })
  }
})
