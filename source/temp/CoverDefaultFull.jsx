import React, { Component } from 'react';


class CoverDefaultFull extends Component {
    render() {
        let mainStyle = {
            height: "100vh"
        };
        let sectionStyle = {
            backgroundColor: "black",
            color: "white",
            width: "60%",
            right: 0,
            top: "50vh",
            minHeight: "18vh",
            borderRadius: "5px 0 0 5px",
            position: "absolute",
            padding: "10px 1%",
            textAlign: "center"
        };
        let titleStyle = {
            fontSize: this.props.theme.fonts[0],
            fontWeight: "bold"
        };
        let descStyle = {
            fontSize: this.props.theme.fonts[1]
        };
		return (
            <main id="main" style={mainStyle}>
                <section style={sectionStyle}>
                    <div style={titleStyle}>
                        {this.props.script[0]}
                    </div>
                    <div style={descStyle}>
                        {this.props.script[3]}
                    </div>
                </section>
            </main>
		);
	}
}


export default CoverDefaultFull;