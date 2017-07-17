import React, { Component } from 'react';

class FooterDefaultCopyright extends Component {
    render() {
        let rootStyle = {
            backgroundColor: this.props.theme.footer.background,
            color: this.props.theme.footer.color,
            fontSize: this.props.theme.fontSize[ 4 ],
            fontFamily: this.props.theme.fontFamily,
            textAlign: "left"
        };
		return (
            <footer id="footer" style={ rootStyle }>
                <div>{ this.props.theme.footer.title }</div>
            </footer>
		);
	}
}

export default FooterDefaultCopyright;