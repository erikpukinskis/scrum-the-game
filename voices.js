var library = require("module-library")(require)

module.exports = library.export(
  "scrum-the-game/voices",[
  "fs"],
  function(fs) {

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

    return {
      hostOn: hostOnSite }
  })