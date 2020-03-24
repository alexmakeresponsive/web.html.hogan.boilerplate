var fs             = require('fs');
var hogan          = require('hogan.js');


var template = fs.readFileSync( __dirname + '/Body.html').toString();


var dataPostsHome = require('../../../../../../data/postshome');

var postId = window.location.search.replace( /^\D+/g, '') * 1;
var posts  = dataPostsHome.posts;


function findPostId(array, postId) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].id === postId) return i;
    }
    return false;
}

var currentPostIndex = findPostId(posts, postId);


if ( currentPostIndex !== false ) {
    context = posts[currentPostIndex];
} else {
    context = {
        error: 'object is empty'
    };
}



var templateCompiled       = hogan.compile(template);
var templateRendered       = templateCompiled.render(context);


module.exports = templateRendered;


