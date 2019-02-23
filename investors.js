var library = require("module-library")(require)

module.exports = library.export(
  "scrum-the-game/investors",
  ["scrum-backlog", "web-element"],
  function(backlog, element) {

    backlog("v3: investors",[
      "A portion of subsequent stories which depend on this story will be returned as a dividend. The share of d.u’s will be taken as a value added tax after the proximate contributors have taken theirs, before the scrum guidance body. After them all investors in and contributors to those preceding stories are awarded a VAT  equally split.",
      "A wild velocity appeared: 1 d.u. per day. There is no velocity yet, so we just pick one story per day",
      "The expected cost to develop these 18 stories is 18 days at $100/ day or $1800",
      "The expected revenue is $10, for an eROI of about a penny on the dollar. Thats just fair warning that there is no business analysis here past the first sale.",
      "The break even point if at some point eventually 200 people buy the game, that’s $200 in profit and the ROI will be $1.20 on the dollar."])


    function purchaseAgreement(bridge) {
      bridge.send(agreement)}

    var p = element.template.container("p")

    var agreement = [
      element("h1", "Purchase Agreement"),
      p("This is where you agree to buy an amount"),
      p(element(
        "input",{
        "name": "amount",
        "type": "text",
        "size": "5",
        "value": "$50"})),
      p(element(
        "input",{
        "name": "phone",
        "type": "text",
        "placeholder": "Enter your phone number"})),
      p(element("button", "Become a Contributor")), 
    ]

    return {
      purchaseAgreement: purchaseAgreement
    }
  })
