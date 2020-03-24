var fs             = require('fs');
var hogan          = require('hogan.js');


var templateHeader      = require('../../../../parts/Header/Header');
var templateBody        = require('./Body/Body');

var template = fs.readFileSync( __dirname + '/PostHome.html').toString();

var context = {
    Header: templateHeader,
    Body: templateBody
};


var templateCompiled       = hogan.compile(template);
var templateRendered       = templateCompiled.render(context);


// module.exports = templateRendered;

var root                   = document.getElementById('root');

// console.log(templateRendered);

root.innerHTML = templateRendered;