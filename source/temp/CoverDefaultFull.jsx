import React, { Component } from 'react';

class CoverDefaultFull extends Component {
    render() {
        const contentStyle = {
            height: "90vh",
            backgroundImage: "url(../static/img/" + this.props.script[ this.props.page ].image + ")",
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
            fontSize: this.props.theme.fontSize[ 0 ],
            fontFamily: this.props.theme.fontFamily,
            fontWeight: "bold",
            margin: "8px 0",
            display: "block"
        };
        const descStyle = {
            fontSize: this.props.theme.fontSize[ 2 ],
            fontFamily: this.props.theme.fontFamily,
            marginBottom: "5px",
            display: "block",
        };
        let content = [];
		return (
            <div id="content" style={ contentStyle }>
                <section style={ sectionStyle }>
                    <div style={ titleStyle }>
                        { this.props.script[ this.props.page ].title || "Title Shows Here" }
                    </div>
                    <div style={ descStyle }>
                        { this.props.script[ this.props.page ].desc || "Description Shows Here" }
                    </div>
                </section>
            </div>
		);
	}
}

export default CoverDefaultFull;