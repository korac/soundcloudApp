(function(){
  'use strict'

  var app = angular.module('SoundCloudApp', [
    'ngMaterial',
    'ngRoute'
  ]);

  app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
    $routeProvider
        .when('/login', {
          templateUrl: './js/templates/login.html',
          controller: 'LoginController',
          controllerAs: 'vm'
        })
        .when('/:name/dashboard', {
          templateUrl: './js/templates/dashboard.html',
          controller: 'DashboardController',
          controllerAs: 'vm',
          resolve: { access: access }
        })
        .otherwise({ redirectTo: '/login'})
      }]);

  app.config(['$mdThemingProvider', function($mdThemingProvider){
    $mdThemingProvider.theme('default')
      .primaryPalette('deep-orange')
      .accentPalette('teal')
    }]);

  window.onload = initializeSC();

  function access($location, $window){
    if(!$window.SC.isConnected()){
      $location.path('/login');
    }
  }

  function initializeSC(){
    SC.initialize({
      client_id: '1d976cc7e224840e96d9a00a5bd2cb9d',
      redirect_uri: 'http://localhost:8080/callback.html'
    });
  }

})();
