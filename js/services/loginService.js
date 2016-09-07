'use strict'

angular.module('SoundCloudApp').service('LoginService', function($http, $q){
  // this.getUser = function(username){
  //   return $http.get('http://api.soundcloud.com/users/' + username + '/tracks.json?client_id=1d976cc7e224840e96d9a00a5bd2cb9d');
  // }

  SC.initialize({
    client_id: '',
    redirect_uri: 'http://localhost:8080/callback.html'
  });

  this.connect = function(){
    var defer = $q.defer();

    SC.connect().then(function(){
      console.log("Is connected:", SC.isConnected());
      SC.get("/me").then(function (response) {
        defer.resolve(response);
      });
    });

    return defer;
  }

  // this.getMe = function(){
  //   SC.get("/me").then(function (response) {
  //     console.log("Welcome", response.username);
  //     return response;
  //   });
  // }

})
