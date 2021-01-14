import React, {ReactElement} from 'react';

interface IProfileProps {
    name: string;
    avatar: string[];
    description: Array<{
        content: { href: string; text: string } | string;
        icon: string;
    }>;
}

export const Profile = (props: IProfileProps): ReactElement => {
    const items = props.description.map((params, index) => {
            let content;
            const iconClass = `${params.icon} icon`;

            if (typeof params.content !== 'string' && typeof params.content.href !== 'undefined') {
                content = <a href={params.content.href} target="_blank" rel="noreferrer">{params.content.text}</a>;
            } else {
                content = params.content;
            }

            return (
                <div key={index} className="item">
                    <i className={iconClass}/>
                    <div className="content">
                        {content}
                    </div>
                </div>
            );
        }),
        images = props.avatar.map((imageUrl, index) => {
            const className = index > 0 ? 'hidden content' : 'visible content';

            return (
                <img
                    key={index}
                    src={imageUrl}
                    className={className}
                    alt=""
                />
            );
        });

    return (
        <div>
            <div className="ui card">
                <div className="ui slide masked reveal image">
                    {images}
                </div>
                <div className="content">
                    <div className="header">
                        {props.name}
                    </div>
                    <div className="description">
                        <div className="ui list">
                            {items}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
