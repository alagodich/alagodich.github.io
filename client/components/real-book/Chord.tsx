import React, {ReactElement} from 'react';
import {TChordNotation, IIRealProChord} from './types';

interface IChordComponent {
    harmony: IIRealProChord;
    notation: TChordNotation;
}
console.log('TODO REFACTOR');
// TODO REFACTOR
// eslint-disable-next-line complexity
export const Chord = React.memo((props: IChordComponent): ReactElement | null => {
    // function getNumericDegreeString(degree: number, shift: number | undefined) {
    //     let shiftString = '';
    //
    //     if (shift && shift < 0) {
    //         shiftString = [...Array(Math.abs(shift))].map(() => 'b').join('');
    //     } else if (shift && shift > 0) {
    //         shiftString = [...Array(shift)].map(() => '#').join('');
    //     }
    //
    //     return [shiftString, degree].join('');
    // }
    //
    // if (props.harmony.root === 'x') {
    //     // Bar repeat
    //     return <span className="ui big text chord__bar-repeat">{'x'}</span>;
    // } else if (props.harmony.root === 'n') {
    //     // N.C
    //     return <span className="ui big text chord__no-chord">{'N.C.'}</span>;
    // } else if (props.harmony.root === 'p') {
    //     // Pause
    //     return <span className="ui big text chord__pause">{' / '}</span>;
    // } else if (props.harmony.root === 'W') {
    //     return (
    //         <span className="ui medium text">
    //             {' '}{props.harmony.shift ?? null}
    //             {props.harmony.quality ? <span className="ui small text">{props.harmony.quality}</span> : null}
    //             {props.harmony.inversion ? <span className="ui big text">{props.harmony.inversion}</span> : null}
    //         </span>
    //     );
    // } else if (props.harmony.root || props.harmony.shift || props.harmony.quality || props.harmony.inversion) {
    //     let chordBaseString;
    //     let inversion;
    //
    //     if (['numeric', 'berklee'].includes(props.notation)) {
    //         if (props.harmony.inversionDegree) {
    //             inversion = getNumericDegreeString(
    //                 props.harmony.inversionDegree,
    //                 props.harmony.inversionDegreeShift
    //             );
    //             inversion = ['/', inversion].join('');
    //         }
    //         chordBaseString = getNumericDegreeString(props.harmony.degree as number, props.harmony.degreeShift);
    //     } else {
    //         inversion = props.harmony.inversion;
    //         chordBaseString = [props.harmony.root, props.harmony.shift].join('');
    //     }
    //
    //     return (
    //         <span className="ui big text">
    //             {chordBaseString}
    //             {props.harmony.quality ? <span className="ui small text">{props.harmony.quality}</span> : null}
    //             {inversion ? <span className="ui small text">{inversion}</span> : null}
    //         </span>
    //     );
    // }
    //
    return null;
});
