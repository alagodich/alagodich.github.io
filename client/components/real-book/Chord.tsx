import React, {PureComponent, ReactElement} from 'react';
import {IIRealProChartBar} from './IRealProChartModel';
import {Table, TableCellProps} from 'semantic-ui-react';

const barlineMap: {[index: string]: string} = {
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

class Chord extends PureComponent<IIRealProChartBar, never> {

    private getBarlineClasses(): string {
        const classes = ['chart__bar'];

        if (this.props.openingLine === '|') {
            classes.push('barline--left--light');
        }
        if (this.props.closingLine === '|') {
            classes.push('barline--right--light');
        }
        if (this.props.openingLine && barlineMap[this.props.openingLine]) {
            classes.push(barlineMap[this.props.openingLine]);
        }
        if (this.props.closingLine && barlineMap[this.props.closingLine]) {
            classes.push(barlineMap[this.props.closingLine]);
        }
        if (this.props.ending) {
            classes.push('barline--top--light');
        }

        return classes.join(' ');
    }

    public renderChords(): Array<ReactElement | string> {
        if (!this.props.chords) {
            return [];
        }
        const chords: Array<ReactElement | string> = [];

        this.props.chords.split(' ').forEach((chord, index) => {
            const withAltChord = chord.match(/([^)]*)(\([^)]+\))/);

            if (withAltChord) {
                chords.push(withAltChord[1]);
                // Alternative chord
                chords.push(<span key={`${index}-alt`} className="chord__alt-chord">{withAltChord[2]}</span>);
            } else if (chord === 'x') {
                // Bar repeat
                chords.push(<span key={index} className="chord__bar-repeat">{'%'}</span>);
            } else if (chord === 'n') {
                // Bar repeat
                chords.push(<span key={index} className="chord__no-chord">{'N.C.'}</span>);
            } else {
                chords.push(chord);
            }

            // In bar chord divider
            chords.push(' ');
        });

        return chords;
    }

    public render(): ReactElement {
        const props: TableCellProps = {
            width: 4,
            className: this.getBarlineClasses()
        };

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
            barContent.push(<span key="coda" className="chord__coda">{'(Coda)'}</span>);
        }
        if (this.props.fermata) {
            barContent.push(<span key="fermata" className="chord__fermata">{'(Fermata)'}</span>);
        }
        if (this.props.segno) {
            barContent.push(<span key="segno" className="chord__segno">{'(Segno)'}</span>);
        }
        return (
            <Table.Cell
                {...props}
            >
                {barContent}
            </Table.Cell>
        );
    }

}

export default Chord;
