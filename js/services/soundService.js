'use strict'

angular.module('SoundCloudApp').service('SoundService', function($q, $window){

  this.getUser = function(){
    let defer = $q.defer();
    $window.SC.get('/me').then(res => {
      defer.resolve(res);
    });

    return defer;
  }

  this.getFavorites = function(){
    let defer = $q.defer();
    $window.SC.get('/me/favorites').then(res => {
      defer.resolve(res);
    });

    return defer;
  }

})
