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
        let footer = Build.buildFooter(this.props.data.theme);
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
const data = JSON.parse( document.getElementById( "data" ).innerHTML );
console.log( data );
ReactDOM.render( <Slides data={data} />, document.getElementById( "root" ) );