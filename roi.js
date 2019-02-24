var library = require("module-library")(require)

module.exports = library.export(
  "scrum-the-game/roi",[
  library.ref(),
  "scrum-backlog",
  "web-element",
  "bridge-module",
  "browser-bridge",
  "render-code"],
  function(lib, backlog, element, bridgeModule, BrowserBridge, renderCode) {

    var recommendations = {
      "ROI": "Understand value creation by calculating ROI",
    }


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

    backlog(
      "UI allows you to enter all artifacts from the ROI equation with buttons that puts code on the timeline",[
      // 12 stories:
      "business case: gap in market segment",
      "market segments: people paying us and people not paying us",
      "Story: A scrum game where you can earn a D.U.",
      "Line of Minimum Marketable Features is drawn: just that story",
      "A wild revenue expectation appeared... $9.90",
      "Story is accepted into a sprint",
      "Story is broken into tasks",
      "Developer estimates the tasks for a story",
      "A wild timeline appeared",
      "A wild cost appeeared",
      "opportunity cost = other stories ROI / other stories estimated length",
      "eROI = (expected cost - expected revenue) / (expected opportunity cost * length of timeline)"])

    backlog(
      "v1.0 ROI can be delivered",[
      // 8 stories:
      "Some code is pasted and delivered",
      "The story is marked as done",
      "1 d.u. (delivered unit) is disbursed to the story",
      "the various contractors are awarded shares in payment for labor and their own materials",
      "A Wild ROI Appears: ROI = whatever revenue is left from the 1.d.u. / opportunity costs actually realized over the observed project length",
      "A delta ROI is awarded to the product manager",
      "Whatever is left of the actual money goes to the Scrum Guidance Body recommendations and into a pot for the collective good"])

    backlog("v4: legacy", [
      "All future Scrum The Game Stories that are dependent on this one (which will be most of them) will also pay out part of their d.u.’s to this any other infrastructural stories. So if I do a story volume of 100 this year and 50 are dependent on this story, and there are on average 10 contributors in each Story’s lineage, and they split 1/5 of a d.u then this story will be paid an additional 100 / 10 / 5 = 2 d.u.’s over the coarse of that year.",
      "If it’s typical to have stories valued at $100 in dROI, then that’s an additional $200 in cash dividends to the contributors to this story (the investors and the producers) for a total ROI after one year of $1.40 on the dollar"])

    function prepareBridge(bridge) {
      if (bridge.remember("scrum-the-game/roi")) {
        return
      }


      // A story is created

      bridge.cache()
  

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
            ".feed")
        })


      var tellStory = bridge.defineFunction(
        [bridge.loadPartial.asCall()],
        function(loadPartial) {
          event.preventDefault()
          var text = event.target.querySelector(
            "input[name=storyText")

          loadPartial({
            "method": "post",
            "path": "/stories",
            "data": {
              "text": text.value}},
            ".feed")

          text.value = ""
        })


      var calls = {
        accept: accept,
        decline: removeElement,
        tellStory: tellStory.withArgs(BrowserBridge.event),
      }

      bridge.see("scrum-the-game/roi", calls)

      return calls
    }

    recommendation.hostOn = hostOn

    var cachedBridges = {}

    var tellStory = element.template("form.lil-page",{
      "method": "post",
      "action": "/stories"},
      element("h1", "The most important step of Scrum is telling a Story"),
      element("p", "What's a thing that someone could value?"),
      element("p", element(
        "input",{
        "type": "text",
        "name": "storyText",
        "placeholder": "A Story for the future"})),
      element("p", element(
        "button", "Add to Prioritized Product Backlog")),
      function(bridge) {
        var calls = bridge.remember("scrum-the-game/roi")
        this.addAttribute("onsubmit", calls.tellStory.evalable())})  
         

    function hostOn(site) {
      if (site.remember("scrum-the-game/roi")) {
        return
      }

      site.addRoute(
        "post",
        "/stories",
        function(request, response) {
          var bridge = BrowserBridge.fromRequest(request).forResponse(response)
          var text = request.body.text
          var backlogPartial = bridge.partial()

          // A scrum game where you can earn a D.U.

          var backlogSource = "backlog([\n  "+JSON.stringify(text)+"\"\n  // -- Minimum Marketable Features Here --\n  ])"

          renderCode(backlogPartial, backlogSource,{noLogo: true})

          backlogPartial.addAttribute("data-stick-to", "backlog")

          bridge.sendPartial(backlogPartial,{
            "stickTo": "backlog"})
        })

      site.addRoute(
        "get",
        "/accept/recommendation/:id",
        function(request, response) {
          var bridge = BrowserBridge.fromRequest(request).forResponse(response)

          var sprintCode = bridge.partial()
          var recommendation = recommendations[request.params.id]
          var source = "sprint(\n  \"my-sprint\")\nsprint.acceptPractice(\n  \"my-sprint\",\n  "+JSON.stringify(recommendation)+")"

          renderCode(sprintCode, source, {noLogo: true})

          var tellIt = tellStory(bridge)
          tellIt.addAttribute("data-stick-to", "backlog")

          bridge.sendPartial([
            sprintCode,
            tellIt,
            stepsToGetRoi(bridge)],{
            "stickTo": "backlog"})
        })

      site.see(
        "scrum-the-game/roi",
        true)
    }


    function stepsToGetRoi(bridge) {

      var p = element.template.container("p")

      var page = element(
        ".lil-page",[

        element("h1", "Choose a business case."),

        p("In order to calcuate a Return on Investment, we need a strategy for money to appear."),

        p("Eventually there will be many strategies, but right now there is only one:"),

        element("h1", "Fill a gap in your market segments"),

        element("textarea",
          "People who are paying us\nPeople who are not paying us"),

        p(element("button", "Fill a gap between these segments")),
      ])

      return page        
    }

    function playVoice(script) {
      return element(
        element.tag("audio"),{
        "controls": "true"},

        element(
          element.tag("source"),{
          "src": "/voice/"+script,
          "type": "audio/mpeg"}))}

    function recommendation(bridge, id, text) {

      var calls = prepareBridge(bridge)

      var player = playVoice("The body of scrum guidance. has made a recommendation")

      var play = bridge.remember("scrum-the-game/play")

      if (!play) {
        play = bridge.defineFunction(playMedia)}
    
      function playMedia(id) {
        var video = document.getElementById(id)

        var isPlaying = video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2

        if (!isPlaying) {
          video.play()}}

      bridge.domReady(
        play.withArgs(
          player.assignId()))

      var recommendationElement = element(
        ".lil-page", [
        element(
          "h1",
          "The Body of Scrum Guidance made a Recommendation:"),
        element(
          "p",
          "Understand value creation by calculating ROI"),
        player])

      recommendationElement.assignId()

      var accept = calls.accept.withArgs(
        recommendationElement.id,
        "ROI")

      // Ticks when this button gets clicks, every second:

      // 1: Some sort of color effect in the button

      // 2: The recommendation accept form is replaced with an "Accepted Recommendation" plaque, which gives a little bounce. log paragraph: "A recommendation was accepted!" appears with it

      // 3: New stuff from the partial above because the recommendation was accepted.


      var acceptElement = element("p",element(
        "button",
        "Accept ROI recommendation",{
        "onclick": accept.evalable()}))

      var decline = calls.decline.withArgs(
        recommendationElement.id)

      var declineButton = element("button", "Decline for now",{
        "onclick": decline.evalable()})

      recommendationElement.addChildren(acceptElement, declineButton)

      return recommendationElement
    }

    return recommendation
  })