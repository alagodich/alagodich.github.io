import React, {PureComponent, ReactElement} from 'react';
import {IIRealProChartBar} from './types';
import {Table, TableCellProps, Segment} from 'semantic-ui-react';

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

    public renderChords(): {chords: Array<ReactElement | string>; altChords?: Array<ReactElement | string>} {
        if (!this.props.chords) {
            return {chords: ['']};
        }
        // const chordsAsString: Array<ReactElement | string> = [];
        const chords: Array<ReactElement | string> = [];
        const altChords: Array<ReactElement | string> = [];

        // TODO make numeric option in container with redux
        // TODO render W, empty root
        this.props.harmony?.forEach((chord, key) => {
            if (chord.root === 'x') {
                // Bar repeat
                chords.push(<span key={`${key}-harmony`} className="chord__bar-repeat">{'%'}</span>);
            } else if (chord.root === 'n') {
                // Bar repeat
                chords.push(<span key={`${key}-harmony`} className="chord__no-chord">{'N.C.'}</span>);
            } else if (chord.root === 'p') {
                // Bar repeat
                chords.push(<span key={`${key}-harmony`} className="chord__pause">{' / '}</span>);
            } else {
                chords.push(
                    <span key={`${key}-harmony`} className="ui big text">
                        {`${chord.root}${chord.shift}`}
                        {chord.quality ? <span className="ui tiny text">{chord.quality}</span> : null}
                        {chord.inversion ? <span className="ui tiny text">{chord.inversion}</span> : null}
                    </span>
                );
                if (chord.alt) {
                    altChords.push(
                        <span key={`${key}-harmony-alt`} className="ui medium text chord__alt-chord">
                            {`${chord.alt.root}${chord.alt.shift}`}
                            {chord.alt.quality ? <span className="ui tiny text">{chord.alt.quality}</span> : null}
                            {chord.alt.inversion ? <span className="ui tiny text">{chord.alt.inversion}</span> : null}
                        </span>
                    );
                    altChords.push(' ');
                }
            }
            // In bar chord divider
            chords.push(' ');
        });

        return {chords, altChords};
    }

    public render(): ReactElement {
        const props: TableCellProps = {
            width: 4,
            className: this.getBarlineClasses()
        };

        if (this.props.chords === 'x') {
            props.textAlign = 'center';
        }
        const {chords, altChords} = this.renderChords();
        const otherSigns = [];

        if (this.props.timeSignature) {
            otherSigns.unshift(
                <span className="chord__time-signature" key="time-signature">
                    {this.props.timeSignature}
                </span>
            );
        }
        if (this.props.coda) {
            otherSigns.push(<span key="coda" className="ui red small text chord__coda">{'(c)'}</span>);
        }
        if (this.props.fermata) {
            otherSigns.push(<span key="fermata" className="ui red small text chord__fermata">{'(f)'}</span>);
        }
        if (this.props.segno) {
            otherSigns.push(<span key="segno" className="ui red small text chord__segno">{'(s)'}</span>);
        }
        return (
            <Table.Cell
                {...props}
            >
                <Segment.Group horizontal className="basic">
                    <Segment basic compact>{otherSigns}</Segment>
                    {
                        altChords?.length
                            ? (
                                <Segment basic>
                                    <Segment vertical basic>{altChords}</Segment>
                                    <Segment vertical basic>{chords}</Segment>
                                </Segment>
                            )
                            : <Segment vertical basic>{chords}</Segment>
                    }
                </Segment.Group>
            </Table.Cell>
        );
    }

}

export default Chord;
