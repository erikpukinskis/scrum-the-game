var library = require("module-library")(require)

library.using([
  "web-element",
  "web-site",
  "browser-bridge",
  "a-wild-universe-appeared",
  "basic-styles",
  "identifiable",
  "./roi",
  "scrum-backlog",
  "render-code"],
  function(element, WebSite, BrowserBridge, aWildUniverseAppeared, basicStyles, identifiable, recommendation, scrumBacklog) {

    scrumBacklog.epics(
      // plant forests
      "@browser-bridge: forks bridge to get partial over AJAX",
      "@scrum-the-game: recommendation acceptance drops rendered code into story flow",
      "@voxel",
      "@roi",
      "finish SBOK")

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

    site.addRoute(
      "get",
      "/",
      bridge.requestHandler(page))

    site.start(4040)



    // CHANGE LOG

    scrumBacklog.done(
      "there is a server")

    scrumBacklog.done(
      "UI for delivering npm module")

    scrumBacklog.done(
      "prioritize stories for sprint")

    scrumBacklog.deliver(
      "render comments in render-code",
      "npm:write-code@0.21.0")

    scrumBacklog.done(
      "render comments in render-code",
      "npm:write-code@0.21.0")


    scrumBacklog(
      // Risks are added to Stories in the Prioritized Product Backlog
      // For example, there's a 1/2 probability that a prototype will be hard to use and require a revision that will cost -1.
      // For example, let's say they accept to "Check risk attitude" in order to decide on the set of risk to accept
      // If the company was judged to be risk seeking, and the story is Done, then the "Check risk attitude" recommendation would get a share of the deliverable.
      // The deliverable share is disbursed as a VAT tax at each handoff
      // So, the person who produced the deliverable would take 20% of the deliverable. The scrum master would a split of the next 20%, depending on how many team members they have. So, if there are 4 team members they take 5% of each deliverable
      // The Product and Project Owners do the same, except split by the total number of the producers under their products
      // People can take 1/2, 2x, or 5x shares if they are either working part time or working double-time with their energy and/or expertise
    )

  })
