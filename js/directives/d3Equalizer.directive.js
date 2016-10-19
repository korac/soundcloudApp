(function(){
  'use strict'

  angular
      .module('SoundCloudApp')
      .directive('d3Equalizer', d3Equalizer)

  function d3Equalizer(){
    var directive = {
      restrict: 'EA',
      templateUrl: './js/directives/d3Equalizer.directive.html',
      scope: {
        track     : "=",
        pause     : "=",
        play      : "=",
        isPlaying : "="
      },
      link: link
    };

    return directive;

    function link(scope, element, attrs){
      scope.play  = playAudio;
      scope.pause = pauseAudio;

      var stream_url   = scope.track,
          audioContext = new AudioContext(),
          audioElem    = new Audio(),
          analyzer     = audioContext.createAnalyser(),
          audioSrc     = audioContext.createMediaElementSource(audioElem),
          freq         = new Uint8Array(100),
          client_id    = '?client_id=1d976cc7e224840e96d9a00a5bd2cb9d';


      var requestAnimationFrame = window.requestAnimationFrame ||
                                  window.mozRequestAnimationFrame ||
                                  window.webkitRequestAnimationFrame ||
                                  window.msRequestAnimationFrame;

      audioElem.crossOrigin = "anonymous";

      audioSrc.connect(analyzer);
      analyzer.connect(audioContext.destination);

      scope.$watch('track', function(newTrack, oldTrack){
        stream_url = newTrack;
        renderNewEqualizer();
      })

      function playAudio(){
        audioElem.play();
        scope.isPlaying = true;
      }

      function pauseAudio(){
        audioElem.pause();
        scope.isPlaying = false;
      }

      function renderNewEqualizer(){
        if(stream_url){
          audioElem.src = stream_url + client_id;
          playAudio();

          getAudioData();
        }
      }

      function getAudioData(){
        requestAnimationFrame(getAudioData);
        analyzer.getByteFrequencyData(freq)

        svg.selectAll('rect')
          .data(freq)
          .attr('y', d => (height - d))
          .attr('height', d => scaleY(d))
          .attr('fill', (d,i) => colorScale(d))
      }

      var height = 350;
	    var width = 1100;

      var svg = d3.select("#equalizer")
                  .append("svg")
                  .attr("height", height)
                  .attr("width", width)

      var scaleY = d3.scaleLinear()
                     .domain([0, 255])
                     .range([0, height - 20]);

      var colorScale = d3.scaleLinear()
                         .domain([50, 255])
                         .range(["#536dfe", "#ff3400"])

      svg.selectAll('rect')
        .data(freq)
        .enter()
        .append('rect')
        .attr('x', (d,i) => { return i * ( width / freq.length )})
        .attr('width', width / freq.length - 1);

    }
  }
})();
