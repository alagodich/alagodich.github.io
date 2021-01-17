import React, {PureComponent, ReactElement} from 'react';
import {IIRealProChartBar, IIRealProChord} from './types';
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

        if (this.props.open === '|') {
            classes.push('barline--left--light');
        }
        if (this.props.close === '|') {
            classes.push('barline--right--light');
        }
        if (this.props.open && barlineMap[this.props.open]) {
            classes.push(barlineMap[this.props.open]);
        }
        if (this.props.close && barlineMap[this.props.close]) {
            classes.push(barlineMap[this.props.close]);
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
        const chords: Array<ReactElement | string> = [];
        const altChords: Array<ReactElement | string> = [];

        // eslint-disable-next-line complexity
        this.props.harmony?.forEach((chord: IIRealProChord, key: number) => {
            if (chord.root === 'x') {
                // Bar repeat
                chords.push(<span key={`${key}-harmony`} className="ui big text chord__bar-repeat">{'x'}</span>);
            } else if (chord.root === 'n') {
                // Bar repeat
                chords.push(<span key={`${key}-harmony`} className="ui big text chord__no-chord">{'N.C.'}</span>);
            } else if (chord.root === 'p') {
                // Bar repeat
                chords.push(<span key={`${key}-harmony`} className="ui big text chord__pause">{' / '}</span>);
            } else if (chord.root === 'W') {
                chords.push(
                    <span key={`${key}-harmony`} className="ui medium text">
                        {' '}{chord.shift ?? null}
                        {chord.quality ? <span className="ui tiny text">{chord.quality}</span> : null}
                        {chord.inversion ? <span className="ui big text">{chord.inversion}</span> : null}
                    </span>
                );
            } else if (chord.root || chord.shift || chord.quality || chord.inversion) {
                chords.push(
                    <span key={`${key}-harmony`} className="ui big text">
                        {chord.root}{chord.shift ?? null}
                        {chord.quality ? <span className="ui tiny text">{chord.quality}</span> : null}
                        {chord.inversion ? <span className="ui tiny text">{chord.inversion}</span> : null}
                    </span>
                );
            }
        });

        this.props.alt?.forEach((chord: IIRealProChord, key: number) => {
            altChords.push(
                <span key={`${key}-harmony-alt`} className="ui big text chord__alt-chord">
                    {chord.root}{chord.shift ?? null}
                    {chord.quality ? <span className="ui tiny text">{chord.quality}</span> : null}
                    {chord.inversion ? <span className="ui tiny text">{chord.inversion}</span> : null}
                </span>
            );
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
            otherSigns.push(<span key="coda" className="ui red medium text chord__coda">{'(c)'}</span>);
        }
        if (this.props.fermata) {
            otherSigns.push(<span key="fermata" className="ui red medium text chord__fermata">{'(f)'}</span>);
        }
        if (this.props.segno) {
            otherSigns.push(<span key="segno" className="ui red medium text chord__segno">{'(s)'}</span>);
        }
        return (
            <Table.Cell
                {...props}
            >
                <Segment.Group horizontal className="basic">
                    {
                        otherSigns.length
                            ? <Segment basic compact>{otherSigns}</Segment>
                            : null
                    }
                    {
                        altChords?.length
                            ? (
                                <Segment basic>
                                    <Segment vertical basic>
                                        <Segment.Group className="basic" horizontal>
                                            {altChords.map((item, key) => <Segment key={key} basic >{item}</Segment>)}
                                        </Segment.Group>
                                    </Segment>
                                    <Segment vertical basic>
                                        <Segment.Group className="basic" horizontal>
                                            {chords.map((item, key) => <Segment key={key} basic >{item}</Segment>)}
                                        </Segment.Group>
                                    </Segment>
                                </Segment>
                            )
                            : (
                                <Segment basic>
                                    <Segment.Group className="basic" horizontal>
                                        {chords.map((item, key) => <Segment key={key} basic >{item}</Segment>)}
                                    </Segment.Group>
                                </Segment>
                            )
                    }
                </Segment.Group>
            </Table.Cell>
        );
    }

}

export default React.memo(Chord);
