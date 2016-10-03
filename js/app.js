(function(){
  'use strict'

  var app = angular.module('SoundCloudApp', [
    'ngMaterial',
    'ngRoute'
  ]);

  app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
    $routeProvider
        .when('/login', {
          controller: 'LoginController',
          templateUrl: './js/templates/login.html'
        })
        .when('/:name/dashboard', {
          controller: 'DashboardController',
          templateUrl: './js/templates/dashboard.html',
          resolve: {
            access: function($location, $window){
              if(!$window.SC.isConnected()){
                $location.path('/login');
              }
            }
          }
        })
        .otherwise({ redirectTo: '/login'})
      }]);

  app.config(['$mdThemingProvider', function($mdThemingProvider){
    $mdThemingProvider.theme('default')
      .primaryPalette('deep-orange')
      .accentPalette('teal')
    }]);

  window.onload = initializeSC();

  function initializeSC(){
    SC.initialize({
      client_id: '1d976cc7e224840e96d9a00a5bd2cb9d',
      redirect_uri: 'http://localhost:8080/callback.html'
    });
  }

})();
