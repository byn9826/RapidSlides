import React, {Component} from "react"
import ReactDOM from "react-dom";
class Slides extends Component {
    constructor(props) {
        super(props);
		this.state = {

		};
	}
    render() {
        return (
            <div id="react-root">
                123
            </div>
        );
    }
}
//load content
const data = JSON.parse(document.getElementById("data").innerHTML);
console.log(data);
ReactDOM.render(<Slides data={data} />, document.getElementById("root"));