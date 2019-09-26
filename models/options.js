var mongoose = require('mongoose');

// Options Schema
var OptionsSchema = mongoose.Schema({
    name: {
		type: String
    },
    value: {
        type: String
	}
});

var Options = module.exports = mongoose.model('Options', OptionsSchema);

module.exports.createOptions = function(newOptions, callback){
	newOptions.save(callback);
}
module.exports.getOptionsByName = function(name, callback){
	var query = {name: name};
	Options.findOne(query, (err, option) => {
        callback(err, JSON.parse(option.value))
    });
} 
module.exports.removeOptions = function(id, callback){
	var query = {_id: id};
	Options.findOneAndDelete(query, callback);
}