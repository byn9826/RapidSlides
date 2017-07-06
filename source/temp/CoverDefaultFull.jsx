import React, { Component } from 'react';


class CoverDefaultFull extends Component {
    render() {
        let mainStyle = {
            height: "100vh",
            backgroundImage: "url(./img/" + this.props.script[2] + ")",
            backgroundSize: "cover"
        };
        let sectionStyle = {
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
        let titleStyle = {
            fontSize: this.props.theme.fonts[0],
            fontWeight: "bold",
            margin: "8px 0"
        };
        let descStyle = {
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
            <main id="main" style={ mainStyle }>
                <section style={ sectionStyle }>
                    <div style={ titleStyle }>
                        { this.props.script[0] }
                    </div>
                    <div style={ descStyle }>
                        { content }
                    </div>
                </section>
            </main>
		);
	}
}


export default CoverDefaultFull;