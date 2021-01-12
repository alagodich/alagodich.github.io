import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table} from 'semantic-ui-react';

const propTypes = {
    chords: PropTypes.string,
    openingLine: PropTypes.string,
    closingLine: PropTypes.string,
    ending: PropTypes.string,
    timeSignature: PropTypes.string,
    divider: PropTypes.string,
    coda: PropTypes.bool
};

const barlineMap = {
    // single bar line is not participating as it is the same for opening and closing
    // '|',
    // opening double bar line
    '[': 'barline--left--light-light',
    // closing double bar line
    ']': 'barline--right--light-light',
    // opening repeat bar line
    '{': 'barline--left--heavy-dotted',
    // closing repeat bar line
    '}': 'barline--right--dotted-heavy',
    // Final thick double bar line
    Z: 'barline--right--light-heavy'
};

class Chord extends Component {

    getBarlineClasses() {
        const classes = ['chart__bar'];

        if (this.props.openingLine === '|') {
            classes.push('barline--left--light');
        }
        if (this.props.closingLine === '|') {
            classes.push('barline--right--light');
        }
        if (barlineMap[this.props.openingLine]) {
            classes.push(barlineMap[this.props.openingLine]);
        }
        if (barlineMap[this.props.closingLine]) {
            classes.push(barlineMap[this.props.closingLine]);
        }
        if (this.props.ending) {
            classes.push('barline--top--light');
        }

        return classes.join(' ');
    }

    renderChords() {
        if (!this.props.chords) {
            return [];
        }
        const chords = [];

        this.props.chords.split(' ').forEach((chord, index) => {
            const withAltChord = chord.match(/([^)]*)(\([^)]+\))/);

            if (withAltChord) {
                chords.push(withAltChord[1]);
                // Alternative chord
                chords.push(<span key={`${index}-alt`} className="chord__alt-chord">{withAltChord[2]}</span>);
            } else if (chord === 'x') {
                // Bar repeat
                chords.push(<span key={index} className="chord__bar-repeat">{'%'}</span>);
            } else {
                chords.push(chord);
            }

            // In bar chord divider
            chords.push(' ');
        });

        return chords;
    }

    render() {
        const props = {};

        if (this.props.chords === 'x') {
            props.textAlign = 'center';
        }

        const barContent = this.renderChords();

        if (this.props.timeSignature) {
            barContent.unshift(
                <span className="chord__time-signature" key="time-signature">
                    {this.props.timeSignature}
                </span>
            );
        }
        if (this.props.coda) {
            barContent.push(<span key="coda" style={{opacity: 0.5}}>{'(Coda)'}</span>);
        }
        return (
            <Table.Cell
                width={4}
                className={this.getBarlineClasses()}
                {...props}
            >
                {barContent}
            </Table.Cell>
        );
    }

}

Chord.propTypes = propTypes;

export default Chord;
