var fs             = require('fs');
var hogan          = require('hogan.js');

var templateHeader      = require('../../parts/Header/Header');
var templateBody   = '<p class="someAboutStyle">About us page</p>';


var template = fs.readFileSync( __dirname + '/About.html').toString();

var context = {
    Header: templateHeader,
    Body: templateBody
};

var templateCompiled       = hogan.compile(template);
var templateRendered       = templateCompiled.render(context);


var root                   = document.getElementById('root');

root.innerHTML = templateRendered;