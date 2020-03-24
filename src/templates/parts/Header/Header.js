var fs             = require('fs');
var hogan          = require('hogan.js');

var templateLogo = require('../Logo/Logo');
var templateNav = require('../Nav/Nav');


var template = fs.readFileSync( __dirname + '/Header.html').toString();

var context = {
    description: 'some header description',
    Logo: templateLogo,
    Nav: templateNav
};

var templateCompiled       = hogan.compile(template);
var templateRendered       = templateCompiled.render(context);


module.exports = templateRendered;