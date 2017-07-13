import React, { Component } from 'react';

class CoverDefaultFull extends Component {
    render() {
        const contentStyle = {
            height: "100vh",
            backgroundImage: "url(./img/" + this.props.script[2] + ")",
            backgroundSize: "cover"
        };
        const sectionStyle = {
            backgroundColor: "black",
            color: "white",
            width: "60%",
            right: 0,
            top: "45vh",
            minHeight: "18vh",
            borderRadius: "5px 0 0 5px",
            position: "absolute",
            padding: "10px 1%",
            textAlign: "center"
        };
        const titleStyle = {
            fontSize: this.props.theme.fonts[0],
            fontWeight: "bold",
            margin: "8px 0"
        };
        const descStyle = {
            fontSize: this.props.theme.fonts[1],
            marginBottom: "5px"
        };
        let content = [];
        for ( let i = 3; i < this.props.script.length; i++ ) {
            content.push( 
                <p key={ this.props.script[1] + i }>
                    { this.props.script[i] }
                </p> 
            );
        }
		return (
            <div id="content" style={ contentStyle }>
                <section style={ sectionStyle }>
                    <div style={ titleStyle }>
                        { this.props.script[0] }
                    </div>
                    <div style={ descStyle }>
                        { content }
                    </div>
                </section>
            </div>
		);
	}
}

export default CoverDefaultFull;