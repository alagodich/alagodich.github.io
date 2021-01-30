/* eslint react/no-multi-comp: 0 */
import React, {ReactElement} from 'react';
import {IViewBox} from './SvgChartBar';

interface IDecoratorProps {
    viewBox: IViewBox;
    value?: number | string;
    shouldPushLeft?: boolean;
    shift?: string;
}

export const RootDecorator = React.memo((props: IDecoratorProps): ReactElement =>
    <tspan dx={props.shouldPushLeft ? 15 : 0} y={props.viewBox.y - 10}>{props.value}</tspan>);
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
    <tspan fontSize={'0.5em'} letterSpacing={-4} dx={-5} y={props.viewBox.y - 10}>{props.value}</tspan>);
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


export const AltRootDecorator = React.memo((props: IDecoratorProps): ReactElement =>
    <tspan dx={props.shouldPushLeft ? props.viewBox.x / 11 : 0}>{props.value}</tspan>);
export const AltShiftDecorator = React.memo((props: IDecoratorProps): ReactElement =>
    <tspan fontSize={'0.8em'} dx={0}>{props.value}</tspan>);
export const AltQualityDecorator = React.memo((props: IDecoratorProps): ReactElement =>
    <tspan fontSize={'0.8em'} letterSpacing={-2}>{props.value}</tspan>);
export const AltInversionDecorator = React.memo((props: IDecoratorProps): ReactElement =>
    <tspan fontSize={'0.6em'} letterSpacing={-2}>{props.value}</tspan>);

export const PauseDecorator = React.memo((): ReactElement =>
    <tspan fontWeight={100} dx={20}>{'/'}</tspan>);
export const NoChordDecorator = React.memo((): ReactElement =>
    <tspan fontSize={'0.7em'} letterSpacing={-10} dx={20}>{' N.C. '}</tspan>);
export const BarRepeatDecorator = React.memo((props: IDecoratorProps): ReactElement => (
    <React.Fragment>
        <line
            x1={props.viewBox.x / 2 - 20}
            y1={props.viewBox.y - 27}
            x2={props.viewBox.x / 2 + 20}
            y2={27}
            stroke={'black'}
            strokeWidth={4}
            key={'bar-repeat-1'}
        />
        <circle
            cx={props.viewBox.x / 2 - 15}
            cy={props.viewBox.y / 2 - 10}
            r={3} stroke={'black'}
            strokeWidth={2}
            key={'bar-repeat-2'}
        />
        <circle
            cx={props.viewBox.x / 2 + 15}
            cy={props.viewBox.y / 2 + 10}
            r={3}
            stroke={'black'}
            strokeWidth={2}
            key={'bar-repeat-3'}
        />
    </React.Fragment>
));
