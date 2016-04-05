import React, {PropTypes, Component} from 'react';

const propTypes = {
    config: PropTypes.object.isRequired,
    duration: PropTypes.string
};

class Chord extends Component {

    generateKind() {
        const useSymbols = this.props.config.kind[0].$['use-symbols'] === 'yes';
        // console.log(this.props.config.kind[0].$['use-symbols']);
        if (useSymbols && this.props.config.kind[0]._ === 'diminished-seventh') {
            return 'o7';
        }

        let text = this.props.config.kind[0].$.text;

        if (this.props.config.kind[0].$['parentheses-degrees'] === 'yes') {
            const degree = this.props.config.degree[0];

            if (['alter', 'add'].indexOf(degree['degree-type'][0]) !== -1) {
                const value = degree['degree-value'][0];
                let alter = this.generateAlter(degree['degree-alter'][0]);

                alter = alter ? alter : '';
                text += alter + value;
            }
        }
        return text;
    }

    generateAlter(alter) {
        if (alter === '-1') {
            return 'b';
        }
        if (alter === '1') {
            return '#';
        }
        return null;
    }

    generateCssClassNames() {
        switch (this.props.duration) {
            case 'whole':
                return 'sixteen wide column';
            case 'half':
                return 'eight wide column';
            case 'quarter':
                return 'four wide column';
            default:
                return 'column';
        }
    }

    render() {
        const chord = this.props.config,
            step = chord.root[0]['root-step'][0],
            alter = this.generateAlter(chord.root[0]['root-alter'][0]),
            kind = this.generateKind();

        return (
            <span className={this.generateCssClassNames()}>
                <span className="chord__step">{step}</span>
                <span className="chord__alter">{alter}</span>
                <span className="chord__kind">{kind}</span>
            </span>
        );
    }

}

Chord.propTypes = propTypes;

export default Chord;
