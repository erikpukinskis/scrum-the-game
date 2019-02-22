
module.exports = {
v0: function(backlog) {
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
},

v1: function(backlog) {
backlog(
  "Voxel layout: Enough for estimate/delivery/done/etc buttons on the right",[
  // 3 stories:
  "I'm just pressing buttons and filling out forms, and they are either causing code to drop down, or they are getting replaced by code.",
  "In the grid to the right of each string in the array of the backlog, there are some buttons for editing, estimating, marking as done",
  "To the right of that is the entry in the compacted universe log corresponding to that string"])
},
v2: function(backlog) {
backlog(
  "ROI can be delivered",[
  // 8 stories:
  "Some code is pasted and delivered",
  "The story is marked as done",
  "1 d.u. (delivered unit) is disbursed to the story",
  "the various contractors are awarded shares in payment for labor and their own materials",
  "A Wild ROI Appears: ROI = whatever revenue is left from the 1.d.u. / opportunity costs actually realized over the observed project length",
  "A delta ROI is awarded to the product manager",
  "Whatever is left of the actual money goes to the Scrum Guidance Body recommendations and into a pot for the collective good"])
}
}
