var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user");

var head = [
  { name: "Bootstrap_CSS", url: "/css/bootstrap.min.css", css: true },
  { name: "Popper", url: "/js/popper.min.js", js: true },
  { name: "JQuery", url: "/js/jquery.min.js", js: true },
  { name: "Bootstrap_JS", url: "/js/bootstrap.min.js", js: true }
];

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post(
  "/login",
  passport.authenticate("local", { successRedirect: "/admin", failureRedirect: "/admin/login", failureFlash: true }),
  function(req, res) {
    res.redirect("/admin");
  }
);

// GET ROUTES //
router.get("/login", (req, res) => {
  res.render("login", { head });
});
//menus
router.get("/", ensureAuthenticated, (req, res) => {
  res.render("home", { head });
});
router.get("/pages", ensureAuthenticated, (req, res) => {
  res.render("intergation/pages", { head });
});
router.get("/post", ensureAuthenticated, (req, res) => {
  res.render("/intergation/posts", { head });
});
// sub Menu //
router.get("/updates", ensureAuthenticated, (req, res) => {
  res.render("dashboard/updates", { head });
});

// create user //
function createUser(name, username, password, callback) {
  var newUser = User({
    username,
    password,
    name
  });
  User.createUser(newUser, function(err, user) {
    callback(user);
  });
}

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: "Unknown user" });
      }

      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Wrong password" });
        }
      });
    });
  })
);

router.get("/logout", ensureAuthenticated, function(req, res) {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/");
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/admin/login");
  }
}

module.exports = router;
