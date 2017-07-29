import React, { Component } from 'react';

class SingleDefaultPic extends Component {
    render() {
        let mainStyle = {
            height: "81vh",
            paddingTop: "4vh",
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
            fontSize: this.props.theme.fontSize[ 1 ],
            fontFamily: this.props.theme.fontFamily,
            fontWeight: "bold",
            display: "inline-block",
            verticalAlign: "middle",
            color: "#600000"
        };
        let descStyle = {
            fontSize: this.props.theme.fontSize[ 2 ],
            fontFamily: this.props.theme.fontFamily,
            display: "inline-block",
            verticalAlign: "middle",
            marginLeft: "3%"
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
            backgroundImage: "url(../workspace/storage/" + this.props.script[ this.props.page ].image + ")",
            backgroundSize: "cover",
            verticalAlign: "middle"
        };
        let detailStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            marginLeft: "7%",
            width: "45%"
        };
        let liStyle = {
            margin: "20px 0",
            fontSize: this.props.theme.fontSize[ 2 ],
            fontFamily: this.props.theme.fontFamily
        };
        let details
        if ( this.props.script[ this.props.page ].detail.length > 0 ) {
            details = this.props.script[ this.props.page ].detail.map((detail, index) =>
                <li key={ "details" + index } style={ liStyle }>{ detail }</li>
            );
        } else {
            details = [
                <li style={ liStyle }>Details shows here</li>,
                <li style={ liStyle }>Details shows here</li>,
                <li style={ liStyle }>Details shows here</li>,
                <li style={ liStyle }>Details shows here</li>
            ];
        }
		return (
            <div id="content" style={ mainStyle }>
                <header style={ headerStyle }>
                    <div style={ titleStyle }>
                        { this.props.script[ this.props.page ].title || "Title shows here" }
                    </div>
                    <div style={ descStyle }>
                        { this.props.script[ this.props.page ].desc || "Description shows here" }
                    </div>
                </header>
                <div style={ lineStyle }></div>
                <section style={ sectionStyle }>
                    <div style={ imgStyle }></div>
                    <ul style={ detailStyle }>
                        { details }
                    </ul>
                </section>
            </div>
		);
	}
}


export default SingleDefaultPic;