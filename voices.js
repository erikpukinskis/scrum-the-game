var library = require("module-library")(require)

module.exports = library.export(
  "scrum-the-game/voices",[
  library.ref(),
  "fs",
  "web-element",
  "bridge-module",
  "./play-media"],
  function(lib, fs, element, bridgeModule, _) {

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
        "display": "inline-block",
        "overflow": "hidden",
        "width": "34px",
        "height": "34px",
        "border": "2px solid black",
        "border-radius": "5px",
        "opacity": "0.3",
        "vertical-align": "middle",
        "margin-left": "10px",

        ".playing": {
          "opacity": "1"},

        " audio": {
          "margin": "-10px",
          "width": "400px"}}),
      ])
     

    function definePlayOn(bridge) {
      var play = bridge.remember("scrum-the-game/play")

      if (play) { 
        return play }

      bridge.addToHead(
        stylesheet.html())

      play = bridgeModule(
        lib,
        "scrum-the-game/play-media",
        bridge),

      bridge.see(
        "scrum-the-game/play",
        play)

      return play }

    return {
      hostOn: hostOnSite,
      player: player }
  })