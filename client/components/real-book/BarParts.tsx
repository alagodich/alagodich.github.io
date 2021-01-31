/* eslint react/no-multi-comp: 0 */
import React, {ReactElement} from 'react';
import {IViewBox} from './SvgChartBar';

interface IDecoratorProps {
    viewBox: IViewBox;
    value?: number | string;
    shouldPushLeft?: boolean;
    shift?: string;
    horizontalRootPosition?: number;
}

interface IOtherSignProps {
    viewBox: IViewBox;
    value: string;
}

// Chord parts
export const RootDecorator = React.memo((props: IDecoratorProps): ReactElement => {
    const textProps: React.SVGProps<SVGTSpanElement> = {
        dx: props.shouldPushLeft ? 15 : 0,
        y: props.viewBox.y - 10
    };

    if (props.horizontalRootPosition) {
        textProps.x = props.horizontalRootPosition;
    }

    return (
        <tspan {...textProps}>
            {props.value}
        </tspan>
    );
});
export const QualityDecorator = React.memo((props: IDecoratorProps): ReactElement =>
    <tspan
        fontSize={'0.5em'}
        letterSpacing={-4}
        dx={props.shift ? -20 : -5}
        y={props.viewBox.y - 10}
    >
        {props.value}
    </tspan>
);
export const NumericQualityDecorator = React.memo((props: IDecoratorProps): ReactElement =>
    <tspan
        fontSize={'0.5em'}
        letterSpacing={-4}
        dx={-5} y={props.viewBox.y - 10}
    >
        {props.value}
    </tspan>
);
export const ShiftDecorator = React.memo((props: IDecoratorProps): ReactElement =>
    <tspan fontSize={'0.5em'} dx={-5} y={props.viewBox.y - 40}>{props.value}</tspan>);
export const NumericShiftDecorator = React.memo((props: IDecoratorProps): ReactElement =>
    <tspan fontSize={'0.5em'} dx={0} y={props.viewBox.y - 40}>{props.value}</tspan>);
export const InversionDecorator = React.memo((props: IDecoratorProps): ReactElement =>
    <tspan
        fontSize={'0.6em'}
        letterSpacing={-4}
        dx={0}
        y={props.viewBox.y}
    >
        {props.value}
    </tspan>
);

// Alt chord parts
export const AltRootDecorator = React.memo((props: IDecoratorProps): ReactElement =>
    <tspan dx={props.shouldPushLeft ? props.viewBox.x / 11 : 0}>{props.value}</tspan>);
export const AltShiftDecorator = React.memo((props: IDecoratorProps): ReactElement =>
    <tspan fontSize={'0.8em'} dx={0}>{props.value}</tspan>);
export const AltQualityDecorator = React.memo((props: IDecoratorProps): ReactElement =>
    <tspan fontSize={'0.8em'} letterSpacing={-2}>{props.value}</tspan>);
export const AltInversionDecorator = React.memo((props: IDecoratorProps): ReactElement =>
    <tspan fontSize={'0.6em'} letterSpacing={-2}>{props.value}</tspan>);

// Other bar signs
export const Pause = React.memo((): ReactElement =>
    <tspan fontWeight={100} dx={20}>{'/'}</tspan>);
export const NoChord = React.memo((): ReactElement =>
    <tspan fontSize={'0.7em'} letterSpacing={-10} dx={20}>{' N.C. '}</tspan>);
export const BarRepeat = React.memo((props: IDecoratorProps): ReactElement => (
    <React.Fragment>
        <line
            x1={props.viewBox.x / 2 - 20}
            y1={props.viewBox.y - 27}
            x2={props.viewBox.x / 2 + 20}
            y2={27}
            stroke={'black'}
            strokeWidth={4}
        />
        <circle
            cx={props.viewBox.x / 2 - 15}
            cy={props.viewBox.y / 2 - 10}
            r={3} stroke={'black'}
            strokeWidth={2}
        />
        <circle
            cx={props.viewBox.x / 2 + 15}
            cy={props.viewBox.y / 2 + 10}
            r={3}
            stroke={'black'}
            strokeWidth={2}
        />
    </React.Fragment>
));
export const Coda = React.memo((props: IDecoratorProps): ReactElement =>
    <React.Fragment>
        <ellipse
            cx={props.viewBox.x - 20}
            cy={18}
            rx={8}
            ry={11}
            fill={'none'}
            stroke={'black'}
            strokeWidth={4}
        />
        <line
            x1={props.viewBox.x - 20}
            y1={1}
            x2={props.viewBox.x - 20}
            y2={35}
            stroke={'black'}
            strokeWidth={4}
        />
        <line
            x1={props.viewBox.x - 32}
            y1={18}
            x2={props.viewBox.x - 8}
            y2={18}
            stroke={'black'}
            strokeWidth={4}
        />
    </React.Fragment>
);
export const Fermata = React.memo((): ReactElement =>
    <React.Fragment>
        <path
            d={'M 30 20 A 15 15 0 0 1 60 20'}
            stroke={'black'}
            strokeWidth={4}
            fill={'none'}
        />
        <circle
            cx={45}
            cy={16}
            r={2}
            stroke={'black'}
            strokeWidth={2}
        />
    </React.Fragment>
);
export const TimeSignature = React.memo((props: IOtherSignProps): ReactElement => {
    const [beats, division] = props.value.split(' / ');
    const fontSize = props.viewBox.y / 4;

    return (
        <React.Fragment>
            <text x={8} y={props.viewBox.y / 2 - (fontSize / 2)} fontSize={fontSize}>
                {beats}
            </text>
            <text x={8} y={props.viewBox.y - fontSize + 5} fontSize={fontSize}>
                {division}
            </text>
            <line
                x1={9}
                y1={props.viewBox.y / 2}
                x2={21}
                y2={props.viewBox.y / 2}
                stroke={'black'}
                strokeWidth={2}
            />
        </React.Fragment>
    );
});

export const Ending = React.memo((props: IOtherSignProps): ReactElement =>
    <React.Fragment>
        <line
            x1={2}
            y1={0}
            x2={props.viewBox.x / 1.5}
            y2={0}
            stroke={'black'}
            strokeWidth={2}
        />
        <text
            textAnchor={'start'}
            x={9}
            y={15}
        >
            {`${props.value.slice(-1)}.`}
        </text>
    </React.Fragment>
);

export const OpeningLine = React.memo((props: IOtherSignProps): ReactElement | null => {
    switch (props.value) {
        case '|':
            return (
                <line
                    x1={2}
                    y1={0}
                    x2={2}
                    y2={props.viewBox.y}
                    stroke={'black'}
                    strokeWidth={2}
                />
            );
        case '[':
            return (
                <React.Fragment>
                    <line
                        x1={2}
                        y1={0}
                        x2={2}
                        y2={props.viewBox.y}
                        stroke={'black'}
                        strokeWidth={2}
                    />
                    <line
                        x1={6}
                        y1={0}
                        x2={6}
                        y2={props.viewBox.y}
                        stroke={'black'}
                        strokeWidth={2}
                    />
                </React.Fragment>
            );
        case '{':
            return (
                <React.Fragment>
                    <polyline
                        points={`14 0, 2 10, 2 ${props.viewBox.y - 10}, 14 ${props.viewBox.y}`}
                        stroke={'black'}
                        strokeWidth={6}
                        fill={'none'}
                    />
                    <circle
                        cx={6}
                        cy={props.viewBox.y / 2 - 5}
                        r={3}
                        stroke={'black'}
                        strokeWidth={2}
                    />
                    <circle
                        cx={6}
                        cy={props.viewBox.y / 2 + 5}
                        r={3}
                        stroke={'black'} strokeWidth={2}
                    />
                </React.Fragment>
            );
        default:
            return null;
            // TODO finish cleaning up closing/opening lines
            // throw new Error(`Unexpected opening bar line ${props.value}`);
    }

});

export const ClosingLine = React.memo((props: IOtherSignProps): ReactElement | null => {
    switch (props.value) {
        case '|':
            return (
                <line
                    x1={props.viewBox.x - 2}
                    y1={0}
                    x2={props.viewBox.x - 2}
                    y2={props.viewBox.y}
                    stroke={'black'}
                    strokeWidth={2}
                />
            );
        case ']':
            return (
                <React.Fragment>
                    <line
                        x1={props.viewBox.x - 1}
                        y1={0}
                        x2={props.viewBox.x - 1}
                        y2={props.viewBox.y}
                        stroke={'black'}
                        strokeWidth={2}
                    />
                    <line
                        x1={props.viewBox.x - 5}
                        y1={0}
                        x2={props.viewBox.x - 5}
                        y2={props.viewBox.y}
                        stroke={'black'}
                        strokeWidth={2}
                    />
                </React.Fragment>
            );
        case '}': {
            const points = [
                `${props.viewBox.x - 15} 0`,
                `${props.viewBox.x - 2} 10`,
                `${props.viewBox.x - 2} ${props.viewBox.y - 10}`,
                `${props.viewBox.x - 15} ${props.viewBox.y}`
            ].join(', ');

            return (
                <React.Fragment>
                    <polyline
                        points={points}
                        stroke={'black'}
                        strokeWidth={6}
                        fill={'none'}
                    />
                    <circle
                        cx={props.viewBox.x - 7}
                        cy={props.viewBox.y / 2 - 5}
                        r={3}
                        stroke={'black'}
                        strokeWidth={2}
                    />
                    <circle
                        cx={props.viewBox.x - 7}
                        cy={props.viewBox.y / 2 + 5}
                        r={3}
                        stroke={'black'}
                        strokeWidth={2}
                    />
                </React.Fragment>
            );
        }
        case 'Z':
            return (
                <React.Fragment>
                    <line
                        x1={props.viewBox.x - 3}
                        y1={0}
                        x2={props.viewBox.x - 3}
                        y2={props.viewBox.y}
                        stroke={'black'}
                        strokeWidth={6}
                    />
                    <line
                        x1={props.viewBox.x - 9}
                        y1={0}
                        x2={props.viewBox.x - 9}
                        y2={props.viewBox.y}
                        stroke={'black'}
                        strokeWidth={2}
                    />
                </React.Fragment>
            );
        default:
            return null;
            // TODO finish cleaning up closing/opening lines
            // throw new Error(`Unexpected closing bar line ${props.value}`);
    }
});
