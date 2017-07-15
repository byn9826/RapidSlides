import React, { Component } from "react"
import ReactDOM from "react-dom";
import Build from "./build.js";

class Editor extends Component {
    constructor( props ) {
        super( props );
		this.state = {
            script: this.props.script,
            theme: this.props.theme,
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
                if ( this.state.page !== ( this.state.script.length - 1 ) ) {
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
            this.state.theme,
            this.state.script,
            this.state.page
        );
        //build footer for slides
        /*
        const footer = Build.buildFooter( 
            this.state.theme,
            this.state.script,
            this.state.page
        );*/
        //editor area
        let slides = this.state.script.map(( slide, index ) =>
            <div key={ "editSlide" + index } className="aside-slide">
                <div className="aside-slide-box">
                    <span>Type:</span>
                    <select>
                        <option>Cover</option>
                        <option>Index</option>
                        <option>Single</option>
                    </select>
                </div>
                <div className="aside-slide-box">
                    <span>Template:</span>
                    <select>
                        <option>DefaultFull</option>
                    </select>
                </div>
                <div className="aside-slide-box">
                    <span>Title:</span>
                    <input type="text" value={ slide.title } />
                </div>
                <div className="aside-slide-box">
                    <span>Desc:</span>
                    <textarea>{ slide.desc }</textarea>
                </div>
                <div className="aside-num">Slide Number: { index + 1 }</div>
            </div>
        );
        return (
            <div>
                <header id="header">
                </header>
                <aside id="aside">
                    <div id="aside-add" className="layout-fonts">Add</div>
                    { slides }
                </aside>
                <main 
                    id="main" 
                    style={ mainStyle } 
                    className={ this.state.trans } 
                    key={ "trans" + this.state.page }
                >
                    { content }
                </main>
            </div>
        );
    }
}

//load content
const theme = JSON.parse( document.getElementById( "theme" ).innerHTML );
const script = JSON.parse( document.getElementById( "script" ).innerHTML );

ReactDOM.render( <Editor script={ script } theme={ theme } />, document.getElementById( "root" ) );