var express = require("express");
var router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get('/',ensureAuthenticated, (req, res) => {
    res.render("admin")
})
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/admin/login');
	}
}

module.exports = router;
