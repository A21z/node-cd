var fs = require('fs')
var _ = require('underscore');

var controllers = []

var files = fs.readdirSync(__dirname + "/routes")
for (var i = files.length - 1; i >= 0; i--){
    if(files[i].match(/\.js$/i)) {
       controllers.push(files[i]);
    }
}

for (i = controllers.length - 1; i >= 0; i--) {
    var name = controllers[i].slice(0,controllers[i].lastIndexOf('.'))
    exports[name] = require("./routes/" + controllers[i])
}

var that = this;

exports.__allRoutes = function(req, res){
	res.json(that);
};