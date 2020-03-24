var fs             = require('fs');
var hogan          = require('hogan.js');



var template = fs.readFileSync( __dirname + '/Logo.html').toString();

var context = {
    srcImage: '/assets/images/logo1.png'
};

var templateCompiled       = hogan.compile(template);
var templateRendered       = templateCompiled.render(context);


module.exports = templateRendered;

