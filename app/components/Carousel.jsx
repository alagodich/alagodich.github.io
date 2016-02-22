import React, {PropTypes, Component} from 'react';

const propTypes = {
        items: PropTypes.array.isRequired
    },
    googlePhotoUrl = 'https://lh3.googleusercontent.com/';

/**
 * Note that $.fn.owlCarousel is being exposed in the vendor.js, in wepbpack config
 * Along woth owl css
 */
class Carousel extends Component {

    componentDidMount() {
        $(this.component).owlCarousel({
            loop: true,
            items: 1,
            margin: 0,
            nav: false,
            dots: false,
            lazyLoad: true,
            center: true,
            autoHeight: true
        });
    }

    renderItem(item, index) {
        if (typeof item === 'object') {
            // Render different kinds of items
            return '';
        }
        if (typeof item === 'string') {
            // Google photos id
            return (
                <img
                    key={index}
                    className="owl-lazy ui image"
                    data-src={googlePhotoUrl + item}
                    alt=""
                />
            );
        }
        return '';
    }

    render() {
        const items = this.props.items.map((item, index) => this.renderItem(item, index));
        return (
            <div className="ui blue segment" style={{marginBottom: '1em'}}>
                <div className="owl-carousel" ref={c => this.component = c}>
                    {items}
                </div>
            </div>
        );
    }

}

Carousel.propTypes = propTypes;

export default Carousel;
