import React, {ReactElement} from 'react';
import {Embed} from 'semantic-ui-react';

interface IYoutubeProps {
    id: string;
}

export const Youtube = (props: IYoutubeProps): ReactElement => (
    <Embed
        id={props.id}
        source="youtube"
        style={{marginBottom: '1em'}}
        autoplay={false}
        defaultActive
    />
);
