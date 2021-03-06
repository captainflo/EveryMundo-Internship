// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render(path.join(__dirname, "../public/index.html"));
  });
  app.get("/test", function(req, res) {
    res.render(path.join(__dirname, "../public/test.html"));
  });
};
