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
        track: "="
      },
      link: link
    };

    return directive;

    function link(scope, element, attrs){
      //
      var stream_url = scope.track,
          audioContext = new AudioContext(),
          audioElem = new Audio(),
          analyzer = audioContext.createAnalyser(),
          audioSrc = audioContext.createMediaElementSource(audioElem),
          freq = new Uint8Array(100),
          client_id = '?client_id=1d976cc7e224840e96d9a00a5bd2cb9d';

      var requestAnimationFrame = window.requestAnimationFrame ||
                                  window.mozRequestAnimationFrame ||
                                  window.webkitRequestAnimationFrame ||
                                  window.msRequestAnimationFrame;

      // audioElem.volume = 0;
      audioElem.crossOrigin = "anonymous";

      audioSrc.connect(analyzer);
      analyzer.connect(audioContext.destination);

      function renderNewEqualizer(){
        audioElem.src = stream_url + client_id;
        audioElem.play();
        console.log(audioElem.src);
        console.log(audioElem);
        getAudioData();
      }

      function getAudioData(){
        requestAnimationFrame(getAudioData);

        analyzer.getByteFrequencyData(freq)
        console.log(freq[0]);
        svg.selectAll('rect')
          .data(freq)
          .attr('y', d => (height - d))
          .attr('height', d => scaleY(d))
          .attr('fill', (d,i) => colorScale(d))

      }

      scope.$watch('track', function(newTrack, oldTrack){
        stream_url = newTrack;
        renderNewEqualizer();
      })

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
                         .range(["#01579b", "#FF3030"])

      svg.selectAll('rect')
        .data(freq)
        .enter()
        .append('rect')
        .attr('x', (d,i) => { return i * ( width / freq.length )})
        .attr('width', width / freq.length - 1);

    }
  }
})();
