(function(){
  'use strict'

  angular
      .module('SoundCloudApp')
      .filter('TitleFilter', TitleFilter);

  function TitleFilter(){
    return function(title){
      if(title.length > 16){
        let newTitle = title.slice(0, 18);
        return newTitle + "..";
      }
      return title;
    }
  }
})();
