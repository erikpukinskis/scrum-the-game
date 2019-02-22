var library = require("module-library")(require)

module.exports = library.export(
  "scrum-the-game/roi",[
  library.ref(),
  "scrum-backlog",
  "web-element",
  "bridge-module",
  "browser-bridge"],
  function(lib, backlog, element, bridgeModule, BrowserBridge) {

    // All of this stuff is UIs on the timeline that disappear below code that's added to the timline, which is flexbox reverse

    // It is at timescale 8, yet the display is at timescale 1, which would normally mean all the items are 8 units apart vertically.

    // However, if only one line is needed (there is only one line in the code, or the UI is only a button or something), the entire vertical grid is squeezed in that vertical slice, so that it only takes up one unit of vertical space.... WITH probably an extra unit or so split evenly on both sides, which works as a paragraph break.

    // Forms a vertical rhythm with comments too

    backlog("V2 And Beyond", [
      "ROI includes Risks",
      "Acceptance Criteria",
      ])

      // Something about risks
      // Something about risks


    // you have a box you can enter a story, but then it just appears in the top of a backlog code:

    backlog("v0",[
      "business case: gap in market segment"
      "market segments: people paying us and people not paying us",
      "Story: A scrum game where you can earn a D.U."
      "Line of Minimum Marketable Features is drawn: just that story",
      "A wild revenue expectation appeared: $9.90",

    // In the grid to the right each line has some buttons for editing, estimating, marking as done


      // It's possible somewhere in here I will want to implement the spatial layout thing described above. Although seemingly I can just do it with a feed. Best to try that first, since the grid is meant to operate mostly like a feed for apps anyway.
      // Either way the feed will certainly be backed by a universe log
      "Story is accepted into a sprint",
      "Story is broken into tasks",
      "Developer estimates the tasks for a story",
      "A wild timeline appeared",
      "A wild cost appeeared",
      "opportunity cost = other stories ROI / other stories estimated length"
      "eROI = (expected cost - expected revenue) / (expected opportunity cost * length of timeline)"])

    backlog("v1", [
      "Some code is pasted and delivered",
      "The story is marked as done",
      "1 d.u. (delivered unit) is disbursed to the story",
      "the various contractors are awarded shares in payment for labor and their own materials",
      "A Wild ROI Appears: ROI = whatever revenue is left from the 1.d.u. / opportunity costs actually realized over the observed project length",
      "A delta ROI is awarded to the product manager",
      "Whatever is left of the actual money goes to the Scrum Guidance Body recommendations and into a pot for the collective good"])


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
            console.log("maybe even do stuff in javascript!")})

          bridge.sendPartial(element("This is where we'd show stuff related to the <strong>"+request.params.id+"</strong> recommendation"))
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