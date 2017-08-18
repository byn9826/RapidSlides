const fs = require( 'fs' );
const path = require( 'path' );
const util = require( 'util' );
const { remote } = require('electron')

window.onload = function() {

    const main = document.getElementById( "main-container" );
    
    fs.readdirSync( path.join( __dirname, './workspace/' )).forEach( file => {
        if ( file.split( "." ).pop() === "html" || file.split( "." ).pop() === "HTML" ) {
            
            let stats = fs.statSync( path.join( __dirname, './workspace/' + file ) );
            let lTime = new Date( util.inspect( stats.mtime ) );

            let title = document.createElement( "div" );
            let titleText = document.createTextNode( file.split( "." )[ 0 ] );
            title.appendChild( titleText );

            let created = document.createElement( "span" );
            let createdText = document.createTextNode( lTime.toString().substring( 4, 24 ) );
            created.appendChild( createdText );

            let section = document.createElement( "section" );
            section.appendChild( title );
            section.appendChild( created );
            section.onclick = function() { loadFile( file ); }
            main.appendChild( section ); 
        }
    });
}

function loadFile( file ) {
    remote.getCurrentWindow().loadURL( path.join( __dirname, './workspace/', file ) );
}