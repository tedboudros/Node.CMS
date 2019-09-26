var express = require("express");
var router = express.Router();
var options = require("../models/options");
var pages = require("../models/page");

router.get("/:page", (req, res) => {
  pages.getPageByURL(req.params.page, (err, page) => {
    if (err) throw err;
    if (!page) {
      res.render("stock_404");
    } else {
      options.getOptionsByName("menu", (err, menu) => {
        res.render("stock", { menu, text: "hello world" });
      });
    }
  });
});

router.get("/", (req, res) => {
  res.redirect("/home");
});

module.exports = router;
