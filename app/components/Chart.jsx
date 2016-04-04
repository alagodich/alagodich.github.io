import React, {Component, PropTypes} from 'react';

const propTypes = {
    title: PropTypes.string,
    data: PropTypes.object
};

class Chart extends Component {

    renderChart() {
        const items = [];

        function processBarline(barlines) {
            let left, right;
            if (!barlines) {
                return [null, null];
            }
            for (const barline of barlines) {
                if (barline.$.location === 'left') {
                    left = `barline--left--${barline['bar-style']}`;
                }
                if (barline.$.location === 'right') {
                    right = `barline--right--${barline['bar-style']}`;
                }
            }
            return [left, right];
        }

        function getBarlinesClassnames(barlines, index) {
            const classNames = [],
                barlineClassNames = processBarline(barlines);
            let left = barlineClassNames[0],
                right = barlineClassNames[1];

            if (!left && index % 4 === 0) {
                left = 'barline--left--light';
            }
            if (left) {
                classNames.push(left);
            }

            right = right ? right : 'barline--right--light';
            classNames.push(right);

            return classNames;
        }

        function processBarChords(bar) {
            const chords = [];

            bar.harmony.forEach((chord, number) => {
                const step = chord.root[0]['root-step'][0],
                    alter = chord.root[0]['root-alter'][0],
                    kind = chord.kind[0].$.text,
                    duration = bar.note[number].type[0];
                let alterSign;

                if (alter === '-1') {
                    alterSign = 'b';
                }
                if (alter === '1') {
                    alterSign = '#';
                }

                chords.push(
                    <span key={number} className={`chord--${duration}`}>
                        <span className="chord__step">{step}</span>
                        <span className="chord__alter">{alterSign}</span>
                        <span className="chord__kind">{kind}</span>
                    </span>
                );
            });
            return chords;
        }

        for (const bar of this.props.data.measure) {
            const chords = processBarChords(bar),
                index = this.props.data.measure.indexOf(bar),
                classNames = ['four', 'wide', 'column', 'bar'].concat(getBarlinesClassnames(bar.barline, index));

            /**
             * TODO
             * Move to another component Bar
             * Add <direction placement="above"> to mark part (A - A - B - A)
             */
            items.push(<div key={index} className={classNames.join(' ')}>{chords}</div>);
        }
        return <div className="ui grid chart">{items}</div>;
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
