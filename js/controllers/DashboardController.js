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
    vm.playSound = playSound;
    vm.selectedTrack;
    vm.pauseSound = pauseSound;
    vm.selectTrack = selectTrack;
    vm.sound;
    vm.user = {};
    vm.volumeDown = volumeDown;
    vm.volumeUp = volumeUp;

    // vm.playres = function(){
    //   vm.sound.play-resume();
    // }
    //
    // vm.reset = function(){
    //   console.log(vm.sound.currentTime());
    // }

    initUser();
    initFavorites();

    function initFavorites(){
      SoundService.getFavorites().promise.then(response  => {
        vm.favorites = response;
        vm.selectedTrack = vm.favorites[0];
        streamSound(vm.selectedTrack.id);
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
      vm.sound.pause();
      console.log(vm.sound);
    }

    function playSound(){
      vm.sound.play();
    }

    function selectTrack(track){
      console.log(track);
      vm.selectedTrack = track;
      streamSound(track.id);
    }

    function streamSound(track_id){
      $window.SC.stream("/tracks/" + track_id).then(function(sound){
        vm.sound = sound;
      })
    }

    function volumeDown(){
      var volume = vm.sound.getVolume();
      volume--;
      vm.sound.setVolume(volume);
    }

    function volumeUp(){
      var volume = vm.sound.getVolume();
      volume++;
      vm.sound.setVolume(volume);
    }

  }
})();
