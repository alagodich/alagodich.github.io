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
        return (<div ref="youtubeContainer" className="ui embed" style={{'margin-bottom': '1em'}}></div>);
    }
});

module.exports = Youtube;