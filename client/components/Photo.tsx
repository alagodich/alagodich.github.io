import React, {ReactElement} from 'react';

interface IPhotoProps {
    src: string;
}

export const Photo = (props: IPhotoProps): ReactElement => {
    const src = `/images/${props.src}`;

    return (
        <img
            alt=""
            className="ui image"
            src={src}
            style={{maxHeight: 750, marginBottom: '1em'}}
        />
    );
};
