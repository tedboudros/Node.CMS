var express = require("express");
var router = express.Router();

var head = [
  { name: "Bootstrap_CSS", url: "/css/bootstrap.min.css", css: true },
  { name: "Bootstrap_JS", url: "/js/bootstrap.min.js", js: true }
];

router.get("/login", (req, res) => {
  res.render("login", { head });
});

router.get("/", (req, res) => {
  res.render("admin", { head });
});
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/admin/login");
  }
}

module.exports = router;
