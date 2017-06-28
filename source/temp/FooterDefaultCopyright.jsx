import React, { Component } from 'react';
class FooterDefaultCopyright extends Component {
    render() {
        let title = React.createElement(
                "h5", 
                {}, 
                "123"
            )
		return (
            <div>
                {title}
            </div>
		);
	}
}
export default FooterDefaultCopyright;