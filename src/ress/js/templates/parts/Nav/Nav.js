var fs             = require('fs');
var hogan          = require('hogan.js');



var template = fs.readFileSync( __dirname + '/Nav.html').toString();

var context = {
    links: [
        { href: '/', label: 'Home' },
        { href: '/about.html', label: 'About' }
    ]
};

var templateCompiled       = hogan.compile(template);
var templateRendered       = templateCompiled.render(context);


module.exports = templateRendered;