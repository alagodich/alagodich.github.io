var Youtube = React.createClass({
    componentDidMount() {
        $(this.refs.youtubeContainer.getDOMNode()).embed({
            id: this.props.id,
            source: 'youtube',
            placeholder: '',
            autoplay: false
        });
    },
    render() {
        return (<div ref="youtubeContainer" className="ui embed"></div>);
    }
});

module.exports = Youtube;