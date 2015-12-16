var Profile = React.createClass({
    render() {
        var items = [],
            images = [];
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
        this.props.avatar.forEach(function (imageUrl) {
            var className = images.length > 0 ? 'hidden content' : 'visible content';
            images.push(<img src={imageUrl} className={className}/>);
        });
        return (
            <div>
                <div className="ui card">
                    <div className="ui slide masked reveal image">
                        {images}
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