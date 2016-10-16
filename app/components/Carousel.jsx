import React, {PropTypes, Component} from 'react';

const propTypes = {
        items: PropTypes.array.isRequired
    },
    googlePhotoUrl = 'https://lh3.googleusercontent.com/';

/**
 * Carousel powered by http://kenwheeler.github.io/slick/
 * @github https://github.com/kenwheeler/slick/
 */
class Carousel extends Component {

    componentDidMount() {
        $(this.container).slick({
            adaptiveHeight: true,
            arrows: false,
            dots: true,
            lazyLoad: 'progressive'
            // mobileFirst: true
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
                    className="ui image"
                    src={googlePhotoUrl + item}
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
                <div ref={c => (this.container = c)}>
                    {items}
                </div>
            </div>
        );
    }

}

Carousel.propTypes = propTypes;

export default Carousel;
