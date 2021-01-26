import React, {ReactElement} from 'react';
import {IChordNotation, IIRealProChord} from './types';

interface IChordComponent {
    harmony: IIRealProChord;
    notation: IChordNotation;
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
        const root = props.notation === 'numeric' ? props.harmony.numeric : props.harmony.root;
        const shift = props.notation === 'numeric' ? null : props.harmony.shift ?? null;

        return (
            <span className="ui big text">
                {root}{shift}
                {props.harmony.quality ? <span className="ui small text">{props.harmony.quality}</span> : null}
                {props.harmony.inversion ? <span className="ui small text">{props.harmony.inversion}</span> : null}
            </span>
        );
    }

    return null;
});
