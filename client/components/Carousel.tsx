import React, {ReactElement} from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// TODO maybe use this instead
// https://github.com/express-labs/pure-react-carousel
// https://github.com/leandrowd/react-responsive-carousel
import Slider from 'react-slick';

interface ICarouselProps {
    items: string[];
}

export const Carousel = (props: ICarouselProps): ReactElement => {
    const items = props.items.map((item, index) => (
        <img
            key={index}
            className="ui image"
            src={`/images/${item}`}
            alt=""
        />
    ));
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
};

export default Carousel;
