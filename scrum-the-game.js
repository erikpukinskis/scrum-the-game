var library = require("module-library")(require)

library.using([
  "web-element",
  "web-site",
  "browser-bridge",
  "a-wild-universe-appeared",
  "basic-styles",
  "identifiable",
  "./roi"],
  function(element, WebSite, BrowserBridge, aWildUniverseAppeared, basicStyles, identifiable, recommendation) {
    var site = new WebSite()

    var bridge = new BrowserBridge()
    basicStyles.addTo(bridge)

    recommendation.hostOn(site)

    var page = [
      element(".lil-page", [
        element(
          "h1",
          "Scrum The Game"),
        recommendation(
          bridge,
          "ROI",
          "Understand value creation by calculating ROI"),
      ])]


    var storiesByBacklog = {}

    function addStories(backlogName, etc) {
      var backlog = storiesByBacklog[backlogName]

      if (!backlog) {
        backlog = storiesByBacklog[backlogName] = []
      }

      for(var i=arguments.length+1; i<arguments.length; i++) {
        var story = arguments[i]
        backlog.push(story)
      }
    }

    function deliver(story, deliverable) {

    }

    function accept(story, deliverables) {

    }



    // epics:

    // plant forests

    // deliver stories

    // show code

    // game begins by selecting a Scrum Guidance Body recommendation to try

    addStories(
      "prioritized-project-backlog",[
      "there is a server",
      "get basic deliverable",
      "bank ROI"])

      // Finish SBOK notes

      // Do a fast pass over SBOK notes to get things into story form and no egrecious dupes

    addStories(
      "prioritized-product-backlog",[
      "render comments in render-code",
      "UI for delivering npm module",
      "prioritize add a story for it",
      "mark it done",
    ])

    deliver(
      "render comments in render-code",
      "npm:write-code@0.21.0")

    accept(
      "render comments in render-code",
      "npm:write-code@0.21.0")

      // Project Owner commits to ROI strategy

      // Project Owner adds story to prioritized product queue

    function ROI() {

      // A project owner accepts an ROI strategy recommended by the Scrum Guidance Body
      // Deliverables are the currency
      // Tasks are taken by producers and turned into deliverables
      // Accepted deliverables assign profit to the tasks that created them
      // a task assign profit to the producer that completed them and the stories gave way to the task
      // stories assign profit to:
      // - the project that generated them
      // -- the product owner
      // -- the scrum master
      // -- the Scrum Guidance Body recommendations that guided those stories


      // Eventually:

      // Risks are added to Stories in the Prioritized Product Backlog
      // For example, there's a 1/2 probability that a prototype will be hard to use and require a revision that will cost -1.
      // For example, let's say they accept to "Check risk attitude" in order to decide on the set of risk to accept
      // If the company was judged to be risk seeking, and the story is Done, then the "Check risk attitude" recommendation would get a share of the deliverable.
      // The deliverable share is disbursed as a VAT tax at each handoff
      // So, the person who produced the deliverable would take 20% of the deliverable. The scrum master would a split of the next 20%, depending on how many team members they have. So, if there are 4 team members they take 5% of each deliverable
      // The Product and Project Owners do the same, except split by the total number of the producers under their products
      // People can take 1/2, 2x, or 5x shares if they are either working part time or working double-time with their energy and/or expertise
    }



    site.addRoute(
      "get",
      "/",
      bridge.requestHandler(page))

    site.start(4040)
  })
