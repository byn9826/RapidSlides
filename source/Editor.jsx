import React, { Component } from "react"
import ReactDOM from "react-dom";
import Build from "./build.js";

class Editor extends Component {
    constructor( props ) {
        super( props );
		this.state = {
            //store current page number
            page: 0,
            //transition animation
            trans: null
		};
	}
    componentWillMount() {
        document.addEventListener( "keydown",  e => {
            let code = e.keyCode;
            if ( code === 37 ) {
                if ( this.state.page !== 0 ) {
                    this.setState({ trans: "left", page: this.state.page - 1 });
                }
            } else if ( code === 39 ) {
                if ( this.state.page !== ( this.props.script.length - 1 ) ) {
                    this.setState({ trans: "right", page: this.state.page + 1 });
                }
            }
        }, false );
    }
    render() {
        const mainStyle = {
            position: "absolute",
            left: "20%",
            width: "80%",
            top: "10vh",
            height: "90vh"
        };
        //build main for slides
        const content = Build.buildContent( 
            this.props.script[ this.state.page ], 
            this.props.theme, 
            this.props.script 
        );
        //build footer for slides
        const footer = Build.buildFooter( 
            this.props.theme, 
            this.props.script, 
            this.state.page 
        );
        return (
            <div>
                <header id="header">
                </header>
                <aside id="aside">
                </aside>
                <main 
                    id="main" 
                    style={ mainStyle } 
                    className={ this.state.trans } 
                    key={ "trans" + this.state.page }
                >
                    { content }
                    { footer }
                </main>
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
script = script.map(  a  => {
    a = a.split( /\@\#|\@\$|\@\~|\@\!/ );
    a = removeEmpty( a );
    a = a.map(  b  => b.trim() );
    return a;
});
console.log( script );

ReactDOM.render( <Editor script={ script } theme={ theme } />, document.getElementById( "root" ) );

//remove empty index in array
function removeEmpty( arr ) {
    return arr.filter(  a  => a.trim() !== "" );
}