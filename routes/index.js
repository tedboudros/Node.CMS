var express = require("express");
var router = express.Router();
var options = require("../models/options")
var pages = require("../models/page")
var head = require("../models/head")

router.get('/:page', (req, res) => { 
	head.getHead((err, head)=>{
		if(err) throw err;
		pages.getPageByURL(req.params.page, (err, page)=>{
			if(err) throw err;
			if(!page){
				res.render('stock_404', {head})
			}else{
				options.getOptionsByName("menu", (err, menu) => {
					res.render('stock', {head, menu, text: "hello world"});
				});
			}
		})
	})
});	

router.get('/', (req, res) => {
	res.redirect('/home')
});	

module.exports = router;
