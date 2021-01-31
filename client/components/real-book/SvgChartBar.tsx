import {IIRealProChartBar, TChordNotation} from './types';
import React, {ReactElement} from 'react';
import {
    RootDecorator,
    QualityDecorator,
    NumericQualityDecorator,
    ShiftDecorator,
    NumericShiftDecorator,
    InversionDecorator,

    AltRootDecorator,
    AltShiftDecorator,
    AltQualityDecorator,
    AltInversionDecorator,

    Pause,
    NoChord,
    BarRepeat,
    Coda,
    Fermata,
    TimeSignature,
    Ending,
    OpeningLine,
    ClosingLine
} from './BarParts';
// TODO resize for different screen sizes
// import {useMediaQuery} from 'react-responsive';

type IChartBarProps = { notation: TChordNotation } & IIRealProChartBar;
export interface IViewBox {
    x: number;
    y: number;
}

function getNumericDegreeShiftString(shift: number | undefined) {
    let shiftString = '';

    if (shift && shift < 0) {
        shiftString = [...Array(Math.abs(shift))].map(() => 'b').join('');
    } else if (shift && shift > 0) {
        shiftString = [...Array(shift)].map(() => '#').join('');
    }

    return shiftString;
}

// eslint-disable-next-line complexity
export const SvgChartBar = React.memo((props: IChartBarProps): ReactElement | null => {
    // const isDesktop = useMediaQuery({minWidth: 768});
    // const isMobile = useMediaQuery({maxWidth: 767});
    const viewBox: IViewBox = {x: 410, y: 90};
    const otherSigns: ReactElement[] = [];

    function processOtherSigns(): void {
        if (props.open) {
            otherSigns.push(<OpeningLine viewBox={viewBox} value={props.open} key={'opening-line'} />);
        }
        if (props.close) {
            otherSigns.push(<ClosingLine viewBox={viewBox} value={props.close} key={'closing-line'} />);
        }
        if (props.ending) {
            otherSigns.push(<Ending key={'ending'} viewBox={viewBox} value={props.ending} />);
        }

        // Butterfly
        if (props.coda) {
            otherSigns.push(<Coda viewBox={viewBox} key={'coda'} />);
        }

        // Butterfly
        if (props.fermata) {
            otherSigns.push(<Fermata key={'fermata'} />);
        }

        if (props.timeSignature) {
            otherSigns.push(<TimeSignature viewBox={viewBox} value={props.timeSignature} key={'time-signature'} />);
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
                otherSigns.push(<BarRepeat viewBox={viewBox} key={`bar-repeat-${index}`} />);
            } else if (harmony.root === 'n') {
                harmonyList.push(<NoChord key={`no-chord-${index}`} />);
            } else if (harmony.root === 'p') {
                harmonyList.push(<Pause key={`pause-${index}`} />);
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

    // function pinkRect() {
    //     return (
    //         <rect
    //             x={0}
    //             y={0}
    //             width={viewBox.x}
    //             height={viewBox.y}
    //             fill={'pink'}
    //         />
    //     );
    // }

    const svgProps = {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: `0 0 ${viewBox.x} ${viewBox.y}`,
        preserveAspectRatio: 'xMidYMid meet',
        width: '100%',
        height: '100% ',
        style: {
            margin: 0,
            padding: 0,
            maxHeight: '100%',
            minHeight: '100%'
        }
    };

    processOtherSigns();

    return (
        <svg {...svgProps}>
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

