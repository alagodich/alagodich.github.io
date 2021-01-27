import React from 'react';
import {IIRealProChartBar} from './types';
import {Table, TableCellProps, Segment} from 'semantic-ui-react';
import {TChordNotation} from './types';
import {Chord} from './Chord';

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

type IChartBarProps = { notation: TChordNotation } & IIRealProChartBar;

// eslint-disable-next-line complexity
export const ChartBar: React.FC<IChartBarProps> = React.memo((props: IChartBarProps) => {

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
    const chords = props.harmony?.map((harmony, key) =>
        <Chord key={key} harmony={harmony} notation={props.notation} />);
    const altChords = props.alt?.map((harmony, key) =>
        <Chord key={key} harmony={harmony} notation={props.notation} />);
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
                        ? <Segment basic compact className="bar__other-signs">{otherSigns}</Segment>
                        : null
                }
                {
                    altChords?.length
                        ? (
                            <Segment basic style={otherSigns.length ? {paddingLeft: 0, marginLeft: -10} : null}>
                                <Segment vertical basic>
                                    <Segment.Group className="basic chord--alt" horizontal>
                                        {altChords.map((item, key) => <Segment key={key} basic>{item}</Segment>)}
                                    </Segment.Group>
                                </Segment>
                                <Segment vertical basic>
                                    <Segment.Group className="basic" horizontal>
                                        {chords?.map((item, key) => <Segment key={key} basic>{item}</Segment>)}
                                    </Segment.Group>
                                </Segment>
                            </Segment>
                        )
                        : (
                            <Segment basic style={otherSigns.length ? {paddingLeft: 0, marginLeft: -10} : null}>
                                <Segment.Group className="basic" horizontal>
                                    {chords?.map((item, key) => <Segment key={key} basic>{item}</Segment>)}
                                </Segment.Group>
                            </Segment>
                        )
                }
            </Segment.Group>
        </Table.Cell>
    );

});
