var Image = React.createClass({
    render() {
        var src = 'https://lh3.googleusercontent.com/' + this.props.id;
            //regexp = /=w([\d]+)-h([\d]+)/g,
            //matches = regexp.exec(this.props.id);

        // Adjust height
        //if (parseInt(matches[2]) > 700) {
        //    return (<img className="ui centered image" src={src} style={{height: 700, width: 'auto'}}/>);
        //}

        return (<img className="ui centered image" src={src}/>);
    }
});

module.exports = Image;
