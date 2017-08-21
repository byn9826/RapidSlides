const fs = require( 'fs' );
const path = require( 'path' );
const util = require( 'util' );
const url = require( 'url' );
const { remote } = require('electron');

window.onload = function() {

    const main = document.getElementById( "main-container" );
    
    fs.readdirSync( path.join( __dirname, './workspace/' )).forEach( file => {
        if ( file.split( "." ).pop() === "html" || file.split( "." ).pop() === "HTML" ) {
            
            let stats = fs.statSync( path.join( __dirname, './workspace/' + file ) );
            let lTime = new Date( util.inspect( stats.mtime ) );

            let title = document.createElement( "div" );
            let titleText = document.createTextNode( file.split( "." )[ 0 ] );
            title.appendChild( titleText );
            title.onclick = function() { loadFile( file ); }

            let created = document.createElement( "span" );
            let createdText = document.createTextNode( lTime.toString().substring( 4, 24 ) );
            created.appendChild( createdText );
            created.onclick = function() { loadFile( file ); }

            let button = document.createElement( "button" );
            button.className = "slide-delete";
            button.innerText = "Delete";
            button.onclick = function() { deleteFile( file ); }

            let section = document.createElement( "section" );
            section.appendChild( title );
            section.appendChild( created );
            section.appendChild( button );
            main.appendChild( section ); 
        }
    });
}

function loadFile( file ) {
    remote.getCurrentWindow().loadURL(url.format({
        pathname: '../workspace/' + file,
        protocol: 'file:',
        slashes: true
    }));
}

function showCreate() {
    document.getElementById( "header-action" ).style.display = "block";
    document.getElementById( "header-title" ).value = null;
}

function confirmCreate() {
    var name = document.getElementById( "header-title" ).value.trim();
    if ( name && name !== "" ) {
        var file = fs.readFileSync( __dirname + "/raw/edit.original", { encoding:'utf-8' } );
        file = new DOMParser().parseFromString( file, "text/html" );
        file.getElementById( "title" ).innerText = document.getElementById( "header-title" ).value;
        file = new XMLSerializer().serializeToString( file );
        try { 
            fs.writeFileSync( 
                __dirname + "/workspace/" + name + ".html", 
                file, 
                'utf-8'
            ); 
        } catch( e ) { 
            alert('Failed to save the file !'); 
        }
        remote.getCurrentWindow().reload();
    } 
}

function closeCreate() {
    document.getElementById( "header-action" ).style.display = "none";
}

var toggle = 0;

function showManage() {
    toggle++;
    if ( toggle % 2 === 1 ) {
        document.querySelectorAll( ".slide-delete" ).forEach( a => a.style.display = "block" );
    } else {
        document.querySelectorAll( ".slide-delete" ).forEach( a => a.style.display = "none" );
    }
}

function deleteFile( name ) {
    fs.unlink( __dirname + "/workspace/" + name, () => {
        remote.getCurrentWindow().reload();
    });
}