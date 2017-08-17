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
            mode: 0,
            export: false,
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
                    !this.state.full ? 
                        this.setState({ trans: "left", page: this.state.page - 1 }) :
                        this.setState({ trans: "fullLeft", page: this.state.page - 1 });
                }
            } else if ( code === 39 ) {
                if ( this.state.page !== ( this.state.script.length - 1 ) ) {
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
        if ( this.state.add || this.state.editPage ) {
            forceAdd();
        } else {
            this.setState({ trans: "down", page: index });
        }
    }
    //click add slide button
    clickAdd() {
        if ( !this.state.editPage ) {
            this.setState({ add: true, page: this.state.script.length + 1, confirmDelete: null });
        } else {
            forceAdd();
        }
    }
    //cancal add slide button
    cancelAdd() {
        this.setState({ 
            add: false, addType: 0, addTemplate: 0, addTitle: "", addCheck: [],
            addDesc: "", addDetail: "", page: 0, addWarn: null, addFile: null
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
                add: false, addType: 0, addTemplate: 0, addTitle: "", addCheck: [], addDesc: "", 
                addDetail: [], addFile: null, page: this.state.addNum - 1, addNum: script.length + 1, 
                addWarn: null
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
        if ( !this.state.add && !this.state.editPage ) {
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
    //click edit slide
    clickEdit( i ) {
        if ( !this.state.add && this.state.editPage === null ) {
            this.setState({ 
                confirmDelete: null, editPage: i, changePage: i + 1,
                addType: this.state.script[ i ].type, addTemplate: this.state.script[ i ].template,
                addCheck: this.state.script[ i ].check, addTitle: this.state.script[ i ].title, 
                addDesc: this.state.script[ i ].desc, addFile: this.state.script[ i ].image, 
                addDetail: this.state.script[ i ].detail
            });
        } else {
            forceAdd();
        }
    }
    //cancel edit
    cancelEdit() {
        this.setState({
            editPage: null, changePage: null, addType: 0, addTemplate: 0, addCheck: [], addTitle: "",
            addDesc: "", addDetail: "", addFile: null
        });
    }
    //change page number
    changePage( e ) {
        this.setState({ changePage: e.target.value });
    }
    //confirm edit slide
    saveEdit() {
        if ( this.state.addType === 0 ) {
            this.setState({ addWarn: "Please choose Slide Type" });
        } else if ( this.state.addTemplate === 0 ) {
            this.setState({ addWarn: "Please choose Slide Template" });
        } else if ( this.state.addNum === ""  ) {
            this.setState({ addWarn: "Please input slide number" });
        } else {
            this.state.script.splice( this.state.editPage, 1);
            this.state.script.splice( this.state.changePage - 1, 0, {
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
                add: false, addType: 0, addTemplate: 0, addTitle: "", addCheck: [], addDesc: "", 
                addDetail: [], addFile: null, page: this.state.changePage - 1, 
                addWarn: null, editPage: null, changePage: null
            });
        }
    }
    //change editor mode
    changeMode() {
        this.state.mode === 0 ? this.setState({ mode: 1 }) : this.setState({ mode: 0 });
    }
    //change theme font family
    themeFont( e ) {
        this.state.theme.fontFamily = e.target.value;
        this.state.file.getElementById( "theme" ).innerHTML = JSON.stringify( this.state.theme );
        saveFile( this.props.loc, this.state.file );
        this.setState({ theme: this.state.theme });
    }
    //change theme footer
    themeFooter( e ) {
        this.state.theme.footer.template = e.target.value;
        this.state.file.getElementById( "theme" ).innerHTML = JSON.stringify( this.state.theme );
        saveFile( this.props.loc, this.state.file );
        this.setState({ theme: this.state.theme });
    }
    //change theme title
    themeTitle( e ) {
        this.state.theme.footer.title = e.target.value;
        this.state.file.getElementById( "theme" ).innerHTML = JSON.stringify( this.state.theme );
        saveFile( this.props.loc, this.state.file );
        this.setState({ theme: this.state.theme });
    }
    //full screen or not
    themeFull() {
        this.setState({ full: !this.state.full, trans: null });
    }
    //show export board
    themeExport() {
        dialog.showSaveDialog({
            title:"Save as single HTML file",
            defaultPath: document.getElementsByTagName("title")[0].innerHTML + ".html",
            properties: ["openDirectory"],
            filters: [
                {name: 'HTML', extensions: ['html']},
            ]
        }, ( newFile ) => {
            let content = new XMLSerializer().serializeToString( this.state.file );
            fs.writeFileSync( newFile, content, 'utf-8' ); 
        });
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
        if ( !this.state.add && this.state.editPage === null ) {
            //normal display
            content = Build.buildContent( 
                this.state.theme, this.state.script, this.state.page, this.state.full
            );
            footer = Build.buildFooter( this.state.theme, this.state.script, this.state.page );
        } else {
            //display add new preview
            temporary = {
                "type": this.state.addType,
                "template": this.state.addTemplate,
                "check": this.state.addCheck,
                "title": this.state.addTitle,
                "desc": this.state.addDesc,
                "image": this.state.addFile,
                "detail": this.state.addDetail
            };
            if ( this.state.add ) {
                //add new preview
                temporary = [ temporary ].concat( this.state.script );
                content = Build.buildContent( this.state.theme, temporary, 0, this.state.full );
                footer = Build.buildFooter( this.state.theme, temporary, 0 );
            } else if ( this.state.editPage >= 0 ) {
                let orig = this.state.script.slice();
                orig.splice( this.state.editPage, 1, temporary);
                content = Build.buildContent( 
                    this.state.theme, orig, this.state.editPage, this.state.full
                );
                footer = Build.buildFooter( this.state.theme, orig, this.state.editPage );
            }
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
                                        slide.detail.map(( a, i ) =>
                                            <li 
                                                key={ "sl" + index + "de" + i } 
                                                className="layout-fonts"
                                            >
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
                        {
                            this.state.mode === 0 ? (
                                <input 
                                    type="button" className="aside-slide-button layout-fonts" 
                                    value="Edit" onClick={ this.clickEdit.bind( this, index ) }
                                />
                            ) : null
                        }
                        {
                            this.state.mode === 0 ? (
                                <input 
                                    type="button" className="aside-slide-button layout-fonts" 
                                    value="Delete" onClick={ this.slideDelete.bind( this, index ) }
                                />
                            ) : null
                        }
                    </div>
                    {
                        this.state.confirmDelete === index ?
                        (
                            <div id="aside-slide-delete">
                                <span className="layout-fonts">
                                    Are you really want to delete this slide?
                                </span>
                                <input 
                                    type="button" className="layout-fonts" value="Cancel"
                                    onClick={ this.stopDelete.bind( this ) }
                                />
                                <input 
                                    type="button" className="layout-fonts" value="Confirm"
                                    onClick={ this.confirmDelete.bind( this ) }
                                />
                            </div>
                        ) : null
                    }
                </div>
            ) : (
                <div key={ "changeSlide" + index }  className="aside-new">
                    <div className="aside-new-box">
                        <span className="layout-fonts">Slide Num:</span>
                        <input 
                            className="layout-fonts" type="number" value={ this.state.changePage }
                            onChange={ this.changePage.bind( this ) } 
                        />
                    </div>
                    <div className="aside-new-box">
                        <span className="layout-fonts">Type:</span>
                        <select 
                            className="layout-fonts" value={ this.state.addType } 
                            onChange={ this.addType.bind( this ) }
                        >
                            <option disabled value={ 0 }>- Choose -</option>
                            <option value="Cover">Cover</option>
                            <option value="Index">Index</option>
                            <option value="Single">Single</option>
                            <option value="End">End</option>
                        </select>
                    </div>
                    <div className="aside-new-box aside-slide-template">
                        <span className="layout-fonts">Template:</span>
                        <select 
                            className="layout-fonts" value={ this.state.addTemplate } 
                            onChange={ this.addTemplate.bind( this ) }
                        >
                            <option disabled value={ 0 }>- Choose -</option>
                            {
                                Object.entries( Com[ this.state.addType ] ).map( ( template, index) =>
                                    <option key={ "temOption" + index } value={ template[ 0 ] }>
                                        { template[ 0 ] }
                                    </option>
                                )
                            }
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
                                                    type="checkbox" value={ s.title }
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
                            className="layout-fonts" type="text" value={ this.state.addTitle } 
                            onChange={ this.addTitle.bind( this ) } 
                        />
                    </div>
                    {
                        !Com.Ban[ this.state.addType + this.state.addTemplate ] ||
                        Com.Ban[ this.state.addType + this.state.addTemplate ].indexOf( "Desc" ) === -1 ? (
                            <div className="aside-new-box">
                                <span className="layout-fonts">Desc:</span>
                                <textarea 
                                    className="layout-fonts" value={ this.state.addDesc } 
                                    onChange={ this.addDesc.bind( this ) }
                                />
                            </div>
                        ): null
                    }
                    {
                        !Com.Ban[ this.state.addType + this.state.addTemplate ] ||
                        Com.Ban[ this.state.addType + this.state.addTemplate ].indexOf( "Image" ) === -1 ? (
                            <div className="aside-new-box">
                                <span className="layout-fonts">Edit Image:</span>
                                <input 
                                    id="file-picker" className="layout-fonts" type="file" 
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
                        ( ( this.state.addType !== "Index" ) && 
                          ( !Com.Ban[ this.state.addType + this.state.addTemplate ] || Com.Ban[ this.state.addType + this.state.addTemplate ].indexOf( "Detail" ) === -1 ) 
                        ) ? (
                            <div className="aside-new-box">
                                <span className="layout-fonts">
                                    Details: Separate by ";"
                                </span>
                                <textarea 
                                    className="layout-fonts" value={ this.state.addDetail } 
                                    onChange={ this.addDetail.bind( this ) }
                                />
                            </div>
                        ): null
                    }
                    <div id="aside-warn" className="layout-fonts">{ this.state.addWarn }</div>
                    <input 
                        type="button" className="aside-new-button layout-fonts" value="Save"
                        onClick={ this.saveEdit.bind( this ) }
                    />
                    <input 
                        type="button" className="aside-new-button layout-fonts" value="Cancel" 
                        onClick={ this.cancelEdit.bind( this ) } 
                    />
                </div>
            )
        );
        //show new slide editor
        let add;
        let templates, temps;
        if ( Com[ this.state.addType ] ) {
            templates = Object.entries( Com[ this.state.addType ] );
            temps = templates.map( ( template, index) =>
                <option key={ "temOption" + index } value={ template[ 0 ] }>{ template[ 0 ] }</option>
            );
        }
        if ( this.state.add ) {
            let ban;
            if ( Com.Ban[ this.state.addType + this.state.addTemplate ] ) {
                ban = Com.Ban[ this.state.addType + this.state.addTemplate ];
            }
            add = (
                <div className="aside-new">
                    <div className="aside-new-box">
                        <span className="layout-fonts">Slide Num:</span>
                        <input 
                            className="layout-fonts" type="number" value={ this.state.addNum }
                            onChange={ this.addNum.bind( this ) } 
                        />
                    </div>
                    <div className="aside-new-box">
                        <span className="layout-fonts">Type:</span>
                        <select 
                            className="layout-fonts" value={ this.state.addType } 
                            onChange={ this.addType.bind( this ) }
                        >
                            <option disabled value={ 0 }>- Choose -</option>
                            <option value="Cover">Cover</option>
                            <option value="Index">Index</option>
                            <option value="Single">Single</option>
                            <option value="End">End</option>
                        </select>
                    </div>
                    <div className="aside-new-box aside-slide-template">
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
                                                    type="checkbox" value={ s.title }
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
                            className="layout-fonts" type="text" value={ this.state.addTitle } 
                            onChange={ this.addTitle.bind( this ) } 
                        />
                    </div>
                    {
                        !ban || ban.indexOf( "Desc" ) === -1 ? (
                            <div className="aside-new-box">
                                <span className="layout-fonts">Desc:</span>
                                <textarea 
                                    className="layout-fonts" value={ this.state.addDesc } 
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
                                    id="file-picker" className="layout-fonts" type="file" 
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
                                    className="layout-fonts" value={ this.state.addDetail } 
                                    onChange={ this.addDetail.bind( this ) }
                                />
                            </div>
                        ): null
                    }
                    <div id="aside-warn" className="layout-fonts">{ this.state.addWarn }</div>
                    <input 
                        type="button" className="aside-new-button layout-fonts" 
                        value="Save"
                        onClick={ this.saveAdd.bind( this ) }
                    />
                    <input 
                        type="button" className="aside-new-button layout-fonts" 
                        value="Cancel" 
                        onClick={ this.cancelAdd.bind( this ) } 
                    />
                </div>
            );
        }
        //provide options for theme font styles
        const fontFamily = Resource.FontsList.map( ( f, i ) =>
            <option key={ "fontFamily" + i } style={ { "fontFamily": f } }>{ f }</option>
        );
        //provide options for theme footer template
        const footTemps = Object.entries( Com[ "Footer" ] ).map( ( temp, index) =>
            <option key={ "footOption" + index } value={ temp[ 0 ] }>{ temp[ 0 ] }</option>
        );
        return (
            <div>
                {
                    !this.state.full ? (
                        <header id="header">
                            {
                                this.state.mode === 0 ? (
                                    <section id="header-theme">
                                        <header className="layout-fonts">Font</header>
                                        <select 
                                            value={ this.state.theme.fontFamily } 
                                            onChange={ this.themeFont.bind( this ) }
                                        >
                                            { fontFamily }
                                        </select>
                                    </section>
                                ) : null
                            }
                            {
                                this.state.mode === 0 ? (
                                    <section id="header-footer">
                                        <header className="layout-fonts">Footer</header>
                                        <select 
                                            value={ this.state.theme.footer.template } 
                                            onChange={ this.themeFooter.bind( this ) }
                                        >
                                            <option key={ "footOptionNull" } value={ null }>Empty</option>
                                            { footTemps }
                                        </select>
                                        {
                                            this.state.theme.footer.template !== "Empty" ? (
                                                <input 
                                                    type="text" value={ this.state.theme.footer.title } 
                                                    onChange={ this.themeTitle.bind( this ) }
                                                    placeholder="Content for Footer"
                                                />
                                            ) : null
                                        }
                                    </section>
                                ) : null
                            }
                            {
                                this.state.mode === 0 ? (
                                    <section id="header-export" onClick={ this.themeExport.bind( this ) }>
                                        Export
                                    </section>
                                ) : null
                            }
                            <section id="header-full" onClick={ this.themeFull.bind( this ) }>
                                Full
                                Screen
                            </section>
                            <section id="header-arrow">
                                <header className="layout-fonts">Move</header>
                                <div onClick={ this.pageLeft.bind( this ) }>&#9198;</div>
                                <div onClick={ this.pageRight.bind( this ) }>&#9197;</div>
                            </section>
                            <label id="header-mode" className="switch-light switch-candy switch-candy-blue">
                                <input 
                                    type="checkbox" value={ this.state.mode } 
                                    onClick={ this.changeMode.bind( this ) } 
                                />
                                <strong className="layout-fonts">Mode</strong>
                                <span>
                                    <span className="layout-fonts">
                                        Edit
                                    </span>
                                    <span className="layout-fonts">
                                        Display
                                    </span>
                                    <a></a>
                                </span>
                            </label>
                        </header>
                    ) : null
                }
                {
                    !this.state.full ? (
                        <aside id="aside">
                            {
                                this.state.mode === 0 ? (
                                    <div 
                                        id="aside-add" className="layout-fonts" 
                                        onClick={ this.clickAdd.bind( this ) }
                                    >
                                        Add
                                    </div>
                                ) : null
                            }
                            { add }
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
                            Editor
                            View
                        </span>
                    ) : null
                }
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
const { dialog } = require('electron').remote;

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
    alert( "Please finish add or edit slide first" );
}