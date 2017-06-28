import React, { Component } from "react"
import ReactDOM from "react-dom";
import Com from "./components.js";
class Slides extends Component {
    constructor( props ) {
        super( props );
		this.state = {
            //store current page number
            page: 0,
            //store total page number
            //total: this.props.data.script.length,
            //store data for each pages
            main: this.props.data.script,
            //store data for footer
            footer: this.props.data.theme.footer
		};
	}
    render () {
        return (
            <div id="react-root">
                <main id="main">
                    
                </main>
                <footer id="footer">
                    <Com.FooterDefaultCopyright />
                </footer>
            </div>
        );
    }
}
//load content
const data = JSON.parse( document.getElementById( "data" ).innerHTML );
console.log( data );
ReactDOM.render( <Slides data={data} />, document.getElementById( "root" ) );