var Photo = React.createClass({
    googlePhotoUrl: 'https://lh3.googleusercontent.com/',
    render() {
        var src = this.googlePhotoUrl + this.props.id;
            //regexp = /=w([\d]+)-h([\d]+)/g,
            //matches = regexp.exec(this.props.id);

        // Adjust height
        //if (parseInt(matches[2]) > 700) {
        //    return (<img className="ui centered image" src={src} style={{height: 700, width: 'auto'}}/>);
        //}

        return (<img className="ui image" src={src} style={{'max-height': 1000, 'margin-bottom': '1em'}}/>);
    }
});

module.exports = Photo;
