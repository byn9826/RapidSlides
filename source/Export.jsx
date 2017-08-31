import React, { Component } from "react"
import ReactDOM from "react-dom";
import Build from "./build.js";
import Com from "./components.js";
import Resource from "./resource.js";

class Editor extends Component {
    constructor( props ) {
        super( props );
		this.state = {
            full: false,
            //default data for script and theme
            script: this.props.script,
            theme: this.props.theme,
            //store current page number
            page: 0,
            //transition animation
            trans: null,
		};
	}
    componentWillMount() {
        document.addEventListener( "keydown",  e => {
            let code = e.keyCode;
            if ( code === 37 ) {
                if ( this.state.page !== 0 ) {
                    !this.state.full ? 
                        this.setState({ trans: "left", page: this.state.page - 1 }) :
                        this.setState({ trans: "fullLeft", page: this.state.page - 1 });
                }
            } else if ( code === 39 ) {
                if ( this.state.page !== ( this.state.script.length - 1 )  ) {
                    !this.state.full ?
                        this.setState({ trans: "right", page: this.state.page + 1 }) :
                        this.setState({ trans: "fullRight", page: this.state.page + 1 });
                }
            }
        }, false );
    }
    //move left
    pageLeft() {
        if ( this.state.page !== 0 ) {
            this.setState({ trans: "left", page: this.state.page - 1 });
        }
    }
    //move right
    pageRight() {
        if ( this.state.page !== ( this.state.script.length - 1 ) ) {
            this.setState({ trans: "right", page: this.state.page + 1 });
        }
    }
    //click slide on side bar
    clickSlide( index ) {
        this.setState({ trans: "down", page: index });
    }
    //full screen or not
    themeFull() {
        this.setState({ full: !this.state.full, trans: null });
    }
    render() {
        //style for editor layout
        const mainStyle = {
            position: "absolute",
            left: "20%",
            width: "80%",
            top: "10vh",
            height: "90vh"
        };
        //style for full screen
        const fullStyle = {
            position: "absolute",
            left: "0",
            width: "100%",
            top: "0",
            height: "100vh"
        };
        //build main, footer for slides
        let content, footer, temporary;
        content = Build.buildContent( 
            this.state.theme, this.state.script, this.state.page, this.state.full
        );
        footer = Build.buildFooter( this.state.theme, this.state.script, this.state.page );
        //generate editor for slides
        let slides = this.state.script.map( ( slide, index ) =>
            <div 
                key={ "editSlide" + index } 
                className={ 
                    this.state.page === index ? "aside-slide aside-focus" : "aside-slide aside-display" 
                }
                onClick={ this.clickSlide.bind( this, index )}
            >
                <div className="aside-slide-box">
                    <span className="layout-fonts">Type:</span>
                    <div className="layout-fonts">{ slide.type }</div>
                </div>
                <div className="aside-slide-box aside-slide-template">
                    <span className="layout-fonts">Template:</span>
                    <div className="layout-fonts">{ slide.template }</div>
                </div>
                <div className="aside-slide-box">
                    <span className="layout-fonts">Title:</span>
                    <div className="layout-fonts">{ slide.title }</div>
                </div>
                {
                    slide.type === "Index" ? (
                        <div className="aside-slide-box">
                            <span className="layout-fonts">Linked with:</span>
                            <div className="layout-fonts">{ slide.check.join( ", " ) }</div>
                        </div>
                    ) : null
                }
                {
                    !Com.Ban[ slide.type + slide.template ] || 
                    Com.Ban[ slide.type + slide.template ].indexOf( "Desc" ) === -1 ? (
                        <div className="aside-slide-box">
                            <span className="layout-fonts">Desc:</span>
                            <div className="layout-fonts">{ slide.desc }</div>
                        </div>
                    ) : null
                }
                {
                    !Com.Ban[ slide.type + slide.template ] || 
                    Com.Ban[ slide.type + slide.template ].indexOf( "Image" ) === -1 ? (
                        <div className="aside-slide-box">
                            <span className="layout-fonts">Image:</span>
                            <img src={ "../workspace/storage/" + slide.image } />
                        </div>
                    ) : null
                }
                {
                    slide.type !== "Index" && 
                    (
                        !Com.Ban[ slide.type + slide.template ] || 
                        Com.Ban[ slide.type + slide.template ].indexOf( "Detail" ) === -1 
                    ) ? (
                        <div className="aside-slide-box">
                            <span className="layout-fonts">Detail:</span>
                            <ul className="layout-fonts">
                                {
                                    slide.detail ? (
                                        slide.detail.split( ";" ).map(( a, i ) =>
                                            <li 
                                                key={ "sl" + index + "de" + i } 
                                                className="layout-fonts"
                                            >
                                                { a }
                                            </li>
                                        )
                                    ) : null
                                }
                            </ul>
                        </div>
                    ) : null
                }
                <div className="aside-slide-line">
                    <div className="aside-slide-num layout-fonts">Slide { index + 1 }</div>
                </div>
            </div>
        );
        return (
            <div>
                {
                    !this.state.full ? (
                        <header id="header">
                            <section id="header-full" onClick={ this.themeFull.bind( this ) }>
                                Full
                            </section>
                            <section id="header-arrow">
                                <div onClick={ this.pageLeft.bind( this ) }>&#9198;</div>
                                <div onClick={ this.pageRight.bind( this ) }>&#9197;</div>
                            </section>
                        </header>
                    ) : null
                }
                {
                    !this.state.full ? (
                        <aside id="aside">
                            { slides }
                        </aside>
                    ) : null
                }
                <main 
                    id="temp-main" style={ this.state.full ? fullStyle : mainStyle } 
                    className={ this.state.trans } key={ "trans" + this.state.page }
                >
                    { content }
                    { footer }
                </main>
                {
                    this.state.full ? (
                        <span id="header-exit" onClick={ this.themeFull.bind( this ) }>
                            Exit
                        </span>
                    ) : null
                }
            </div>
        );
    }
}

const theme = JSON.parse( document.getElementById( "theme" ).innerHTML );
const script = JSON.parse( document.getElementById( "script" ).innerHTML );

ReactDOM.render( 
    <Editor script={ script } theme={ theme } />, document.getElementById( "root" ) 
);