var fs             = require('fs');
var hogan          = require('hogan.js');



var template = fs.readFileSync( __dirname + '/PostsHome.html').toString();

var context = {
    posts: [
        {
            href: '/postshome/post-1/',
            title: 'Post 1 title',
            text: 'Post 1 text ...',
            imgSrc: '/assets/images/postshome/posthome1.png',
            imgAlt: 'Post Img'
        },
        {
            href: '/postshome/post-2/',
            title: 'Post 2 title',
            text: 'Post 2 text ...',
            imgSrc: '/assets/images/postshome/posthome2.png',
            imgAlt: 'Post Img'
        },
        {
            href: '/postshome/post-3/',
            title: 'Post 3 title',
            text: 'Post 31 text ...',
            imgSrc: '/assets/images/postshome/posthome3.png',
            imgAlt: 'Post Img'
        }
    ]
};

var partials = {
    post: fs.readFileSync( __dirname + '/../../single/PostSingle1.html').toString()
};

var templateCompiled       = hogan.compile(template);
var templateRendered       = templateCompiled.render(context, partials);


module.exports = templateRendered;