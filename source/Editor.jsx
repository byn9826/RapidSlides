import React, { Component } from "react"
import ReactDOM from "react-dom";


class Editor extends Component {
    constructor( props ) {
        super( props );
		this.state = {
		};
	}
    render () {
        return (
            <div>
                <header id="header">
                    <div id="header-present">
                        <img alt="Present" src="./static/img/present.png" />
                        <h6>Present</h6>
                    </div>
                </header>
            </div>
        );
    }
}


ReactDOM.render( <Editor />, document.getElementById( "root" ) );