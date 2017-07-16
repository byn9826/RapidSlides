import React, { Component } from "react"
import ReactDOM from "react-dom";
import Build from "./build.js";
import Com from "./components.js";

class Editor extends Component {
    constructor( props ) {
        super( props );
		this.state = {
            //default data for script and theme
            script: this.props.script,
            theme: this.props.theme,
            //store current page number
            page: 0,
            //transition animation
            trans: null,
            //status of add new slide
            add: false,
            addType: "0",
            addTemplate: "0",
            addTitle: "",
            addDesc: ""
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
    //click add slide button
    clickAdd() {
        this.setState({ add: true });
    }
    //change type of new added slide
    addType( e ) {
        this.setState({ addType: e.target.value });
    }
    //change template of new added slide
    addTemplate( e ) {
        this.setState({ addTemplate: e.target.value });
    }
    //change content of new title
    addTitle( e ) {
        this.setState({ addTitle: e.target.value });
    }
    //change content of new desc
    addDesc( e ) {
        this.setState({ addDesc: e.target.value });
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
        //generate editor for slides
        let slides = this.state.script.map(( slide, index ) =>
            <div key={ "editSlide" + index } className="aside-slide">
                <div className="aside-slide-box">
                    <span className="layout-fonts">Type:</span>
                    <div className="layout-fonts">{ slide.title }</div>
                </div>
                <div className="aside-slide-box">
                    <span className="layout-fonts">Template:</span>
                    <div className="layout-fonts">{ slide.template }</div>
                </div>
                <div className="aside-slide-box">
                    <span className="layout-fonts">Title:</span>
                    <div className="layout-fonts">{ slide.title }</div>
                </div>
                <div className="aside-slide-box">
                    <span className="layout-fonts">Desc:</span>
                    <div className="layout-fonts">{ slide.desc }</div>
                </div>
                <div className="aside-num layout-fonts">Slide { index + 1 }</div>
            </div>
        );
        //show new slide editor
        let add;
        let templates, temps;
        if ( Com[ this.state.addType ] ) {
            templates = Object.entries( Com[ this.state.addType ] );
            temps = templates.map(( template, index) =>
                <option key={ "temOption" + index } value={ template[ 0 ] }>{ template[ 0 ] }</option>
            );
        }
        if ( this.state.add ) {
            add = (
                <div id="aside-new">
                    <div className="aside-new-box">
                        <span className="layout-fonts">Type:</span>
                        <select 
                            className="layout-fonts" 
                            value={ this.state.addType } 
                            onChange={ this.addType.bind( this ) }
                        >
                            <option disabled value="0">- Choose -</option>
                            <option value="Cover">Cover</option>
                            <option value="Index">Index</option>
                            <option value="Single">Single</option>
                            <option value="End">End</option>
                        </select>
                    </div>
                    <div className="aside-new-box">
                        <span className="layout-fonts">Template:</span>
                        <select 
                            className="layout-fonts" 
                            value={ this.state.addTemplate } 
                            onChange={ this.addTemplate.bind( this ) }
                        >
                            <option disabled value="0">- Choose -</option>
                            {temps}
                        </select>
                    </div>
                    <div className="aside-new-box">
                        <span className="layout-fonts">Title:</span>
                        <input 
                            className="layout-fonts" 
                            type="text" 
                            value={ this.state.addTitle } 
                            onChange={ this.addTitle.bind( this ) } 
                        />
                    </div>
                    <div className="aside-new-box">
                        <span className="layout-fonts">Desc:</span>
                        <textarea 
                            className="layout-fonts" 
                            value={ this.state.addDesc } 
                            onChange={ this.addDesc.bind( this ) }
                        >
                        </textarea>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <header id="header">
                </header>
                <aside id="aside">
                    <div id="aside-add" className="layout-fonts" onClick={ this.clickAdd.bind( this ) }>Add</div>
                    { add }
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