import React, { Component } from 'react';


class SingleDefaultPic extends Component {
    render() {
        let mainStyle = {
            height: "89vh",
            paddingTop: "5vh",
            backgroundColor: this.props.theme.background,
            paddingLeft: "4%",
            paddingRight: "4%",
            width: "92% !important"
        };
        let headerStyle = {
            display: "block",
            borderLeft: "6px solid #600000",
            paddingLeft: "1.5%"
        };
        let titleStyle = {
            fontSize: this.props.theme.fonts[ 0 ],
            fontWeight: "bold",
            display: "inline-block",
            verticalAlign: "middle",
            color: "#600000"
        };
        let descStyle = {
            fontSize: this.props.theme.fonts[ 1 ],
            display: "inline-block",
            verticalAlign: "middle",
            marginLeft: "6%"
        };
        let lineStyle = {
            display: "block",
            width: "92%",
            borderTop: "2px solid black",
            marginTop: "10px",
            height: "3px",
            borderBottom: "1px solid black"
        };
        let sectionStyle = {
            display: "block",
            marginTop: "10vh"
        };
        let imgStyle = {
            display: "inline-block",
            width: "35%",
            height: "50vh",
            backgroundImage: "url(./img/" + this.props.script[2] + ")",
            backgroundSize: "cover",
            verticalAlign: "middle"
        };
        let detailStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            marginLeft: "5%",
            width: "45%"
        };
        let liStyle = {
            margin: "20px 0",
            fontSize: this.props.theme.fonts[2],
        };
        let details = [];
        for ( let i = 4; i < this.props.script.length; i++ ) {
            details.push(
                <li key={ "details" + i } style={ liStyle }>{ this.props.script[i] }</li>
            );
        }
		return (
            <main id="main" style={ mainStyle }>
                <header style={ headerStyle }>
                    <div style={ titleStyle }>
                        { this.props.script[ 0 ] }
                    </div>
                    <div style={ descStyle }>
                        { this.props.script[ 3 ] }
                    </div>
                </header>
                <div style={ lineStyle }></div>
                <section style={ sectionStyle }>
                    <div style={ imgStyle }></div>
                    <ul style={ detailStyle }>
                        { details }
                    </ul>
                </section>
            </main>
		);
	}
}


export default SingleDefaultPic;