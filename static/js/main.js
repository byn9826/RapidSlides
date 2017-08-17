const fs = require( 'fs' );
const path = require( 'path' );
var files = [];

window.onload = function() {

    const main = document.getElementById( "main" );
    
    fs.readdirSync( path.join( __dirname, './workspace/' )).forEach( file => {
        if ( file.split( "." ).pop() === "html" || file.split( "." ).pop() === "HTML" ) {
            files.push( file );
            let title = document.createElement( "div" );
            let titleText = document.createTextNode( file.split( "." )[ 0 ] );
            title.appendChild( titleText );
            main.appendChild( title ); 
        }
    });
    console.log(files)
}




