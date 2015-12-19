var MenuItem = React.createClass({
    render() {
        var item;
        if (this.props.current === this.props.url) {
            item = <span className="header">{this.props.title}</span>
        } else {
            item = <a className="header" href={this.props.url}>{this.props.title}</a>
        }
        return (
            <div className="item">{item}</div>
        );
    }
});

module.exports = MenuItem;