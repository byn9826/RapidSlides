import React, { Component } from 'react';


class FooterDefaultCopyright extends Component {
    render() {
        let font = parseInt(this.props.data.footer.title.font.replace("h", ""));
        font = this.props.data.fonts[font - 1];
        let rootStyle = {
            backgroundColor: this.props.data.footer.title.background,
            color: this.props.data.footer.title.color,
            fontSize: font + "px",
            textAlign: this.props.data.footer.title.position
        }
		return (
            <footer id="footer" style={rootStyle}>
                <div>{this.props.data.footer.title.content}</div>
            </footer>
		);
	}
}


export default FooterDefaultCopyright;