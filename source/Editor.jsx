import React, { Component } from "react"
import ReactDOM from "react-dom";
import Build from "./build.js";
import Com from "./components.js";

class Editor extends Component {
    constructor( props ) {
        super( props );
		this.state = {
            //file content
            file: this.props.file,
            //default data for script and theme
            script: this.props.script,
            theme: this.props.theme,
            //store current page number
            page: 0,
            //transition animation
            trans: null,
            //status of add new slide
            add: false,
            addNum: this.props.script.length + 1,
            addType: 0,
            addTemplate: 0,
            addTitle: "",
            addDesc: "",
            addDetail: [],
            addWarn: null
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
        this.setState({ add: true, page: this.state.script.length + 1 });
    }
    //cancal add slide button
    cancelAdd() {
        this.setState({ 
            add: false, addType: 0, addTemplate: 0, addTitle: "", 
            addDesc: "", addDetail: "", page: 0, addWarn: null
        });
    }
    //confirm create new slide
    saveAdd() {
        if ( this.state.addType === 0 ) {
            this.setState({ addWarn: "Please choose Slide Type" });
        } else if ( this.state.addTemplate === 0 ) {
            this.setState({ addWarn: "Please choose Slide Template" });
        } else if ( this.state.addNum === "" ) {
            this.setState({ addWarn: "Please input slide number" });
        } else {
            let script = this.state.file.getElementById( "script" ).innerHTML;
            script = JSON.parse( script );
            script.push({
                "type": this.state.addType,
                "template": this.state.addTemplate,
                "title": this.state.addTitle,
                "desc": this.state.addDesc,
                "detail": this.state.addDetail
            });
            this.state.file.getElementById( "script" ).innerHTML = JSON.stringify( script );
            saveFile( this.props.loc, this.state.file );
            this.setState({
                add: false, addType: 0, addTemplate: 0, addTitle: "", 
                page: this.state.addNum - 1, script: script,
                addDesc: "", addDetail: "", addNum: script.length + 1, addWarn: null
            });
        }
        
    }
    //change page number of new added slide
    addNum( e ) {
        this.setState({ addNum: e.target.value });
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
        let content;
        if ( !this.state.add ) {
            content = Build.buildContent( this.state.theme, this.state.script, this.state.page );
        } else {
            content = Build.buildContent( 
                this.state.theme,
                [{
                    "type": this.state.addType,
                    "template": this.state.addTemplate,
                    "title": this.state.addTitle,
                    "desc": this.state.addDesc,
                    "detail": this.state.addDetail
                }],
                0
            );
        }
        //build footer for slides
        const footer = Build.buildFooter( this.state.theme, this.state.script, this.state.page );
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
                <div className="aside-slide-box">
                    <span className="layout-fonts">Detail:</span>
                    <ul className="layout-fonts">
                        {
                            slide.detail.map(( a, i ) =>
                                <li key={ "sl" + index + "de" + i} className="layout-fonts">{ a }</li>
                            )
                        }
                    </ul>
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
                        <span className="layout-fonts">Slide Num:</span>
                        <input 
                            className="layout-fonts" 
                            type="number" 
                            value={ this.state.addNum } 
                            onChange={ this.addNum.bind( this ) } 
                        />
                    </div>
                    <div className="aside-new-box">
                        <span className="layout-fonts">Type:</span>
                        <select 
                            className="layout-fonts" 
                            value={ this.state.addType } 
                            onChange={ this.addType.bind( this ) }
                        >
                            <option disabled value={ 0 }>- Choose -</option>
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
                            <option disabled value={ 0 }>- Choose -</option>
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
                        />
                    </div>
                    <div id="aside-warn" className="layout-fonts">{ this.state.addWarn }</div>
                    <input 
                        type="button" 
                        className="aside-new-button layout-fonts" 
                        value="Save"
                        onClick={ this.saveAdd.bind( this ) }
                    />
                    <input 
                        type="button"  
                        className="aside-new-button layout-fonts" 
                        value="Cancel" 
                        onClick={ this.cancelAdd.bind( this ) } 
                    />
                </div>
            );
        }
        return (
            <div>
                <header id="header">
                </header>
                <aside id="aside">
                    <div id="aside-add" className="layout-fonts" onClick={ this.clickAdd.bind( this ) }>
                        Add
                    </div>
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
                    { footer }
                </main>
            </div>
        );
    }
}

//load content
const theme = JSON.parse( document.getElementById( "theme" ).innerHTML );
const script = JSON.parse( document.getElementById( "script" ).innerHTML );
//load html
const fs = require( 'fs' );
const path = require( 'path' );
const loc = path.join( __dirname, '../workspace/slide.html' );
let file;
try {
    file = fs.readFileSync( loc, { encoding:'utf-8' } );
} catch( e ) { 
    alert( 'Failed to open the file !' ); 
}
file = new DOMParser().parseFromString( file, "text/html" );

ReactDOM.render( 
    <Editor script={ script } theme={ theme } file={ file } loc={ loc } />,
    document.getElementById( "root" ) 
);

function saveFile( loc, content ) {
    content = new XMLSerializer().serializeToString( content );
    try { 
        fs.writeFileSync( loc, content, 'utf-8' ); 
    } catch( e ) { 
        alert('Failed to save the file !'); 
    }
}