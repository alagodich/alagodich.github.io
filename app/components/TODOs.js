var TODOs = React.createClass({
    render() {
        var header = 'TODOs',
            items = [];

        this.props.items.forEach(function (item) {
            items.push(
                <div className="item">
                    <i className="settings icon"></i>
                    <div className="content">
                        {item}
                    </div>
                </div>
            );
        });
        return (
            <div className="ui list">
                <div className="item header">{header}</div>
                {items}
            </div>
        );
    }
});

module.exports = TODOs;