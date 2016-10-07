(function(){
  'use strict'

  angular
      .module('SoundCloudApp')
      .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', '$routeParams', 'LoginService', '$location', '$window', 'SoundService', '$q', '$mdSidenav', '$document'];

  function DashboardController($scope, $routeParams, LoginService, $location, $window, SoundService, $q, $mdSidenav, $document){
    var vm = this;

    vm.favorites = [];
    vm.first_name = $routeParams.name;
    vm.logout = logout;
    vm.pauseSound = pauseSound;
    vm.playingTrack;
    vm.playSound = playSound;
    vm.selectedTrack;
    vm.selectTrack = selectTrack;
    vm.sound;
    vm.user = {};
    vm.volumeDown = volumeDown;
    vm.volumeUp = volumeUp;

    vm.streamSound = streamSound;

    // vm.seek = function(){
    //   console.log(vm.sound.currentTime())
    //   var time = prompt("daj vrime u milisekundama");
    //   vm.sound.seek(time);
    // }

    initUser();
    initFavorites();

    function initFavorites(){
      SoundService.getFavorites().promise.then(response  => {
        vm.favorites = response;
        selectTrack(vm.favorites[0]);
        streamSound(vm.favorites[0]);
      })
    }

    function initUser(){
      SoundService.getUser().promise.then(response => {
        vm.user = {
          id: response.id,
          avatar_url: response.avatar_url,
          full_name: response.full_name,
          username: response.username
        }
      });
    }

    function logout(){
      $location.path('/login');
    }

    function pauseSound(){
      console.log(vm.sound);
      vm.sound.pause();
    }

    function playSound(){
      // vm.playingTrack = track;
      vm.sound.play();
    }

    function selectTrack(track){
      vm.selectedTrack = track;
      // streamSound(track.id);
    }

    function streamSound(track){
      vm.playingTrack = track;
      $window.SC.stream("/tracks/" + track.id).then(sound => {
        vm.sound = sound;
        console.log("streamed!");
      })
    }

    function volumeDown(){
      var volume = vm.sound.getVolume();
      if(volume > 0){
        volume -= 0.05;
        vm.sound.setVolume(volume);
      }
    }

    function volumeUp(){
      var volume = vm.sound.getVolume();
      if(volume < 1){
        volume += 0.05;
        vm.sound.setVolume(volume);
      }
    }

  }
})();
