import React, {PropTypes, Component} from 'react';

const propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.array,
    description: PropTypes.array
};

class Profile extends Component {

    render() {

        const items = this.props.description.map((params, index) => {
                const iconClass = `${params.icon} icon`;
                let content;

                if (typeof params.content.href !== 'undefined') {
                    content = <a href={params.content.href} target="_blank">{params.content.text}</a>;
                } else {
                    content = params.content;
                }

                return (
                    <div key={index} className="item">
                        <i className={iconClass}></i>
                        <div className="content">
                            {content}
                        </div>
                    </div>
                );
            }),
            images = this.props.avatar.map((imageUrl, index) => {
                const className = index > 0 ? 'hidden content' : 'visible content';

                return <img key={index} src={imageUrl} className={className}/>;
            });

        return (
            <div>
                <div className="ui card">
                    <div className="ui slide masked reveal image">
                        {images}
                    </div>
                    <div className="content">
                        <div className="header">
                            {this.props.name}
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
    }
}

Profile.propTypes = propTypes;

export default Profile;
