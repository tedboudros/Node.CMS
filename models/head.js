var mongoose = require('mongoose');

// Heads Schema
var HeadsSchema = mongoose.Schema({
    name: {
		type: String
    },
    css: {
        type: Boolean
    },
    js: {
        type: Boolean
    },
    url: {
        type: String
    }
});

var Heads = module.exports = mongoose.model('Heads', HeadsSchema);

module.exports.createHeads = function(newHeads, callback){
	newHeads.save(callback);
}
module.exports.getHead = function(callback){
    var query = {};
    Heads.find(query, callback)
} 
module.exports.removeHeads = function(id, callback){
	var query = {_id: id};
	Heads.findOneAndDelete(query, callback);
}