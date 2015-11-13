var Metronome = React.createClass({
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
     * the last "box" we drew on the screen
     */
    last16thNoteDrawn: -1,
    notesInQueue: [],
    /**
     * Canvas settings
     */
    canvas: null,
    canvasContext: null,
    canvasWidth: 200,
    canvasHeight: 100,
    canvasStrokeStyle: '#fff',
    canvasLineWidth: 2,

    getInitialState() {
        return {
            tempo: 120.0,
            /**
             * 0 == 16th,
             * 1 == 8th,
             * 2 == quarter note
             */
            noteResolution: 4,
            isPlaying: false
        };
    },

    init() {
        var scheduler = this.scheduler;

        // Init canvas
        this.canvas = this.refs.canvas.getDOMNode();
        this.canvasContext = this.canvas.getContext('2d');
        this.canvasContext.strokeStyle = this.canvasStrokeStyle;
        this.canvasContext.lineWidth = this.canvasLineWidth;
        window.onorientationchange = this.resetCanvas;
        window.onresize = this.resetCanvas;
        this.resetCanvas();

        // Init audio context
        this.audioContext = new AudioContext();

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

    play() {
        this.setState({isPlaying: !this.state.isPlaying}, function () {
            if (this.state.isPlaying) {
                this.current16thNote = 0;
                this.nextNoteTime = this.audioContext.currentTime;
                this.timerWorker.postMessage("start");
            } else {
                this.timerWorker.postMessage("stop");
            }
        });
    },

    draw() {
        var currentNote = this.last16thNoteDrawn;
        var currentTime = this.audioContext.currentTime;

        while (this.notesInQueue.length && this.notesInQueue[0].time < currentTime) {
            currentNote = this.notesInQueue[0].note;
            // remove note from queue
            this.notesInQueue.splice(0, 1);
        }

        // We only need to draw if the note has moved.
        if (this.last16thNoteDrawn != currentNote) {
            var x = Math.floor(this.canvas.width / 18);
            this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (var i = 0; i < 16; i++) {
                this.canvasContext.fillStyle = ( currentNote == i ) ?
                    ((currentNote % 4 === 0) ? "red" : "blue") : "black";
                this.canvasContext.fillRect(x * (i + 1), x, x / 2, x / 2);
            }
            this.last16thNoteDrawn = currentNote;
        }

        // set up to draw again
        requestAnimationFrame(this.draw);
    },

    /**
     * resize and clear canvas
     */
    resetCanvas() {
        this.canvas.width = $(this.refs.card.getDOMNode()).width();
        this.canvas.height = this.canvasHeight;
    },

    scheduler() {
        // while there are notes that will need to play before the next interval,
        // schedule them and advance the pointer.
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
            this.scheduleNote(this.current16thNote, this.nextNoteTime);
            this.nextNote();
        }
    },

    /**
     * Advance current note and time by a 16th note
     */
    nextNote() {
        var secondsPerBeat = 60.0 / this.state.tempo;
        this.nextNoteTime += 0.25 * secondsPerBeat;

        this.current16thNote++;    // Advance the beat number, wrap to zero
        if (this.current16thNote == 16) {
            this.current16thNote = 0;
        }
    },

    scheduleNote(beatNumber, time) {
        // push the note on the queue, even if we're not playing.
        this.notesInQueue.push({note: beatNumber, time: time});

        if ((this.state.noteResolution == 8) && (beatNumber % 2)) {
            // we're not playing non-8th 16th notes
            return;
        }
        if ((this.state.noteResolution == 4) && (beatNumber % 4)) {
            // we're not playing non-quarter 8th notes
            return;
        }

        // create an oscillator
        var osc = this.audioContext.createOscillator();
        osc.connect(this.audioContext.destination);
        if (beatNumber % 16 === 0) {
            // beat 0 == low pitch
            osc.frequency.value = 880.0;
        } else if (beatNumber % 4 === 0) {
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
    },

    changeResolution(value) {
        this.setState({noteResolution: value});
    },

    componentDidMount() {
        //var changeResolution = this.changeResolution;
        this.init();
        //$('.ui.radio.checkbox')
        //    .checkbox({
        //        onChange: () => {
        //            changeResolution($(this).val());
        //        }
        //    });

        $('.ui.dropdown')
            .dropdown({
                onChange: (value) => {
                    this.changeResolution(value);
                }
            })
            .dropdown('set selected', this.state.noteResolution);
    },

    render() {
        var playButtonText = this.state.isPlaying ? 'stop' : 'play';
        var playButtonIcon = this.state.isPlaying ? 'red stop icon' : 'blue play icon';
        return (
            <div className="metronome">
                <div className="ui centered card">
                    <div className="content" ref="card">
                        <canvas ref="canvas">Canvas not supported!</canvas>
                    </div>
                    <div className="extra content">
                        <div id="controls">
                            <div id="tempoBox">
                                Tempo: <span id="showTempo">{this.state.tempo}</span><br/>
                                <input
                                    id="tempo"
                                    type="range"
                                    min="30"
                                    max="160"
                                    value={this.state.tempo}
                                    onChange={this.changeTempo}
                                />
                            </div>
                            <div className="ui divider"></div>
                            <div className="ui fluid selection dropdown">
                                <input type="hidden" name="gender"/>
                                <i className="dropdown icon"></i>
                                <div className="default text">Gender</div>
                                <div className="menu">
                                    <div className="item" data-value="4">Quarter</div>
                                    <div className="item" data-value="8">8th</div>
                                    <div className="item" data-value="16">16th</div>
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