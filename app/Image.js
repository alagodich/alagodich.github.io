"use strict";

var Image = React.createClass({
    render() {
        return (
            <div className="react-image">
                <div className="ui embed" data-url={this.props.url}></div>
            </div>
        );
    }
});

module.exports = Image;
