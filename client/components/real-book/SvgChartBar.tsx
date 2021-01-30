import {IIRealProChartBar, TChordNotation} from './types';
import React, {ReactElement} from 'react';
import {
    RootDecorator,
    QualityDecorator,
    NumericQualityDecorator,
    ShiftDecorator,
    NumericShiftDecorator,
    InversionDecorator,
    PauseDecorator,
    NoChordDecorator,
    BarRepeatDecorator,

    AltRootDecorator,
    AltShiftDecorator,
    AltQualityDecorator,
    AltInversionDecorator
} from './Chord';
import {useMediaQuery} from 'react-responsive';

type IChartBarProps = { notation: TChordNotation } & IIRealProChartBar;
export interface IViewBox {
    x: number;
    y: number;
}

// TODO Songs to check:
// 105 - Alt chords
// 132 - 4 chords

// eslint-disable-next-line complexity
export const SvgChartBar = React.memo((props: IChartBarProps): ReactElement | null => {
    // const isDesktop = useMediaQuery({minWidth: 768});
    // const isMobile = useMediaQuery({maxWidth: 767});
    const viewBox: IViewBox = {x: 410, y: 90};
    const otherSigns: ReactElement[] = [];

    const openingBarLines: { [index: string]: ReactElement[] } = {
        // single bar line is not participating as it is the same for opening and closing
        '|': [<line key="|-open" x1={16} y1={0} x2={16} y2={viewBox.y} stroke={'black'} strokeWidth={2} />],
        // opening double bar line
        '[': [
            <line key="[1" x1={16} y1={0} x2={16} y2={viewBox.y} stroke={'black'} strokeWidth={2} />,
            <line key="[2" x1={21} y1={0} x2={21} y2={viewBox.y} stroke={'black'} strokeWidth={2} />
        ],
        // opening repeat bar line
        '{': [
            <polyline key="{1" points={`30 0, 17 10, 17 ${viewBox.y - 10}, 30 ${viewBox.y}`} stroke={'black'} strokeWidth={6} fill={'none'} />,
            <circle key="{2" cx={22} cy={viewBox.y / 2 - 5} r={3} stroke={'black'} strokeWidth={2} />,
            <circle key="{3" cx={22} cy={viewBox.y / 2 + 5} r={3} stroke={'black'} strokeWidth={2} />
        ]
    };
    const closingBarLines: { [index: string]: ReactElement[] } = {
        // single bar line is not participating as it is the same for opening and closing
        '|': [<line key="|-close" x1={viewBox.x - 2} y1={0} x2={viewBox.x - 2} y2={viewBox.y} stroke={'black'} strokeWidth={2} />],
        // closing double bar line
        ']': [
            <line key="]1" x1={viewBox.x - 2} y1={0} x2={viewBox.x - 2} y2={viewBox.y} stroke={'black'} strokeWidth={2} />,
            <line key="]2" x1={viewBox.x - 6} y1={0} x2={viewBox.x - 6} y2={viewBox.y} stroke={'black'} strokeWidth={2} />
        ],
        // closing repeat bar line
        '}': [
            <polyline key="}1" points={`${viewBox.x - 15} 0, ${viewBox.x - 2} 10, ${viewBox.x - 2} ${viewBox.y - 10}, ${viewBox.x - 15} ${viewBox.y}`} stroke={'black'} strokeWidth={6} fill={'none'} />,
            <circle key="}2" cx={viewBox.x - 7} cy={viewBox.y / 2 - 5} r={3} stroke={'black'} strokeWidth={2} />,
            <circle key="}3" cx={viewBox.x - 7} cy={viewBox.y / 2 + 5} r={3} stroke={'black'} strokeWidth={2} />
        ],
        // Final thick double bar line
        Z: [
            <line key="Z1" x1={viewBox.x - 3} y1={0} x2={viewBox.x - 3} y2={viewBox.y} stroke={'black'} strokeWidth={6} />,
            <line key="Z2" x1={viewBox.x - 9} y1={0} x2={viewBox.x - 9} y2={viewBox.y} stroke={'black'} strokeWidth={2} />
        ]
    };
    const endings: { [index: string]: ReactElement[] } = {
        N1: [
            <line key="N11" x1={15} y1={0} x2={viewBox.x / 1.5} y2={0} stroke={'black'} strokeWidth={2} />,
            <text key="N12" textAnchor={'start'} x={25} y={15}>{'1.'}</text>
        ],
        N2: [
            <line key="N21" x1={15} y1={0} x2={viewBox.x / 1.5} y2={0} stroke={'black'} strokeWidth={2} />,
            <text key="N22" textAnchor={'start'} x={25} y={15}>{'2.'}</text>
        ]
    };
    const codaSign: ReactElement[] = [
        <ellipse cx={viewBox.x - 20} cy={18} rx={8} ry={11} fill={'none'} stroke={'black'} strokeWidth={4} key={'coda-1'} />,
        <line x1={viewBox.x - 20} y1={1} x2={viewBox.x - 20} y2={35} stroke={'black'} strokeWidth={4} key={'coda-2'} />,
        <line x1={viewBox.x - 32} y1={18} x2={viewBox.x - 8} y2={18} stroke={'black'} strokeWidth={4} key={'coda-3'} />
    ];
    const fermataSign: ReactElement[] = [
        <path d={'M 30 20 A 15 15 0 0 1 60 20'} stroke={'black'} strokeWidth={4} fill={'none'} key={'fermata-1'}/>,
        <circle cx={45} cy={16} r={2} stroke={'black'} strokeWidth={2} key="fermata-2" />
    ];

    function getNumericDegreeShiftString(shift: number | undefined) {
        let shiftString = '';

        if (shift && shift < 0) {
            shiftString = [...Array(Math.abs(shift))].map(() => 'b').join('');
        } else if (shift && shift > 0) {
            shiftString = [...Array(shift)].map(() => '#').join('');
        }

        return shiftString;
    }

    function processOtherSigns(): void {
        if (props.open && openingBarLines[props.open]) {
            otherSigns.push(...openingBarLines[props.open] as any);
        }
        if (props.close && closingBarLines[props.close]) {
            otherSigns.push(...closingBarLines[props.close] as any);
        }
        if (props.ending) {
            otherSigns.push(...endings[props.ending] as any);
        }

        // Butterfly
        if (props.coda) {
            otherSigns.push(codaSign as any);
        }

        // Butterfly
        if (props.fermata) {
            otherSigns.push(fermataSign as any);
        }

        if (props.timeSignature) {
            const [beats, division] = props.timeSignature.split(' / ');
            const timeSignature: any[] = [
                <text
                    x={0}
                    y={30}
                    fontSize={22}
                    key={'time-signature-1'}
                >
                    {beats}
                </text>,
                <text
                    x={0}
                    y={70}
                    fontSize={22}
                    key={'time-signature-2'}
                >
                    {division}
                </text>,
                <line
                    x1={3}
                    y1={45}
                    x2={11}
                    y2={45}
                    key={'time-signature-3'}
                    stroke={'black'}
                    strokeWidth={2}
                />
            ];

            otherSigns.push(...timeSignature);
        }

    }

    function getHarmony() {
        if (!props.harmony) {
            return [];
        }

        const harmonyList: Array<string | ReactElement> = [];

        // eslint-disable-next-line complexity,max-statements
        props.harmony.forEach((harmony, index) => {
            // Should push right if 2 or less harmony elements in bar
            const shouldPushRight =
                (props.harmony && props.harmony.length <= 2 && index < props.harmony.length - 1) as boolean;
            // Should push left if more than 2 elements in bar
            const shouldPushLeft =
                (props.harmony && props.harmony.length > 2 && props.harmony.length <= 4 && index > 0) as boolean;

            if (harmony.root === 'x') {
                otherSigns.push(<BarRepeatDecorator viewBox={viewBox} key={`bar-repeat-${index}`} />);
            } else if (harmony.root === 'n') {
                harmonyList.push(<NoChordDecorator key={`no-chord-${index}`} />);
            } else if (harmony.root === 'p') {
                harmonyList.push(<PauseDecorator key={`pause-${index}`} />);
            } else if (harmony.root === 'W') {
                harmonyList.push(
                    <RootDecorator
                        viewBox={viewBox}
                        value={' '}
                        shouldPushLeft={shouldPushLeft}
                        key={`repeat-root-${index}`}
                    />
                );
                if (['numeric', 'berklee'].includes(props.notation)) {
                    if (harmony.inversionDegree) {
                        const inversionDegreeShift = getNumericDegreeShiftString(harmony.inversionDegreeShift);

                        const inversion = ['/', inversionDegreeShift, harmony.inversionDegree].join('');

                        harmonyList.push(
                            <InversionDecorator
                                viewBox={viewBox}
                                value={inversion}
                                key={`inversion-${index}`}
                            />
                        );
                    }
                } else {
                    harmonyList.push(
                        <InversionDecorator
                            viewBox={viewBox}
                            value={harmony.inversion}
                            key={`inversion-${index}`}
                        />
                    );
                }
            } else if (harmony.root || harmony.shift || harmony.quality || harmony.inversion) {
                let inversion;

                if (['numeric', 'berklee'].includes(props.notation)) {
                    if (harmony.inversionDegree) {
                        const inversionDegreeShift = getNumericDegreeShiftString(harmony.inversionDegreeShift);

                        inversion = ['/', inversionDegreeShift, harmony.inversionDegree].join('');
                    }
                    const numericDegreeShiftString = getNumericDegreeShiftString(harmony.degreeShift);

                    if (numericDegreeShiftString) {
                        harmonyList.push(
                            <NumericShiftDecorator
                                viewBox={viewBox}
                                value={numericDegreeShiftString}
                                key={`shift-${index}`}
                            />
                        );
                    }
                    harmonyList.push(
                        <RootDecorator
                            viewBox={viewBox}
                            value={harmony.degree}
                            shouldPushLeft={shouldPushLeft}
                            key={`root-${index}`}
                        />
                    );
                    if (harmony.quality) {
                        harmonyList.push(
                            <NumericQualityDecorator
                                viewBox={viewBox}
                                value={harmony.quality}
                                shouldPushLeft={shouldPushLeft}
                                key={`quality-${index}`}
                            />
                        );
                    }
                    if (inversion) {
                        harmonyList.push(
                            <InversionDecorator
                                viewBox={viewBox}
                                value={inversion}
                                key={`inversion-${index}`}
                            />
                        );
                    }
                } else {
                    harmonyList.push(
                        <RootDecorator
                            viewBox={viewBox}
                            value={harmony.root}
                            shouldPushLeft={shouldPushLeft}
                            key={`root-${index}`}
                        />
                    );
                    if (harmony.shift) {
                        harmonyList.push(
                            <ShiftDecorator
                                viewBox={viewBox}
                                value={harmony.shift}
                                key={`shift-${index}`}
                            />
                        );
                    }
                    if (harmony.quality) {
                        harmonyList.push(
                            <QualityDecorator
                                viewBox={viewBox}
                                shift={harmony.shift}
                                value={harmony.quality}
                                shouldPushLeft={shouldPushLeft}
                                key={`quality-${index}`}
                            />
                        );
                    }
                    if (harmony.inversion) {
                        harmonyList.push(
                            <InversionDecorator
                                viewBox={viewBox}
                                value={harmony.inversion}
                                key={`inversion-${index}`}
                            />
                        );
                    }
                }
            } else {
                throw new Error(`Unexpected harmony value ${harmony}`);
            }
            if (shouldPushRight) {
                harmonyList.push(' ');
            }
        });

        return harmonyList;
    }

    function getAltHarmony() {
        if (!props.alt) {
            return [];
        }

        const altHarmonyList: Array<string | ReactElement> = [];

        // Affirmation - alt.version http://localhost:3000/realbook.html#/jazz/1352
        props.alt.forEach((harmony, index) => {
            let inversion;

            if (['numeric', 'berklee'].includes(props.notation)) {
                if (harmony.inversionDegree) {
                    const inversionDegreeShift = getNumericDegreeShiftString(harmony.inversionDegreeShift);

                    inversion = ['/', inversionDegreeShift, harmony.inversionDegree].join('');
                }
                const numericDegreeShiftString = getNumericDegreeShiftString(harmony.degreeShift);

                if (numericDegreeShiftString) {
                    altHarmonyList.push(
                        <AltShiftDecorator
                            viewBox={viewBox}
                            value={numericDegreeShiftString}
                            key={`alt-shift-${index}`}
                        />
                    );
                }
                altHarmonyList.push(
                    <AltRootDecorator
                        viewBox={viewBox}
                        value={harmony.degree}
                        key={`alt-root-${index}`}
                    />
                );
            } else {
                altHarmonyList.push(
                    <AltRootDecorator
                        viewBox={viewBox}
                        value={harmony.root}
                        shouldPushLeft={index !== 0}
                        key={`alt-root-${index}`}
                    />
                );
                if (harmony.shift) {
                    altHarmonyList.push(
                        <AltShiftDecorator
                            viewBox={viewBox}
                            value={harmony.shift}
                            key={`alt-shift-${index}`}
                        />
                    );
                }
            }
            if (harmony.quality) {
                altHarmonyList.push(
                    <AltQualityDecorator
                        viewBox={viewBox}
                        value={harmony.quality}
                        key={`alt-quality-${index}`}
                    />
                );
            }
            if (inversion) {
                altHarmonyList.push(
                    <AltInversionDecorator
                        viewBox={viewBox}
                        value={inversion}
                        key={`alt-inversion-${index}`}
                    />
                );
            }

            altHarmonyList.push(' ');
        });


        return altHarmonyList;
    }

    const svgProps = {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: `0 0 ${viewBox.x} ${viewBox.y}`,
        preserveAspectRatio: 'xMidYMid meet',
        width: '100%',
        height: '100% ',
        style: {
            // border: '1px solid #EEE',
            margin: 0,
            padding: 0,
            maxHeight: '100%',
            minHeight: '100%'
            // display: 'block',
            // width: '100%',
            // height: '100%'
        }
    };

    processOtherSigns();

    return (
        // TODO FIX Street Life http://localhost:3000/realbook.html#/jazz/1380
        <svg {...svgProps}>
            {/*<rect*/}
            {/*    x={0}*/}
            {/*    y={0}*/}
            {/*    width={viewBox.x}*/}
            {/*    height={viewBox.y}*/}
            {/*    fill={'pink'}*/}
            {/*/>*/}
            {otherSigns}
            <text
                fontSize={viewBox.y - 20}
                fill="black"
                x={25}
                y={viewBox.y - 10}
            >
                {getHarmony()}
            </text>
            <text
                fontSize={viewBox.y - 60}
                fill="black"
                x={35}
                y={viewBox.y - 65}
            >
                {getAltHarmony()}
            </text>
        </svg>
    );
});

