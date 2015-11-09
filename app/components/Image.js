var Image = React.createClass({
    render() {
        var src = 'https://lh3.googleusercontent.com/' + this.props.id;
        return (<img className="ui image" src={src}/>);
    }
});

module.exports = Image;
