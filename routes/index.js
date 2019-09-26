var express = require('express');
var router = express.Router();
var options = require("../models/options")

router.get('/', (req, res) => {
    options.getOptionsByName("menu", (err, menu) => {
        res.render('index', {menu, text: "hello world"});
    });
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error','Δεν έχετε κάνει είσοδο στο σύστημα.');
		res.redirect('/login');
	}
}

module.exports = router;