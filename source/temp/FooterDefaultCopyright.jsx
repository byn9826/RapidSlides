import React, { Component } from 'react';


class FooterDefaultCopyright extends Component {
    render() {
        let font = parseInt( this.props.theme.footer.title.font.replace( "h", "" ) );
        font = this.props.theme.fonts[ font - 1 ];
        let rootStyle = {
            backgroundColor: this.props.theme.footer.title.background,
            color: this.props.theme.footer.title.color,
            fontSize: font + "px",
            textAlign: this.props.theme.footer.title.position
        }
		return (
            <footer id="footer" style={rootStyle}>
                <div>{this.props.theme.footer.title.content}</div>
            </footer>
		);
	}
}


export default FooterDefaultCopyright;