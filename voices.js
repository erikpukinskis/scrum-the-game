var library = require("module-library")(require)

module.exports = library.export(
  "scrum-the-game/voices",[
  "fs",
  "web-element"],
  function(fs, element) {

    function hostOnSite(site) {
      fs.readdir(
        "./audio",
        hostIfMp3.bind(null, site))}

    function hostIfMp3(site, error, files) { 
      if (error) {
        throw error
      }
      files.forEach(function(filename) {
        if (!filename.match(
          /.mp3$/i)) {
          return }

        if (filename.match(
          /\.\.|\~|\//)) {
          return }

        var text = filename.replace(/^[0-9][0-9][0-9]-[0-9][0-9] /, "")

        text = text.replace(/.mp3$/, "")

        var url = "/voice/"+encodeURIComponent(text)
        console.log("adding link to", url)
        site.addRoute(
          "get",
          "/voice/"+encodeURIComponent(text),
          site.sendFile(
            __dirname,
            "audio/"+filename))  
      })}

    function player(bridge, script, delay) {
      var play = definePlayOn(bridge)

      var audioElement = element(
        element.tag("audio"),{
        "controls": "true"},

        element(
          element.tag("source"),{
          "src": "/voice/"+script,
          "type": "audio/mpeg"}))

      bridge.domReady(
        play.withArgs(
          audioElement.assignId(), delay))

      return element(
        ".player-controls",
        audioElement)}

    var stylesheet = element.stylesheet([
      element.style(
        ".player-controls",{
        "overflow": "hidden",
        "width": "36px",
        "height": "36px",
        "border": "2px solid black",
        "border-radius": "5px",
        "opacity": "0.3",

        ".playing": {
          "opacity": "1"},

        " audio": {
          "margin": "-9px",
          "width": "400px"}}),
      ])

    function definePlayOn(bridge) {
      var play = bridge.remember("scrum-the-game/play")

      if (!play) {
        play = bridge.defineFunction(playMedia)
        bridge.addToHead(
          stylesheet.html())
        bridge.see("scrum-the-game/play", play)
      }

      return play
    }


    function playMedia(id, delay) {
      setTimeout(playNow.bind(null, id), delay)

      var video = document.getElementById(id)

      video.onended = function() {
        video.parentNode.classList.remove("playing")}

      video.onplay = function() {
        video.parentNode.classList.add("playing")}

      function playNow(id) {
        video = document.getElementById(id)
        var isPlaying = video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2

        if (!isPlaying) {
          video.play().catch(
            function(e) {
              throw e})}}

    }

      
    return {
      hostOn: hostOnSite,
      player: player }
  })