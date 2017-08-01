import React, { Component } from 'react';

class IndexDefaultHouse extends Component {
    constructor( props ) {
        super( props );
		this.state = {
            fullHeight: null,
            fullWidth: null
		};
    }
    componentDidMount() {
        this.setState({ 
            fullHeight: document.getElementById( "temp-main" ).offsetHeight,
            fullWidth: document.getElementById( "temp-main" ).offsetWidth
        });
    }
    render() {
        let mainStyle = {
            height: "85vh",
            backgroundColor: this.props.theme.background,
        };
        let headerStyle = {
            width: 0,
            height: 0,
            borderLeft: this.state.fullWidth * 0.45 + "px solid transparent",
            borderRight: this.state.fullWidth * 0.45 + "px solid transparent",
            borderBottom: 0.16 * this.state.fullHeight + "px solid #590808",
            position: "absolute",
            top: 0.08 * this.state.fullHeight + "px",
            left: "5%"
        };
        let titleStyle = {
            width: "100%",
            color: "white",
            textAlign: "center",
            fontSize: this.props.theme.fontSize[ 1 ],
            position: "absolute",
            top: 0.15 * this.state.fullHeight + "px"
        };
        let sectionStyle = {
            position: "absolute",
            width: "90%",
            left: "5%",
            top: 0.24 * this.state.fullHeight + "px"
        };
        let singleWidth;
        this.props.script[ this.props.page ].check.length !== 0 ?
            singleWidth = 100 / this.props.script[ this.props.page ].check.length : 
            singleWidth = 100 / 3;
        let holderStyle = {
            display: "inline-block",
            color: "white",
            width: singleWidth - 0.5 + "%",
            height: 0.55 * this.state.fullHeight + "px",
            margin: 0.05 * this.state.fullHeight + "px 0.25%",
            backgroundColor: "#ffe9bf",
            borderRadius: "5px"
        };
        let emptyStyle = {
            position: "relative",
            top: 0.08 * this.state.fullHeight + "px",
            left: "101%",
            width: 0,
            height: 0,
            borderTop: 0.04 * this.state.fullHeight + "px solid transparent",
            borderBottom: 0.04 * this.state.fullHeight + "px solid transparent",
            borderLeft: "40px solid" + this.props.theme.background,
            zIndex: "2"
        };
        let lineStyle = {
            display: "block",
            width: "100%",
            height: 0.08 * this.state.fullHeight + "px",
            zIndex: "1",
            backgroundColor: "#003b42",
            textAlign: "center",
            lineHeight: 0.08 * this.state.fullHeight + "px",
            fontSize: this.props.theme.fontSize[ 2 ],
            fontWeight: "bold"
        };
        let arrowStyle = {
            position: "relative",
            top: -0.08 * this.state.fullHeight + "px",
            left: "100%",
            width: 0,
            height: 0,
            borderTop: 0.04 * this.state.fullHeight + "px solid transparent",
            borderBottom: 0.04 * this.state.fullHeight + "px solid transparent",
            borderLeft: "40px solid #003b42",
            zIndex: "3"
        };
        let dictStyle = {
            position: "absolute",
            width: "90%",
            left: "5%",
            top: 0.53 * this.state.fullHeight + "px"
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
        let section = [], desc = [];
        if ( this.props.script[ this.props.page ].check.length !== 0 ) {
            this.props.script[ this.props.page ].check.forEach( ( a, i ) => {
                this.props.script.forEach( ( b ) => {
                    if ( b.title === a ) {
                        section.push(
                            <div key={ "content" + i } style={ holderStyle }>
                                <div style={ emptyStyle }></div>
                                <div style={ lineStyle }>
                                    { b.title }
                                </div>
                                <div style={ arrowStyle }></div>
                            </div>
                        );
                        desc.push(
                            <div key={ "info" + i } style={ descStyle }>
                                { b.desc }
                            </div>
                        )
                    }
                });
            });
        } else {
            section = [
                <div key="contenti1" style={ holderStyle }>
                    <div style={ emptyStyle }></div>
                    <div style={ lineStyle }>
                        1st key point
                    </div>
                    <div style={ arrowStyle }></div>
                </div>,
                <div key="contenti2" style={ holderStyle }>
                    <div style={ emptyStyle }></div>
                    <div style={ lineStyle }>
                        2nd key point
                    </div>
                    <div style={ arrowStyle }></div>
                </div>,
                <div key="contenti3" style={ holderStyle }>
                    <div style={ emptyStyle }></div>
                    <div style={ lineStyle }>
                        3rd key point
                    </div>
                    <div style={ arrowStyle }></div>
                </div>
            ];
            desc = [
                <div key="infoi1" style={ descStyle }>
                    1st desc shows here
                </div>,
                <div key="infoi2" style={ descStyle }>
                    2nd desc shows here
                </div>,
                <div key="infoi3" style={ descStyle }>
                    3rd desc shows here
                </div>
            ];
        }
		return (
            <div id="content" style={ mainStyle }>
                <div style={ headerStyle }></div>
                <div style={ titleStyle }>
                    { this.props.script[ this.props.page ].title || "Title shows here" }
                </div>
                <section style={ sectionStyle }>
                    { section }
                </section>
                <section style={ dictStyle }>
                    { desc }
                </section>
            </div>
		);
	}
}


export default IndexDefaultHouse;