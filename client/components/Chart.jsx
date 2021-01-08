import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Chord from './Chord.jsx';

const propTypes = {
    data: PropTypes.object
};

class Chart extends Component {

    renderChart() {
        const items = [];
        let row = [],
            counter = 0,
            inRepeat = false;

        function processBarline(barlines) {
            let left, right, top;
            if (!barlines) {
                return [null, null, null];
            }
            for (const barline of barlines) {
                const style = barline['bar-style'];

                if (barline.$.location === 'left' && style) {
                    left = `barline--left--${style}`;
                }
                if (barline.$.location === 'right' && style) {
                    right = `barline--right--${style}`;
                }

                if (barline.$.location === 'right' && barline.ending && barline.ending[0].$.type === 'discontinue') {
                    top = 'barline--top--light';
                }
            }
            return [left, right, top];
        }

        function getBarlinesClassnames(barlines, first) {
            const classNames = [],
                barlineClassNames = processBarline(barlines),
                top = barlineClassNames[2];
            let left = barlineClassNames[0],
                right = barlineClassNames[1];

            if (!left && first) {
                left = 'barline--left--light';
            }
            if (left) {
                classNames.push(left);
            }

            right = right ? right : 'barline--right--light';
            classNames.push(right);

            if (top) {
                classNames.push(top);
            }

            return classNames;
        }

        function processBarChords(bar) {
            const chords = [];

            bar.harmony.forEach((chord, number) => {
                const duration = bar.note[number].type[0];
                chords.push(<Chord key={number} config={chord} duration={duration}/>);
            });
            return <div className="ui grid chords">{chords}</div>;
        }

        function secondRepeat(bar) {
            if (bar.barline && bar.barline[1] && bar.barline[1].$.location === 'left') {
                if (bar.barline[1].ending[0].$.type === 'start' && bar.barline[1].ending[0].$.number === '2') {
                    return true;
                }
            }
            return false;
        }

        for (const barConfig of this.props.data.measure) {
            const bar = processBarChords(barConfig),
                index = this.props.data.measure.indexOf(barConfig),
                first = counter === 0,
                last = index === this.props.data.measure.length - 1,
                lastInRow = counter === 3,
                repeatEnded = barConfig.barline
                    && barConfig.barline[0]
                    && barConfig.barline[0].$.location === 'right'
                    && barConfig.barline[0]['bar-style']
                    && barConfig.barline[0]['bar-style'][0] === 'light-light';
            let classNames = ['column', 'bar'].concat(getBarlinesClassnames(barConfig.barline, first));

            if (secondRepeat(barConfig)) {
                classNames = classNames.concat(['right', 'floated']);
                inRepeat = true;
            }

            row.push(<div key={index} className={classNames.join(' ')}>{bar}</div>);
            counter++;

            if (last || lastInRow || (inRepeat && repeatEnded)) {
                items.push(<div key={index} className="row">{row}</div>);
                row = [];
                counter = 0;
                inRepeat = false;
            }

        }
        return <div className="ui four column grid chart">{items}</div>;
    }

    render() {
        const chart = this.props.data ? this.renderChart() : 'Loading...';
        return (
            <div>{chart}</div>
        );
    }
}

Chart.propTypes = propTypes;

export default Chart;
