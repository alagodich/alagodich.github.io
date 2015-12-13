var Carousel = React.createClass({
    componentDidMount() {
        $(this.refs.container.getDOMNode()).owlCarousel({
            loop: true,
            items: 1,
            margin: 0,
            nav: false,
            dots: false,
            lazyLoad: true,
            autoHeight: true
        });
    },
    renderItem(item) {
        if (typeof item === 'object') {
            // Render different kinds of items
            return '';
        }
        if (typeof item === 'string') {
            // Google photos id
            return <img
                className="owl-lazy ui image"
                data-src={'https://lh3.googleusercontent.com/' + item}
                alt=""
            />;
        }
        return '';
    },
    render() {
        var items = [];
        this.props.items.forEach(function (item) {
            items.push(this.renderItem(item));
        }.bind(this));
        return (
            <div className="ui blue piled segment">
                <div className="owl-carousel" ref="container">
                    {items}
                </div>
            </div>
        );
    }
});

module.exports = Carousel;