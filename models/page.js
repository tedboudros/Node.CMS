var mongoose = require('mongoose');

// Pages Schema
var PagesSchema = mongoose.Schema({
    name: {
		type: String
    },
    url: {
        type: String
	}
});

var Pages = module.exports = mongoose.model('Pages', PagesSchema);

module.exports.createPages = function(newPages, callback){
	newPages.save(callback);
}
module.exports.getPageByURL = function(url, callback){
    var query = {url: url};
    Pages.findOne(query, callback)
} 
module.exports.removePages = function(id, callback){
	var query = {_id: id};
	Pages.findOneAndDelete(query, callback);
}