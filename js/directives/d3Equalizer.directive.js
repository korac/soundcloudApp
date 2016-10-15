(function(){
  'use strict'

  angular
      .module('SoundCloudApp')
      .directive('d3Equalizer', d3Equalizer)

  function d3Equalizer(){
    var directive = {
      restrict: 'EA',
      templateUrl: '',
      scope: {},
      link: link
    };

    return directive;

    function link(scope, element, attrs){
      // 
    }
  }
})();
