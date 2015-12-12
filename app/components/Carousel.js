var Carousel = React.createClass({
    componentDidMount() {
        $(this.refs.container.getDOMNode()).owlCarousel({
            loop: true,
            items: 1,
            margin: 10,
            nav: false,
            dots: true,
            //stagePadding: 50,
            lazyLoad:true,
            autoHeight: true,
            dotsEach: 1
        });
    },
    render() {
        var items = [];
        this.props.items.forEach(function (item) {
            items.push(<img
                className="owl-lazy ui rounded image"
                data-src={'https://lh3.googleusercontent.com/' + item}
                alt=""
            />);
        });
        return (
            <div>
                <div className="owl-carousel" ref="container">
                    {items}
                </div>
            </div>
        );
    }
});

module.exports = Carousel;