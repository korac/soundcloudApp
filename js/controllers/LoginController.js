(function(){
  'use strict'

  angular
      .module('SoundCloudApp')
      .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', 'LoginService', '$location']

  function LoginController($scope, LoginService, $location){
    var vm = this;

    vm.connect  = connect;
    vm.naslov   = "SoundCloud";

    function connect(){
      var userLog = LoginService.connect().promise;
      userLog.then(function(response){
        $location.path('/' + response.first_name + '/dashboard');
      })
    }

  }
})();
