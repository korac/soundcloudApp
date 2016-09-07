'use strict'

angular.module('SoundCloudApp').controller('LoginController', function($scope, LoginService, $location){
  $scope.naslov = "SoundCloud";

  $scope.connect = function(){
    var userLog = LoginService.connect().promise;
    userLog.then(function(response){
      $location.path('/' + response.first_name + '/dashboard');
    })
  }

  // initiate auth popup
  // SC.connect().then(function(){
  //   console.log("Is connected:", SC.isConnected());
  //   SC.get("/me").then(function (response) {
  //     console.log("Welcome", response.username);
  //   });
  // });
  // $scope.getUser = function(){
  //   SoundService.getUser($scope.searchText).then(function(response){
  //     // console.log(response.data);
  //     $scope.userData = response.data;
  //   });
  // }
  //
  // $scope.play = function(track_url){
  //   // console.log("play " + track_url);
  //   SC.oEmbed(track_url, { auto_play: true }, function(oEmbed) {
  //     console.log("play " + track_url);
  //     $scope.$apply($scope.player_html = $sce.trustAsHtml(oEmbed.html));
  //   });
  // }


});
