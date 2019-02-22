var library = require("module-library")(require)

module.exports = library.export(
  "scrum-the-game/roi",[
  library.ref(),
  "scrum-backlog",
  "web-element",
  "bridge-module",
  "browser-bridge"],
  function(lib, scrumBacklog, element, bridgeModule, BrowserBridge) {

    scrumBacklog(
      "Something is delivered",
      "the code that changed is visible where the story was delivered",
      "The story is marked as done",
      "1 d.u. (delivered unit) is disbursed to the story",
      "the various contractors are awarded shares in payment for labor and their own materials",
      "A Wild ROI Appears:",
      "eROI = (expected cost - expected revenue) / (expected cost * time until realization) * Risks",
      "new ROI = opportunity costs / previous revenue + whatever is left from the 1 d.u.",
      "A delta ROI is awarded to the product manager",
      "Whatever is left of the actual money goes to the Scrum Guidance Body recommendations and into a pot for the collective good",
      "People just have d.u.'s. That's it. That's the game.")


    function prepareBridge(bridge) {
      if (bridge.remember("scrum-the-game/roi")) {
        return
      }

      // A story is created

      bridge.cache()

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
        [
        removeElement,
        bridge.loadPartial.asCall()],
        function acceptRecommendation(removeElement, loadPartial, elementId, recommendation) {
          removeElement(elementId)

          loadPartial("/accept/recommendation/"+recommendation,
            ".lil-page")
        })

      var calls = {
        accept: accept,
        decline: removeElement
      }

      bridge.see("scrum-the-game/roi", calls)

      return calls
    }

    recommendation.hostOn = hostOn

    var cachedBridges = {}

    function hostOn(site) {
      if (site.remember("scrum-the-game/roi")) {
        return
      }
      site.addRoute(
        "get",
        "/accept/recommendation/:id",
        function(request, response) {
          var bridge = BrowserBridge.fromRequest(request).forResponse(response)

          bridge.asap(function() {
            console.log("this is my scrip")})

          bridge.sendPartial("This is my body")
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