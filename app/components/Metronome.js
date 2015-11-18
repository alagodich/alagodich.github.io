var Metronome = React.createClass({
    minTempo: 30,
    maxTempo: 250,
    audioContext: null,
    timeWorker: null,
    lookAhead: 25.0,
    current16thNote: 0.0,
    /**
     * How far ahead to schedule audio (sec)
     */
    scheduleAheadTime: 0.1,
    /**
     * This is calculated from lookahead, and overlaps
     * with next interval (in case the timer is late)
     */
    nextNoteTime: 0.0,
    noteLength: 0.05,
    /**
     * The last "box" we drew on the screen
     */
    last16thNoteDrawn: -1,
    notesInQueue: [],
    /**
     * Canvas settings
     */
    canvas: null,
    canvasContext: null,
    canvasWidth: 300,
    canvasHeight: 100,
    canvasStrokeStyle: '#fff',
    canvasLineWidth: 2,
    quarterNoteColor: '#DB2828',
    eighthNoteColor: '#2185D0',
    sixteenthNoteColor: '#eee',

    getInitialState() {
        return {
            tempo: 110.0,
            /**
             * 0 == 16th,
             * 1 == 8th,
             * 2 == quarter note
             */
            noteResolution: 4,
            isPlaying: false,
            signature: '4/4'
        };
    },

    /**
     * Init canvas, audio context and worker
     * Start drawer loop
     */
    init() {
        var scheduler = this.scheduler,
            AudioContext = window.AudioContext // Default
                || window.webkitAudioContext // Safari and old versions of Chrome
                || false;

        // Init canvas
        this.canvas = this.refs.canvas.getDOMNode();
        this.canvasContext = this.canvas.getContext('2d');
        this.canvasContext.strokeStyle = this.canvasStrokeStyle;
        this.canvasContext.lineWidth = this.canvasLineWidth;
        window.onorientationchange = this.resetCanvas;
        window.onresize = this.resetCanvas;
        this.resetCanvas();

        // Init audio context
        if (AudioContext) {
            this.audioContext = new AudioContext();
        } else {
            // Web Audio API is not supported
            alert("Sorry, but the Web Audio API is not supported by your browser. " +
                "Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox");
            return;
        }

        // Init Worker
        this.timerWorker = new Worker("assets/metronome/metronomeworker.js");
        this.timerWorker.onmessage = function (e) {
            if (e.data == "tick") {
                scheduler();
            } else {
                console.log("message: " + e.data);
            }
        };
        this.timerWorker.postMessage({"interval": this.lookahead});

        // Start the drawing loop.
        requestAnimationFrame(this.draw);
    },

    /**
     * Toggle worker by sending start or stop
     */
    play() {
        this.setState({isPlaying: !this.state.isPlaying}, function () {
            if (this.state.isPlaying) {
                this.current16thNote = -1;
                this.nextNoteTime = this.audioContext.currentTime;
                this.timerWorker.postMessage("start");
            } else {
                this.timerWorker.postMessage("stop");
            }
        });
    },

    /**
     * Restart metronome if it was playing
     */
    startOver() {
        if (this.state.isPlaying) {
            this.play();
            this.play();
            //this.timerWorker.postMessage("stop");
            //this.current16thNote = -1;
            //this.nextNoteTime = this.audioContext.currentTime;
            //this.timerWorker.postMessage("start");
        }
    },

    /**
     * Draw canvas on note change
     */
    draw() {
        var currentNote = this.last16thNoteDrawn,
            currentTime = this.audioContext.currentTime,
            segments = this.state.signature === '4/4' ? 16 : 9,
            quarter = this.state.signature === '4/4' ? 4 : 3,
            x = Math.floor(this.canvas.width / (segments + 2));

        while (this.notesInQueue.length && this.notesInQueue[0].time < currentTime) {
            currentNote = this.notesInQueue[0].note;
            this.notesInQueue.splice(0, 1);
        }

        // We only need to draw if the note has moved.
        if (this.last16thNoteDrawn != currentNote) {
            this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (var i = 0; i < segments; i++) {
                this.canvasContext.fillStyle =
                    (currentNote == i)
                        ? ((currentNote % quarter === 0) ? this.quarterNoteColor : this.eighthNoteColor)
                        : this.sixteenthNoteColor;
                this.canvasContext.fillRect((x * (i + 1)) + 7, 30, x - 1, x * 3);
            }
            this.last16thNoteDrawn = currentNote;
        }

        // Set up to draw again
        requestAnimationFrame(this.draw);
    },

    /**
     * resize and clear canvas
     */
    resetCanvas() {
        this.canvas.width = $(this.refs.card.getDOMNode()).width();
        this.canvas.height = this.canvasHeight;
    },

    /**
     * While there are notes that will need to play before the next interval,
     * schedule them and advance the pointer.
     */
    scheduler() {
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
            this.scheduleNote(this.current16thNote, this.nextNoteTime);
            this.nextNote();
        }
    },

    /**
     * Advance current note and time by a 16th note
     */
    nextNote() {
        var secondsPerBeat = 60.0 / this.state.tempo,
            lastNote = this.state.signature === '4/4' ? 16 : 9,
            // Multiplier of the 16th note
            multiplier = this.state.signature === '4/4' ? 0.25 : 0.33;

        this.nextNoteTime += secondsPerBeat * multiplier;

        // Advance the beat number, wrap to zero
        this.current16thNote++;
        if (this.current16thNote == lastNote) {
            this.current16thNote = 0;
        }
    },

    /**
     * Playing note here
     * @param beatNumber
     * @param time
     */
    scheduleNote(beatNumber, time) {
        // create an oscillator
        var osc = this.audioContext.createOscillator(),
            quarter = this.state.signature === '4/4' ? 4 : 3;

        // push the note on the queue, even if we're not playing.
        this.notesInQueue.push({note: beatNumber, time: time});

        if (this.state.noteResolution == 16 && this.state.signature === '3/4') {
            if ([1, 4, 7, 10].indexOf(beatNumber) > -1) {
                // Skip second beat
                return;
            }
        }

        if (this.state.noteResolution == 8) {
            if ((this.state.signature === '4/4') && (beatNumber % 2)) {
                // Don't play 16ths in 4/4
                return;
            }
            if ((this.state.signature === '3/4')) {
                // Play all
                //return;
            }
        }
        if (this.state.noteResolution == 4) {
            if ((this.state.signature === '4/4') && (beatNumber % 4)) {
                // Don't play 8th
                return;
            }
            if ((this.state.signature === '3/4') && (beatNumber % 3)) {
                // Don't play 8th
                return;
            }
        }

        osc.connect(this.audioContext.destination);
        if (beatNumber === 0) {
            // beat 0 == low pitch
            osc.frequency.value = 880.0;
        } else if (beatNumber % quarter === 0) {
            // quarter notes = medium pitch
            osc.frequency.value = 440.0;
        } else {
            // other 16th notes = high pitch
            osc.frequency.value = 220.0;
        }

        osc.start(time);
        osc.stop(time + this.noteLength);
    },

    changeTempo(event) {
        this.setState({tempo: event.target.value});
        this.startOver();
    },

    changeResolution(value) {
        this.setState({noteResolution: value});
        this.startOver();
    },

    changeSignature(value) {
        this.setState({signature: value})
        this.startOver();
    },

    componentDidMount() {
        var changeResolution = this.changeResolution,
            changeSignature = this.changeSignature;
        this.init();
        $('.ui.resolution.radio.checkbox')
            .checkbox({
                onChange() {
                    changeResolution(this.value);
                }
            }).first().checkbox('check');
        $('.ui.signature.radio.checkbox')
            .checkbox({
                onChange() {
                    changeSignature(this.value);
                }
            }).first().checkbox('check');
    },

    render() {
        var playButtonText = this.state.isPlaying ? 'stop' : 'play',
            playButtonIcon = this.state.isPlaying ? 'red stop icon' : 'blue play icon',
            sixteenthResolutionText = this.state.signature === '4/4' ? '16th' : 'Shuffle';
        return (
            <div className="metronome">
                <div className="ui centered card">
                    <div className="content" ref="card">
                        <canvas ref="canvas" className="canvas">Canvas not supported!</canvas>
                    </div>
                    <div className="extra content ui form">
                        <div id="controls">
                            <div id="tempoBox">
                                Tempo: <span id="showTempo">{this.state.tempo}</span><br/>
                                <input
                                    id="tempo"
                                    type="range"
                                    min={this.minTempo}
                                    max={this.maxTempo}
                                    value={this.state.tempo}
                                    onChange={this.changeTempo}
                                    className="metronome__slider"
                                />
                            </div>

                            <div className="ui divider"></div>

                            <div className="inline fields">
                                <div className="field">
                                    <div className="ui resolution radio checkbox">
                                        <input type="radio"
                                               name="resolution"
                                               value="4"
                                               tabindex="0"
                                               className="hidden"/>
                                        <label>Quarter</label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui resolution radio checkbox">
                                        <input type="radio"
                                               name="resolution"
                                               value="8"
                                               tabindex="0"
                                               className="hidden"/>
                                        <label>8th</label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui resolution radio checkbox">
                                        <input type="radio"
                                               name="resolution"
                                               value="16"
                                               tabindex="0"
                                               className="hidden"/>
                                        <label>{sixteenthResolutionText}</label>
                                    </div>
                                </div>
                            </div>

                            <div className="ui divider"></div>

                            <div className="inline fields">
                                <div className="field">
                                    <div className="ui signature radio checkbox">
                                        <input type="radio"
                                               name="signature"
                                               value="4/4"
                                               tabindex="0"
                                               className="hidden"/>
                                        <label>4/4</label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui signature radio checkbox">
                                        <input type="radio"
                                               name="signature"
                                               value="3/4"
                                               tabindex="0"
                                               className="hidden"/>
                                        <label>3/4</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="ui bottom attached button" onClick={this.play}>
                        <i className={playButtonIcon}></i>
                        {playButtonText}
                    </div>
                </div>

            </div>
        );
    }
});

module.exports = Metronome;