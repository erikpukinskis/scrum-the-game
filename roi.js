var library = require("module-library")(require)

module.exports = library.export(
  "scrum-the-game/roi",[
  library.ref(),
  "web-element",
  "bridge-module"],
  function(lib, element, bridgeModule) {

    function prepareBridge(bridge) {
      if (bridge.remember("scrum-the-game/roi")) {
        return
      }

      var addPath = bridge.defineFunction([
        bridgeModule(lib, "add-html", bridge),
        bridgeModule(lib, "web-element", bridge)],
        function addPath(addHtml, element, path) {

          var iframe = element(
            "iframe",{
            "src": path},
            element.style({
              "max-width": "400px",
              "border": "none"}))

          addHtml(iframe.html())
        })

      bridge.domReady([
        bridgeModule(lib, "add-html", bridge)],
        function(addHtml) {
          addHtml.defaultIn(
            ".lil-page")})
    

      var removeElement = bridge.defineFunction(
        function removeElement(id) {
          var el = document.getElementById(id)
          el.parentElement.removeChild(
            el)})

      var accept = bridge.defineFunction(
        [removeElement, addPath],
        function acceptRecommendation(removeElement, addPath, elementId, recommendation) {
          removeElement(elementId)
          addPath("/accept/recommendation/"+recommendation)
        })

      var calls = {
        accept: accept,
        decline: removeElement
      }

      bridge.see("scrum-the-game/roi", calls)

      return calls
    }

    recommendation.hostOn = hostOn

    function hostOn(site) {
      if (site.remember("scrum-the-game/roi")) {
        return
      }
      site.addRoute(
        "get",
        "/accept/recommendation/:id",
        function(request, response) {
          var id = request.params.id

          response.send("ya")
        })

      site.see(
        "scrum-the-game/roi",
        true)
    }

    function recommendation(bridge, id, text) {

      var calls = prepareBridge(bridge)

      var recommendationElement = element([
          element("h1", "The Body of Scrum Guidance made a Recommendation:"),
          element("p", "Understand value creation by calculating ROI"),
      ])

      var recommendations = {
        "ROI": "Understand value creation by calculating ROI",
      }

      recommendationElement.assignId()

      var accept = calls.accept.withArgs(
        recommendationElement.id,
        "ROI")

      var acceptElement = element(
        "button",
        "Accept ROI recommendation",{
        "onclick": accept.evalable()})

      var decline = calls.decline.withArgs(
        recommendationElement.id)

      var declineButton = element("button", "Decline for now",{
        "onclick": decline.evalable()})

      recommendationElement.addChildren(acceptElement, declineButton)

      return recommendationElement
    }

    return recommendation
  })