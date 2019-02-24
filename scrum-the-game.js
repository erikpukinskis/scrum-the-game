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
  "render-code",
  "./prospectus",
  "./investors",
  "./voices"],
  function(element, WebSite, BrowserBridge, aWildUniverseAppeared, basicStyles, identifiable, recommendation, backlog, renderCode, prospectus, investors, voices) {

    backlog.epics([
      // plant forests
      "v0@roi: UI allows you to enter all artifacts from the ROI equation with buttons that puts code on the timeline (12 stories)",
      "@voxel: enough for estimate/delivery/done/etc buttons on the right",
      "v1@roi: ROI can be delivered",
      "@scrum-the-game: Set up a gumroad link and get a customer",
      "v3@investors: An investor gets a dividend",
      "v4@roi: Contributors get paid legacy d.u.'s",
      "@scrum-the-game: finish SBOK"])

    var site = new WebSite()

    var bridge = new BrowserBridge()

    basicStyles.addTo(bridge)
    recommendation.hostOn(site)

    var v0 = bridge.partial()
    var v1 = bridge.partial()
    var v2 = bridge.partial()

    renderCode(v0, prospectus.v0)
    renderCode(v1, prospectus.v1)
    renderCode(v2, prospectus.v2)

    var p = element.template.container("p")




    bridge.addToHead(
      element.stylesheet([
        element.style(
          "h1",{
          "font-size": "1.4em",
          "color": "#427b6f"}),

        element.style(
          ".editable",{
          "font-size": "10pt"}),

        element.style(
          ".feed",{
          "max-width": "400px",
          "display": "flex",
          "flex-direction": "column-reverse"}),
      ]))

    var lil = element.template.container(".lil-page")

    var roi = recommendation(
      bridge,
      "ROI",
      "Understand value creation by calculating ROI")

    var nonGameSpace = element(
      "p",
      element.style({
        "margin": "10em 0"}),
      "non game space ...")

    var offer = element([
      lil(
        element("h1", "Prospectus"),
        p("This prospectus has a face value of <strong>$1800</strong> and an expected ROI of <strong>$0.01 on the dollar</strong> after planned sales, <strong>$1.20 on the dollar</strong> after good sales (200 units) and an <strong>additional $0.20 on the dollar</strong> in legacy dividends"),
        p("The accounting period for deciding the Revenue share will be 12 months following the issuance of the Bond, known as the \"Risk Period\". After that the bond will be considered paid in full and legacy dividends will be granted at the discretion of future story writers"),
        p("Below are the stories committed to three separate sprints. The money will be used to pay Erik to perform all tasks needed to complete them.")),

      lil(
        element("h1", "Version 1.0"),
        p("In order to make the first sale, players need to be able to deliver stories, and stories need to pay .d.u's"),
        p("This makes there something there to play.")),

      p(v0),

      p(v1),

      lil(
        element("h1", "Version 2.0"),
        p("The second release will disburse ROI back to all of the contributors."),
        p("This make it worth something to play."),
        p("This also creates a natural place for the paywall: pay to be a Project Owner.")),

      p(v2),
    ])

    var agreement = bridge.partial()
    investors.purchaseAgreement(agreement)

    var page = [
      element(
        "h1",
        "Scrum The Game"),
      element(".feed", [
        agreement,
        offer,
        nonGameSpace,
        roi]),
    ]

    site.addRoute(
      "get",
      "/",
      bridge.requestHandler(page))

    site.start(process.env.PORT || 4040)




    // CHANGE LOG

    backlog.done(
      "there is a server")

    backlog.done(
      "@browser-bridge: forks bridge to get partial over AJAX",
      "@scrum-the-game: recommendation acceptance drops rendered code into story flow")

    backlog.done([
      "@browser-bridge: forks bridge to get partial over AJAX",
      "@scrum-the-game: recommendation acceptance drops rendered code into story flow"])

    backlog.done(
      "prioritize stories for sprint")

    backlog.deliver(
      "render comments in render-code",
      "npm:write-code@0.21.0")

    backlog.done(
      "render comments in render-code",
      "npm:write-code@0.21.0")



    backlog("Wishlist",[
      "Developers can put in their youtube livestream URL and mark off a delivery demonstration",
      "UI for delivering npm module"])



    backlog("Risks",[
      "Risks are added to Stories in the Prioritized Product Backlog",
      "For example, there's a 1/2 probability that a prototype will be hard to use and require a revision that will cost -1.",
      "For example, let's say they accept to Check Risk Attitude in order to decide on the set of risk to accept",
      "If the company was judged to be risk seeking, and the story is Done, then the Check Risk Attitude recommendation would get a share of the deliverable.",
      "The deliverable share is disbursed as a VAT tax at each handoff",
      "So, the person who produced the deliverable would take 20% of the deliverable. The scrum master would a split of the next 20%, depending on how many team members they have. So, if there are 4 team members they take 5% of each deliverable",
      "The Product and Project Owners do the same, except split by the total number of the producers under their products",
      "People can take 1/2, 2x, or 5x shares if they are either working part time or working double-time with their energy and/or expertise"])

  })
