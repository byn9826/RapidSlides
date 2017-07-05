import React, { Component } from "react"
import ReactDOM from "react-dom";
import Build from "./build.js";


class Slides extends Component {
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
        document.addEventListener( "keydown", ( e ) => {
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
    render () {
        //build main
        let main = Build.buildMain( this.props.script[ this.state.page ], this.props.theme );
        //build footer
        let footer = Build.buildFooter( this.props.theme, this.props.script, this.state.page );
        return (
            <div id="react-root" className={this.state.trans} key={"trans" + this.state.page}>
                {main}
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