var library = require("module-library")(require)

module.exports = library.export(
  "scrum-the-game/play-media",[
  "web-element",
  "add-html"],
  function(element, addHtml) {
      
    var p = element.template.container("p")

    var starmanxPlea = [
      p("Starmanx would like to speak to you, will you enable her voice?"),
      p(element(
        "button.enable-voice",
        "Enable her voice")),
      p(element(
        "button",
        "Who the butt is Starmanx?")),
      p(element(
        "button",
        "Silence her!")),
    ]

    var allowed = null
    var asked = false
    var waiting = []
    function playMedia(id, delay, allowDelay) {

      if (typeof allowDelay == "undefined") {
        allowDelay = true
      }

      var video = document.getElementById(id)

      video.onended = function() {
        video.parentNode.classList.remove("playing")}

      video.onplay = function() {
        video.parentNode.classList.add("playing")}

      if (allowed === true) {
        setTimeout(
          playNow.bind(null, id),
          delay)
        return}

      if (allowed === false) {
        return }

      waiting.push([id, delay])


      if (!asked) {
        var page = element(
          ".lil-page",
          starmanxPlea)

        var newNodes = addHtml.inside(
          ".feed",
          page.html())

        var enable = newNodes[0].querySelector("button.enable-voice")
        enable.onclick = playWaiting
        asked = true}
    }

    function playWaiting() {
      allowed = true
      for(var i=0; i<waiting.length; i++) {
        var id = waiting[i][0]
        var delay = waiting[i][1]
        playMedia(id, delay, false)
      }
      waiting = []
    }

    function playNow(id) {
      video = document.getElementById(id)
      var isPlaying = video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2
      if (isPlaying) {
        return }
      video.play().catch(
        andThrow) }

    function andThrow(e) {
      throw e }

    return playMedia
  })
