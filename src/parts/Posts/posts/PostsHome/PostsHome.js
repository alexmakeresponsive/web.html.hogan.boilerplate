var fs             = require('fs');
var hogan          = require('hogan.js');



var template = fs.readFileSync( __dirname + '/PostsHome.html').toString();

var context = require('../../../../data/postshome');

var partials = {
    post: fs.readFileSync( __dirname + '/../../single/PostSingle1.html').toString()
};

var templateCompiled       = hogan.compile(template);
var templateRendered       = templateCompiled.render(context, partials);


module.exports = templateRendered;