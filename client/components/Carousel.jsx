import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// TODO maybe use this instead
// https://github.com/express-labs/pure-react-carousel
// https://github.com/leandrowd/react-responsive-carousel
import Slider from 'react-slick';

const propTypes = {
    items: PropTypes.arrayOf(PropTypes.string)
};

class Carousel extends Component {
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
                    className="ui image"
                    src={`/images/${item}`}
                    alt=""
                />
            );
        }
        return '';
    }

    render() {
        const items = this.props.items.map((item, index) => this.renderItem(item, index));
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <div className="ui blue segment" style={{marginBottom: '1em', padding: 0}}>
                <Slider {...settings}>
                    {items}
                </Slider>
            </div>
        );
    }
}

Carousel.propTypes = propTypes;

export default Carousel;
