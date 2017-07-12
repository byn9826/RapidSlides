import React, { Component } from 'react';


class ContentDefaultHouse extends Component {
    render() {
        let mainStyle = {
            height: "94vh",
            backgroundColor: this.props.theme.background,
        };
        let fullWidth = window.innerWidth;
        let headerStyle = {
            width: 0,
            height: 0,
            borderLeft: fullWidth * 0.45 + "px solid transparent",
            borderRight: fullWidth * 0.45 + "px solid transparent",
            borderBottom: "16vh solid #590808",
            position: "absolute",
            top: "8vh",
            left: "5%"
        };
        let titleStyle = {
            width: "100%",
            color: "white",
            textAlign: "center",
            fontSize: this.props.theme.fonts[1],
            position: "absolute",
            top: "15vh"
        };
        let sectionStyle = {
            position: "absolute",
            width: "90%",
            left: "5%",
            top: "24vh"
        };
        let singleWidth = 100 / ( this.props.script.length - 2 );
        let holderStyle = {
            display: "inline-block",
            color: "white",
            width: singleWidth - 0.5 + "%",
            height: "55vh",
            margin: "5vh 0.25%",
            backgroundColor: "#ffe9bf",
            borderRadius: "5px"
        };
        let emptyStyle = {
            position: "relative",
            top: "8vh",
            left: "101%",
            width: 0,
            height: 0,
            borderTop: "4vh solid transparent",
            borderBottom: "4vh solid transparent",
            borderLeft: "40px solid" + this.props.theme.background,
            zIndex: "2"
        };
        let lineStyle = {
            display: "block",
            width: "100%",
            height: "8vh",
            zIndex: "1",
            backgroundColor: "#003b42",
            textAlign: "center",
            lineHeight: "8vh",
            fontSize: this.props.theme.fonts[2],
            fontWeight: "bold"
        };
        let arrowStyle = {
            position: "relative",
            top: "-8vh",
            left: "100%",
            width: 0,
            height: 0,
            borderTop: "4vh solid transparent",
            borderBottom: "4vh solid transparent",
            borderLeft: "40px solid #003b42",
            zIndex: "3"
        };
        let dictStyle = {
            position: "absolute",
            width: "90%",
            left: "5%",
            top: "53vh"
        };
        let descStyle = {
            display: "inline-block",
            verticalAlign: "middle",
            backgroundColor: "#d9dbdd",
            width: singleWidth - 8 + "%",
            margin: "0 2%",
            padding: "15px 2%",
            color: "black",
            textAlign: "center",
            borderRadius: "5px"
        };
        let section = [], i, j, desc = [], info;
        for ( i = 2; i < this.props.script.length; i++ ) {
            section.push(
                <div key={ "content" + i } style={ holderStyle }>
                    <div style={ emptyStyle }></div>
                    <div style={ lineStyle }>
                        { this.props.script[ i ] }
                    </div>
                    <div style={ arrowStyle }></div>
                </div>
            );
            findDesc:
                for ( j = 0; j < this.props.data.length; j++ ) {
                    if ( this.props.data[ j ][ 0 ] === this.props.script[ i ] ) {
                        info = this.props.data[ j ][ 3 ];
                        break findDesc;
                    }
                }
            desc.push(
                <div key={ "info" + i } style={ descStyle }>
                    { info }
                </div>
            );
        }
		return (
            <main id="main" style={ mainStyle }>
                <div style={ headerStyle }></div>
                <div style={ titleStyle }>
                    { this.props.script[ 0 ] }
                </div>
                <section style={ sectionStyle }>
                    { section }
                </section>
                <section style={ dictStyle }>
                    { desc }
                </section>
            </main>
		);
	}
}


export default ContentDefaultHouse;