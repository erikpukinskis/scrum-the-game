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
  function(element, WebSite, BrowserBridge, aWildUniverseAppeared, basicStyles, identifiable, recommendation, backlog) {

    backlog.epics([
      // plant forests
      "@roi: UI allows you to enter all artifacts from the ROI equation with buttons that puts code on the timeline (12 stories)",
      "@scrum-the-game: Set up a gumroad link and get a customer"
      "@roi: ROI can be delivered",
      "@investors: An investor gets a dividend",
      "@roi: Contributors get paid legacy d.u.'s": 
      "@voxel: lines of code with widgets attached to the right, and stacked in a column with other partials",
      "@scrum-the-game: finish SBOK"])

    backlog("real life", [
      "Developers can put in their youtube livestream URL and mark off a delivery demonstration"])

    backlog("v4: legacy", [
      "All future Scrum The Game Stories that are dependent on this one (which will be most of them) will also pay out part of their d.u.’s to this any other infrastructural stories. So if I do a story volume of 100 this year and 50 are dependent on this story, and there are on average 10 contributors in each Story’s lineage, and they split 1/5 of a d.u then this story will be paid an additional 100 / 10 / 5 = 2 d.u.’s over the coarse of that year.",
      "If it’s typical to have stories valued at $100 in dROI, then that’s an additional $200 in cash dividends to the contributors to this story (the investors and the producers) for a total ROI after one year of $1.40 on the dollar"])

    backlog.done([
      "@browser-bridge: forks bridge to get partial over AJAX",
      "@scrum-the-game: recommendation acceptance drops rendered code into story flow"])


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
