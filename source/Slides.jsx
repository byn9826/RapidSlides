import React, { Component } from "react"
import ReactDOM from "react-dom";
import Build from "./build.js";


class Slides extends Component {
    constructor( props ) {
        super( props );
		this.state = {
            //store current page number
            page: 0,
            //store total page number
            //total: this.props.data.script.length,

		};
	}
    render () {
        //build footer
        let footer = Build.buildFooter(this.props.theme);
        return (
            <div id="react-root">
                <main id="main">
                    
                </main>
                {footer}
            </div>
        );
    }
}


//load content
const theme = JSON.parse( document.getElementById( "theme" ).innerHTML );
let script = document.getElementById( "script" ).innerHTML.trim();
//seperate content into pages
script = script.split( "@-" );
script = removeEmpty( script );
//seperate pages into points
script = script.map( ( a ) => {
    a = a.split( /\@\#|\@\$|\@\~/ );
    a = removeEmpty( a );
    a = a.map( ( b ) => {
        return b.trim();
    });
    return a;
});
console.log( script );


ReactDOM.render( <Slides script={script} theme={theme} />, document.getElementById( "root" ) );


function removeEmpty( arr ) {
    return arr.filter( ( a ) => {
        return a.trim() !== "";
    });
}