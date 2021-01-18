import React, {ReactElement} from 'react';
import {IIRealProChartBar, IIRealProChord} from './types';
import {Table, TableCellProps, Segment} from 'semantic-ui-react';
import {IChordNotation} from './types';

const barlineMap: { [index: string]: string } = {
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

type IChordProps = { notation: IChordNotation } & IIRealProChartBar;

export const Chord: React.FC<IChordProps> = React.memo((props: IChordProps) => {

    function getBarlineClasses(): string {
        const classes = ['chart__bar'];

        if (props.open === '|') {
            classes.push('barline--left--light');
        }
        if (props.close === '|') {
            classes.push('barline--right--light');
        }
        if (props.open && barlineMap[props.open]) {
            classes.push(barlineMap[props.open]);
        }
        if (props.close && barlineMap[props.close]) {
            classes.push(barlineMap[props.close]);
        }
        if (props.ending) {
            classes.push('barline--top--light');
        }

        return classes.join(' ');
    }

    function renderChords(): { chords: Array<ReactElement | string>; altChords?: Array<ReactElement | string> } {
        if (!props.chords) {
            return {chords: ['']};
        }
        const chords: Array<ReactElement | string> = [];
        const altChords: Array<ReactElement | string> = [];

        // eslint-disable-next-line complexity
        props.harmony?.forEach((chord: IIRealProChord, key: number) => {
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
                        {chord.quality ? <span className="ui small text">{chord.quality}</span> : null}
                        {chord.inversion ? <span className="ui big text">{chord.inversion}</span> : null}
                    </span>
                );
            } else if (chord.root || chord.shift || chord.quality || chord.inversion) {
                chords.push(
                    <span key={`${key}-harmony`} className="ui big text">
                        {props.notation === 'numeric' ? chord.numeric : chord.root}{chord.shift ?? null}
                        {chord.quality ? <span className="ui small text">{chord.quality}</span> : null}
                        {chord.inversion ? <span className="ui small text">{chord.inversion}</span> : null}
                    </span>
                );
            }
        });

        props.alt?.forEach((chord: IIRealProChord, key: number) => {
            altChords.push(
                <span key={`${key}-harmony-alt`} className="ui big text chord__alt-chord">
                    {props.notation === 'numeric' ? chord.numeric : chord.root}{chord.shift ?? null}
                    {chord.quality ? <span className="ui tiny text">{chord.quality}</span> : null}
                    {chord.inversion ? <span className="ui tiny text">{chord.inversion}</span> : null}
                </span>
            );
        });

        return {chords, altChords};
    }

    const tableProps: TableCellProps = {
        width: 4,
        className: getBarlineClasses()
    };

    if (props.chords === 'x') {
        tableProps.textAlign = 'center';
    }
    if (props.error) {
        tableProps.error = true;
    }
    const {chords, altChords} = renderChords();
    const otherSigns = [];

    if (props.timeSignature) {
        otherSigns.unshift(
            <span className="chord__time-signature" key="time-signature">
                {props.timeSignature}
            </span>
        );
    }
    if (props.coda) {
        otherSigns.push(<span key="coda" className="ui red medium text chord__coda">{'(c)'}</span>);
    }
    if (props.fermata) {
        otherSigns.push(<span key="fermata" className="ui red medium text chord__fermata">{'(f)'}</span>);
    }
    if (props.segno) {
        otherSigns.push(<span key="segno" className="ui red medium text chord__segno">{'(s)'}</span>);
    }
    return (
        <Table.Cell
            {...tableProps}
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
                                        {altChords.map((item, key) => <Segment key={key} basic>{item}</Segment>)}
                                    </Segment.Group>
                                </Segment>
                                <Segment vertical basic>
                                    <Segment.Group className="basic" horizontal>
                                        {chords.map((item, key) => <Segment key={key} basic>{item}</Segment>)}
                                    </Segment.Group>
                                </Segment>
                            </Segment>
                        )
                        : (
                            <Segment basic>
                                <Segment.Group className="basic" horizontal>
                                    {chords.map((item, key) => <Segment key={key} basic>{item}</Segment>)}
                                </Segment.Group>
                            </Segment>
                        )
                }
            </Segment.Group>
        </Table.Cell>
    );

});
