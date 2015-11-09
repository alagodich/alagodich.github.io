var Profile = React.createClass({
    render() {
        var items = [];
        this.props.description.forEach(function(params) {
            var iconClass= params.icon + ' icon',
                content;
            if (typeof params.content.href !== 'undefined') {
                content = <a href={params.content.href} target="_blank">{params.content.text}</a>;
            } else {
                content = params.content;
            }
            items.push(
                <div className="item">
                    <i className={iconClass}></i>

                    <div className="content">
                        {content}
                    </div>
                </div>
            );
        });
        return (
            <div>
                <div className="ui card">
                    <div className="ui image">
                        <img src={this.props.avatar} className="ui image"/>
                    </div>
                    <div className="content">
                        <div className="header">
                            {this.props.name}
                        </div>
                        <div className="description">
                            <div className="ui list">
                                {items}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Profile;