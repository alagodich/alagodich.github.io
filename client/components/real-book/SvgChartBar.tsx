import {IIRealProChartBar, TChordNotation} from './types';
import React, {ReactElement} from 'react';
import {useMediaQuery} from 'react-responsive';

type IChartBarProps = { notation: TChordNotation } & IIRealProChartBar;

// TODO Songs to check:
// 105 - Alt chords
// 132 - 4 chords

// eslint-disable-next-line complexity
export const SvgChartBar = React.memo((props: IChartBarProps): ReactElement | null => {
    // const isDesktop = useMediaQuery({minWidth: 768});
    // const isMobile = useMediaQuery({maxWidth: 767});
    const viewBox = {x: 410, y: 90};

    const openingBarLines: { [index: string]: ReactElement[] } = {
        // single bar line is not participating as it is the same for opening and closing
        '|': [<line key="|-open" x1={1} y1={0} x2={1} y2={viewBox.y} stroke={'black'} strokeWidth={2} />],
        // opening double bar line
        '[': [
            <line key="[1" x1={1} y1={0} x2={1} y2={viewBox.y} stroke={'black'} strokeWidth={2} />,
            <line key="[2" x1={6} y1={0} x2={6} y2={viewBox.y} stroke={'black'} strokeWidth={2} />
        ],
        // opening repeat bar line
        '{': [
            <polyline key="{1" points={`15 0, 2 10, 2 ${viewBox.y - 10}, 15 ${viewBox.y}`} stroke={'black'} strokeWidth={6} fill={'none'} />,
            <circle key="{2" cx={10} cy={viewBox.y / 2 - 5} r={3} stroke={'black'} strokeWidth={2} />,
            <circle key="{3" cx={10} cy={viewBox.y / 2 + 5} r={3} stroke={'black'} strokeWidth={2} />
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
            <circle key="}2" cx={viewBox.x - 10} cy={viewBox.y / 2 - 5} r={3} stroke={'black'} strokeWidth={2} />,
            <circle key="}3" cx={viewBox.x - 10} cy={viewBox.y / 2 + 5} r={3} stroke={'black'} strokeWidth={2} />
        ],
        // Final thick double bar line
        Z: [
            <line key="Z1" x1={viewBox.x - 3} y1={0} x2={viewBox.x - 3} y2={viewBox.y} stroke={'black'} strokeWidth={6} />,
            <line key="Z2" x1={viewBox.x - 9} y1={0} x2={viewBox.x - 9} y2={viewBox.y} stroke={'black'} strokeWidth={2} />
        ]
    };
    const endings: { [index: string]: ReactElement[] } = {
        N1: [
            <line key="N11" x1={0} y1={0} x2={viewBox.x / 1.5} y2={0} stroke={'black'} strokeWidth={2} />,
            <text key="N12" textAnchor={'start'} x={10} y={15}>{'1.'}</text>
        ],
        N2: [
            <line key="N21" x1={0} y1={0} x2={viewBox.x / 1.5} y2={0} stroke={'black'} strokeWidth={2} />,
            <text key="N22" textAnchor={'start'} x={10} y={15}>{'2.'}</text>
        ]
    };

    function getNumericDegreeShiftString(shift: number | undefined) {
        let shiftString = '';

        if (shift && shift < 0) {
            shiftString = [...Array(Math.abs(shift))].map(() => 'b').join('');
        } else if (shift && shift > 0) {
            shiftString = [...Array(shift)].map(() => '#').join('');
        }

        return shiftString;
    }
    // console.log(props);

    function getBorders(): ReactElement[][] {
        const borders: ReactElement[][] = [];

        // if (props.open === '|') {
        //     borders.push(...barlineMap['|-open'] as any);
        //     // borders.push([...barlineMap['[']]);
        // }
        // if (props.close === '|') {
        //     borders.push(...barlineMap['|-close'] as any);
        // }
        if (props.open && openingBarLines[props.open]) {
            borders.push(...openingBarLines[props.open] as any);
        }
        if (props.close && closingBarLines[props.close]) {
            borders.push(...closingBarLines[props.close] as any);
        }
        if (props.ending) {
            borders.push(...endings[props.ending] as any);
        }

        return borders;
    }

    function getHarmony() {
        if (!props.harmony) {
            return [];
        }

        const harmonyList: Array<string | ReactElement> = [];
        const otherSigns: ReactElement[] = [];

        // eslint-disable-next-line complexity
        props.harmony.forEach((harmony, index) => {
            const shouldPushRight = props.harmony && props.harmony.length <= 2 && index < props.harmony.length - 1;
            const shouldPushLeft = props.harmony && props.harmony.length > 2 && props.harmony.length <= 4 && index > 0;

            if (harmony.root === 'x') {
                const barRepeat: ReactElement[] = [
                    <line x1={viewBox.x / 2 - 20} y1={viewBox.y - 20} x2={viewBox.x / 2 + 20} y2={20} stroke={'black'} strokeWidth={4} key={'bar-repeat-1'} />,
                    <circle cx={viewBox.x / 2 - 18} cy={viewBox.y / 2 - 10} r={3} stroke={'black'} strokeWidth={2} key={'bar-repeat-2'} />,
                    <circle cx={viewBox.x / 2 + 18} cy={viewBox.y / 2 + 10} r={3} stroke={'black'} strokeWidth={2} key={'bar-repeat-3'} />,
                ];

                // Bar repeat
                otherSigns.push(...barRepeat as any);
            } else if (harmony.root === 'n') {
                // N.C
                harmonyList.push('N.C.');
            } else if (harmony.root === 'p') {
                // Pause
                harmonyList.push(' / ');
            } else if (harmony.root === 'W') {
                // TODO fix for numeric
                harmonyList.push(` ${harmony.inversion}`);
            } else if (harmony.root || harmony.shift || harmony.quality || harmony.inversion) {
                let inversion;

                if (['numeric', 'berklee'].includes(props.notation)) {
                    if (harmony.inversionDegree) {
                        inversion = getNumericDegreeShiftString(harmony.inversionDegreeShift);
                        inversion = ['/', inversion].join('');
                    }
                    const numericDegreeShiftString = getNumericDegreeShiftString(harmony.degreeShift);
                    // harmonyList.push([chordBaseString, harmony.quality, inversion].join(''));

                    if (numericDegreeShiftString) {
                        harmonyList.push(<tspan fontSize={'0.5em'} dx={0} y={viewBox.y - 40}>{numericDegreeShiftString}</tspan>);
                    }
                    harmonyList.push(<tspan dx={shouldPushLeft ? 15 : 0} y={viewBox.y - 10}>{harmony.degree}</tspan>);
                    if (harmony.quality) {
                        harmonyList.push(<tspan fontSize={'0.5em'} dx={-5} y={viewBox.y - 10}>{harmony.quality}</tspan>);
                    }
                    if (inversion) {
                        harmonyList.push(<tspan fontSize={'0.6em'} dx={0} y={viewBox.y - 10}>{inversion}</tspan>);
                    }
                } else {
                    // chordBaseString = [harmony.root, harmony.shift].join('');
                    // // harmonyList.push(chordBaseString);
                    harmonyList.push(<tspan dx={shouldPushLeft ? 15 : 0} y={viewBox.y - 10}>{harmony.root}</tspan>);
                    if (harmony.shift) {
                        harmonyList.push(<tspan fontSize={'0.5em'} dx={-5} y={viewBox.y - 40}>{harmony.shift}</tspan>);
                    }
                    if (harmony.quality) {
                        harmonyList.push(<tspan fontSize={'0.5em'} dx={harmony.shift ? -20 : -5} y={viewBox.y - 10}>{harmony.quality}</tspan>);
                    }
                    if (harmony.inversion) {
                        harmonyList.push(<tspan fontSize={'0.6em'} dx={0} y={viewBox.y - 10}>{harmony.inversion}</tspan>);
                    }
                }
            }
            if (shouldPushRight) {
                harmonyList.push(' ');
            }
        });

        return [harmonyList, otherSigns];
    }

    // const cellProps = {
    //     style: {
    //         // resize: 'both',
    //         // overflow: 'hidden',
    //         margin: 0,
    //         padding: 0,
    //         // height: 60,
    //         height: '2'
    //     }
    // };
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

    const [harmony, otherSigns] = getHarmony();

    return (
        // TODO move table cell to the parent
        <svg {...svgProps}>
            {/*<rect x={0} y={0} width={viewBox.x} height={viewBox.y} fill={'pink'}/>*/}
            {getBorders()}
            <text
                fontSize={viewBox.y - 20}
                fill="black"
                x={15}
                y={viewBox.y - 10}
            >
                {harmony}
            </text>
            {otherSigns}
            {/*<svg*/}
            {/*    width="5.6537971"*/}
            {/*    height="15.641341"*/}
            {/*    viewBox="0 0 0.90800003 2.5119999"*/}
            {/*>*/}
            {/*    <path*/}
            {/*        transform="matrix(0.004,0,0,-0.004,0.108,1.86)"*/}
            {/*        d="m 27,41 -1,-66 v -11 c 0,-22 1,-44 4,-66 45,38 93,80 93,139 0,33 -14,67 -43,67 C 49,104 28,74 27,41 z m -42,-179 -12,595 c 8,5 18,8 27,8 9,0 19,-3 27,-8 L 20,112 c 25,21 58,34 91,34 52,0 89,-48 89,-102 0,-80 -86,-117 -147,-169 -15,-13 -24,-38 -45,-38 -13,0 -23,11 -23,25 z"*/}
            {/*        id="path3089"*/}
            {/*        stroke={'black'}*/}
            {/*        strokeWidth={2}*/}
            {/*        fill={'none'}*/}
            {/*        // style="fill:currentColor"*/}
            {/*    />*/}
            {/*    <text fill="black" textAnchor={'start'} x={10} y={90}>{'ALT'}</text>*/}
            {/*</svg>*/}
        </svg>
    );
});

