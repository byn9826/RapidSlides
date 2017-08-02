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
            addCheck: [],
            addDesc: "",
            addFile: null,
            addDetail: [],
            addWarn: null,
            //confirm delete slide
            confirmDelete: null,
            //status of edit slide
            editPage: null
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
    //click slide on side bar
    clickSlide( index ) {
        if ( this.state.add ) {
            forceAdd();
        } else {
            this.setState({ trans: "down", page: index });
        }
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
        } else if ( this.state.addNum === ""  ) {
            this.setState({ addWarn: "Please input slide number" });
        } else {
            this.state.script.splice( this.state.addNum - 1, 0, {
                "type": this.state.addType,
                "template": this.state.addTemplate,
                "title": this.state.addTitle,
                "check": this.state.addCheck,
                "desc": this.state.addDesc,
                "image": this.state.addFile,
                "detail": this.state.addDetail.length > 0? this.state.addDetail.split( ";" ): [],
            });
            this.state.file.getElementById( "script" ).innerHTML = JSON.stringify( this.state.script );
            saveFile( this.props.loc, this.state.file );
            this.setState({
                add: false, addType: 0, addTemplate: 0, addTitle: "", addDesc: "", addDetail: [], 
                addFile: null, page: this.state.addNum - 1, addNum: script.length + 1, addWarn: null
            });
        }
    }
    //change page number of new added slide
    addNum( e ) {
        if ( parseInt( e.target.value ) === 0 ) {
            this.setState({ addNum: 1 });
        } else if ( parseInt( e.target.value ) > this.state.script.length + 1 ) {
            this.setState({ addNum: this.state.script.length + 1 });
        } else {
            this.setState({ addNum: parseInt( e.target.value ) });
        }
    }
    //change type of new added slide
    addType( e ) {
        this.setState({ addType: e.target.value });
    }
    //change template of new added slide
    addTemplate( e ) {
        this.setState({ addTemplate: e.target.value });
    }
    //change checked single pages for index template
    addCheck( e ) {
        if ( this.state.addCheck.indexOf( e.target.value ) === -1 ) {
            this.state.addCheck.push( e.target.value );
        } else {
            this.state.addCheck.splice( this.state.addCheck.indexOf( e.target.value ), 1 );
        }
        this.setState({ addCheck: this.state.addCheck });
    }
    //change content of new title
    addTitle( e ) {
        this.setState({ addTitle: e.target.value });
    }
    //change content of new desc
    addDesc( e ) {
        this.setState({ addDesc: e.target.value });
    }
    //change file
    addFile( e ) {
        let newFile = document.getElementById( "file-picker" ).files[ 0 ].path.split( "." ).pop();
        newFile = new Date().getTime() + "." + newFile;
        copyFile( this.props.storage + newFile, document.getElementById( "file-picker" ).files[ 0 ].path );
        this.setState({ addFile: newFile });
    }
    //change content of new detail
    addDetail( e ) {
        this.setState({ addDetail: e.target.value });
    }
    //delete a slide
    slideDelete( k ) {
        if ( !this.state.add ) {
            this.setState({ confirmDelete: k, page: k });
        } else {
            forceAdd();
        }
    }
    //cancel delete a slide
    stopDelete() {
        this.setState({ confirmDelete: null });
    }
    //confirm delete a slide
    confirmDelete() {
        this.state.script.splice( this.state.confirmDelete, 1 );
        this.state.file.getElementById( "script" ).innerHTML = JSON.stringify( this.state.script );
        saveFile( this.props.loc, this.state.file );
        this.setState({ page: 0, confirmDelete: null, addNum: this.state.script.length + 1 });
    }
    render() {
        const mainStyle = {
            position: "absolute",
            left: "20%",
            width: "80%",
            top: "10vh",
            height: "90vh"
        };
        //build main, footer for slides
        let content, footer, temporary;
        if ( !this.state.add ) {
            content = Build.buildContent( this.state.theme, this.state.script, this.state.page );
            footer = Build.buildFooter( this.state.theme, this.state.script, this.state.page );
        } else {
            temporary = [{
                "type": this.state.addType,
                "template": this.state.addTemplate,
                "check": this.state.addCheck,
                "title": this.state.addTitle,
                "desc": this.state.addDesc,
                "image": this.state.addFile,
                "detail": this.state.addDetail.length > 0? this.state.addDetail.split( ";" ) : []
            }];
            temporary = temporary.concat( this.state.script );
            content = Build.buildContent( this.state.theme, temporary, 0 );
            footer = Build.buildFooter( this.state.theme, temporary, 0 );
        }
        //generate editor for slides
        let slides = this.state.script.map( ( slide, index ) =>
            index !== this.state.editPage ? (
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
                    <div className="aside-slide-box">
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
                                        slide.detail.map(( a, i ) =>
                                            <li key={ "sl" + index + "de" + i } className="layout-fonts">
                                                { a }
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        ) : null
                    }
                    <div className="aside-slide-line">
                        <div className="aside-slide-num layout-fonts">Slide { index + 1 }</div>
                        <input 
                            type="button" 
                            className="aside-slide-button layout-fonts" 
                            value="Edit"
                        />
                        <input 
                            type="button"  
                            className="aside-slide-button layout-fonts" 
                            value="Delete"
                            onClick={ this.slideDelete.bind( this, index ) }
                        />
                    </div>
                    {
                        this.state.confirmDelete === index ?
                        (
                            <div id="aside-slide-delete">
                                <span className="layout-fonts">
                                    Are you really want to delete this slide?
                                </span>
                                <input 
                                    type="button"  
                                    className="layout-fonts" 
                                    value="Cancel"
                                    onClick={ this.stopDelete.bind( this ) }
                                />
                                <input 
                                    type="button"  
                                    className="layout-fonts" 
                                    value="Confirm"
                                    onClick={ this.confirmDelete.bind( this ) }
                                />
                            </div>
                        ) : null
                    }
                </div>
            ) : (
                123
            )
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
            let ban;
            if ( Com.Ban[ this.state.addType + this.state.addTemplate ] ) {
                ban = Com.Ban[ this.state.addType + this.state.addTemplate ];
            }
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
                    {
                        this.state.addType === "Index" ? (
                            <div className="aside-new-box">
                                <span id="aside-new-box-check" className="layout-fonts">
                                    {
                                        this.state.addCheck.length !== 0 ? 
                                            "Link with Single pages:" : 
                                            "Please create single pages first"
                                    }
                                </span>
                                {
                                    this.state.script.map( ( s ) => 
                                        s.type === "Single" ? (
                                            <label key={ "addcheck" + s.title }>
                                                <input 
                                                    type="checkbox"
                                                    value={ s.title }
                                                    onChange={ this.addCheck.bind( this ) } 
                                                />
                                                { s.title }
                                            </label>
                                        ): null
                                    )
                                }
                            </div>
                        ): null
                    }
                    <div className="aside-new-box">
                        <span className="layout-fonts">Title:</span>
                        <input 
                            className="layout-fonts" 
                            type="text" 
                            value={ this.state.addTitle } 
                            onChange={ this.addTitle.bind( this ) } 
                        />
                    </div>
                    {
                        !ban || ban.indexOf( "Desc" ) === -1 ? (
                            <div className="aside-new-box">
                                <span className="layout-fonts">Desc:</span>
                                <textarea 
                                    className="layout-fonts" 
                                    value={ this.state.addDesc } 
                                    onChange={ this.addDesc.bind( this ) }
                                />
                            </div>
                        ): null
                    }
                    {
                        !ban || ban.indexOf( "Image" ) === -1 ? (
                            <div className="aside-new-box">
                                <span className="layout-fonts">Image:</span>
                                <input 
                                    id="file-picker"
                                    className="layout-fonts" 
                                    type="file" 
                                    onChange={ this.addFile.bind( this ) }
                                />
                            </div>
                        ): null
                    }
                    {
                        this.state.addFile ? (
                            <img src={ "../workspace/storage/" + this.state.addFile } />
                        ): null
                    }
                    {
                        ( ( this.state.addType !== "Index" ) && ( !ban || ban.indexOf( "Detail" ) === -1 ) ) ? (
                            <div className="aside-new-box">
                                <span className="layout-fonts">
                                    Details: Separate by ";"
                                </span>
                                <textarea 
                                    className="layout-fonts" 
                                    value={ this.state.addDetail } 
                                    onChange={ this.addDetail.bind( this ) }
                                />
                            </div>
                        ): null
                    }
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
                    id="temp-main" 
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
const storage = path.join( __dirname, '../workspace/storage/' );

let file;
try {
    file = fs.readFileSync( loc, { encoding:'utf-8' } );
} catch( e ) { 
    alert( 'Failed to open the file !' ); 
}
file = new DOMParser().parseFromString( file, "text/html" );

ReactDOM.render( 
    <Editor script={ script } theme={ theme } file={ file } loc={ loc } storage={ storage } />,
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

function copyFile( loc, file ) {
    try { 
        fs.writeFileSync( loc, fs.readFileSync( file ) ); 
    } catch( e ) { 
        alert('Failed to copy the file !'); 
    }
}

function forceAdd() {
    alert( "Please finish edit new slide first" );
}