import React, {ReactElement} from 'react';
import {TChordNotation, IIRealProChord} from './types';

interface IChordComponent {
    harmony: IIRealProChord;
    notation: TChordNotation;
}

// eslint-disable-next-line complexity
export const Chord = React.memo((props: IChordComponent): ReactElement | null => {
    if (props.harmony.root === 'x') {
        // Bar repeat
        return <span className="ui big text chord__bar-repeat">{'x'}</span>;
    } else if (props.harmony.root === 'n') {
        // N.C
        return <span className="ui big text chord__no-chord">{'N.C.'}</span>;
    } else if (props.harmony.root === 'p') {
        // Pause
        return <span className="ui big text chord__pause">{' / '}</span>;
    } else if (props.harmony.root === 'W') {
        return (
            <span className="ui medium text">
                {' '}{props.harmony.shift ?? null}
                {props.harmony.quality ? <span className="ui small text">{props.harmony.quality}</span> : null}
                {props.harmony.inversion ? <span className="ui big text">{props.harmony.inversion}</span> : null}
            </span>
        );
    } else if (props.harmony.root || props.harmony.shift || props.harmony.quality || props.harmony.inversion) {
        let shift;
        const root = ['numeric', 'berklee'].includes(props.notation) ? props.harmony.degree : props.harmony.root;

        if (['numeric', 'berklee'].includes(props.notation)) {
            if (props.harmony.degreeShift && props.harmony.degreeShift < 0) {
                shift = [...Array(Math.abs(props.harmony.degreeShift))].map(() => 'b').join('');
            } else if (props.harmony.degreeShift && props.harmony.degreeShift > 0) {
                shift = [...Array(props.harmony.degreeShift)].map(() => '#').join('');
            }
        } else {
            shift = props.harmony.shift ?? null;
        }

        return (
            <span className="ui big text">
                {['numeric', 'berklee'].includes(props.notation) ? [shift, root].join('') : [root, shift].join('')}
                {props.harmony.quality ? <span className="ui small text">{props.harmony.quality}</span> : null}
                {props.harmony.inversion ? <span className="ui small text">{props.harmony.inversion}</span> : null}
            </span>
        );
    }

    return null;
});
