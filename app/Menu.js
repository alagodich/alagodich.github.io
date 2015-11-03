var MenuItem = require('./MenuItem'),
    Menu = React.createClass({
        render() {
            var items = [],
                current = this.props.current;
            this.props.items.forEach(function (item) {
                items.push(<MenuItem title={item.title} url={item.url} current={current}></MenuItem>);
            });
            return (
                <div className="ui text menu" >
                    {items}
                </div>
            );
        }
    });

module.exports = Menu;