var Metronome = React.createClass({
    minTempo: 30,
    maxTempo: 200,
    minVolume: 0,
    maxVolume: 100,
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
    quartersQuantity: null,
    sixteenthQuantity: null,
    nextNoteMultiplier: null,
    /**
     * Canvas settings
     */
    canvas: null,
    canvasContext: null,
    canvasWidth: 300,
    canvasHeight: 100,
    canvasStrokeStyle: '#FFF',
    canvasLineWidth: 2,
    quarterNoteColor: '#DB2828',
    eighthNoteColor: '#2185D0',
    sixteenthNoteColor: '#EEE',
    /**
     * Unlocked AudioContext on iOS devices
     */
    unlocked: false,
    decodedBeatSound: null,
    playButton: null,

    getInitialState() {
        return {
            tempo: 101.0,
            noteResolution: '4',
            isPlaying: false,
            signature: '4/4',
            accentFirstBeat: false,
            volume: 0.5,
            useOscillator: true
        };
    },

    /**
     * Init canvas, audio context and worker
     * Pre-load beat sound
     * Start drawer loop
     */
    init() {
        var scheduler = this.scheduler,
            AudioContext = window.AudioContext // Default
                || window.webkitAudioContext // Safari and old versions of Chrome
                || false;

        // Init play button
        this.playButton = $(this.refs.playButton.getDOMNode());

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

        // Pre-load beat sound
        this.loadBeatData().then(function(buffer) {
            this.decodedBeatSound = buffer;
        }.bind(this), function(error) {
            console.log('Cannot load beat sound.', error);
        });

        // Init Worker
        this.timerWorker = new Worker("assets/metronome/metronomeworker.js");
        this.timerWorker.onmessage = function (message) {
            if (message.data == "tick") {
                scheduler();
            }
        };
        this.timerWorker.postMessage({"interval": this.lookahead});

        // Start the drawing loop.
        requestAnimationFrame(this.draw);
    },

    initParams() {
        if (this.state.signature === '4/4') {
            this.sixteenthQuantity = this.state.noteResolution === '12' ? 12 : 16;
        }
        if (this.state.signature === '3/4') {
            this.sixteenthQuantity = this.state.noteResolution === '12' ? 9 : 12;
        }
        this.quartersQuantity = this.state.noteResolution === '12' ? 3 : 4;
        this.nextNoteMultiplier = this.state.noteResolution === '12' ? 0.33 : 0.25;
    },

    /**
     * Load mp3 beat data and decode it
     * @returns {*}
     */
    loadBeatData() {
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.open('get', 'assets/metronome/beat.mp3', true);
            request.responseType = 'arraybuffer';
            request.onload = function () {
                var audioData = request.response;
                this.audioContext.decodeAudioData(audioData, function (buffer) {
                    resolve(buffer);
                }, function (error) {
                    console.log('Error with decoding audio data. ' + error.err);
                    reject(error.err);
                });
            }.bind(this);
            request.send();
        }.bind(this));
    },

    /**
     * Toggle worker by sending start or stop
     */
    play() {
        this.unlock();
        this.setState({isPlaying: !this.state.isPlaying}, function () {
            if (this.state.isPlaying) {
                this.initParams();
                this.current16thNote = -1;
                this.nextNoteTime = this.audioContext.currentTime;
                this.timerWorker.postMessage("start");
            } else {
                this.timerWorker.postMessage("stop");
            }
        });
        this.playButton.focus();
    },

    /**
     * Restart metronome if it was playing
     * @note No need to change state of the object invoking play()
     */
    startOver() {
        if (this.state.isPlaying) {
            this.timerWorker.postMessage("stop");
            this.initParams();
            this.current16thNote = -1;
            this.nextNoteTime = this.audioContext.currentTime;
            this.timerWorker.postMessage("start");
        }
        this.playButton.focus();
    },

    /**
     * Draw canvas on note change
     */
    draw() {
        var currentNote = this.last16thNoteDrawn,
            currentTime = this.audioContext.currentTime,
            x = Math.floor(this.canvas.width / (this.sixteenthQuantity + 2));

        while (this.notesInQueue.length && this.notesInQueue[0].time < currentTime) {
            currentNote = this.notesInQueue[0].note;
            this.notesInQueue.splice(0, 1);
        }

        // We only need to draw if the note has moved.
        if (this.last16thNoteDrawn != currentNote) {
            this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (var i = 0; i < this.sixteenthQuantity; i++) {
                this.canvasContext.fillStyle =
                    (currentNote == i)
                        ? ((currentNote % this.quartersQuantity === 0) ? this.quarterNoteColor : this.eighthNoteColor)
                        : this.sixteenthNoteColor;
                this.canvasContext.fillRect((x * (i + 1)) + 7, 30, x - 1, x * 3);
            }
            this.last16thNoteDrawn = currentNote;
        }

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
        var secondsPerBeat = 60.0 / this.state.tempo;
        this.nextNoteTime += secondsPerBeat * this.nextNoteMultiplier;

        // Advance the beat number, wrap to zero
        this.current16thNote++;
        if (this.current16thNote == this.sixteenthQuantity) {
            this.current16thNote = 0;
        }
    },

    /**
     * Playing note here
     * @param beatNumber
     * @param time
     */
    scheduleNote(beatNumber, time) {
        var source;

        // push the note on the queue, even if we're not playing.
        this.notesInQueue.push({note: beatNumber, time: time});
        if (!this.noteShouldBePlayed(beatNumber)) {
            return;
        }

        // create an oscillator
        source = this.getAudioSource(beatNumber);

        source.start(time);
        source.stop(time + this.noteLength);
    },

    getAudioSource(beatNumber) {
        var source,
            gainNode = this.audioContext.createGain();

        if (this.state.useOscillator) {
            source = this.audioContext.createOscillator();
            if (beatNumber === 0) {
                // beat 0 == low pitch
                source.frequency.value = this.state.accentFirstBeat ? 880.0 : 440.0;
            } else if (beatNumber % this.quartersQuantity === 0) {
                // quarter notes = medium pitch
                source.frequency.value = 440.0;
            } else {
                // other 16th notes = high pitch
                source.frequency.value = 220.0;
            }
        } else {
            source = this.audioContext.createBufferSource();
            source.buffer = this.decodedBeatSound;
        }

        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        gainNode.gain.value = this.state.volume;
        return source;
    },

    /**
     * Unlock AudioContext on iOS devices
     * @see https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/PlayingandSynthesizingSounds/PlayingandSynthesizingSounds.html
     */
    unlock() {
        if (!this.iOS() || this.unlocked) {
            return;
        }

        // Create an empty buffer and play it
        var source = this.audioContext.createBufferSource();
        source.buffer = this.audioContext.createBuffer(1, 1, 22050);
        source.connect(this.audioContext.destination);
        source.noteOn(0);
        // By checking the play state after some time, we know if we're really unlocked
        setTimeout(function () {
            if ((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
                this.unlocked = true;
            }
        }, 0);
    },

    /**
     * Check for a known iOS device
     * @returns {boolean}
     */
    iOS() {
        var iDevices = [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ];

        while (iDevices.length) {
            if (navigator.platform === iDevices.pop()) {
                return true;
            }
        }

        return false;
    },

    /**
     * @param beatNumber
     * @returns {boolean}
     */
    noteShouldBePlayed(beatNumber) {
        // Play only quarter notes
        if (this.state.noteResolution === '4') {
            if (beatNumber % 4) {
                return false;
            }
        }
        // Skip the second beat
        if (this.state.noteResolution === '12') {
            if ([1, 4, 7, 10].indexOf(beatNumber) > -1) {
                // Skip the second beat
                return false;
            }
        }
        // Play eighths
        if (this.state.noteResolution === '8') {
            if (beatNumber % 2) {
                return false;
            }
        }
        return true;
    },

    changeTempo(event) {
        this.setState({tempo: event.target.value}, this.startOver);
    },

    changeResolution(value) {
        this.setState({noteResolution: value}, this.startOver);
    },

    changeSignature(value) {
        this.setState({signature: value}, this.startOver);
    },

    changeVolume(event) {
        this.setState({volume: event.target.value / 100});
    },

    toggleAccentFirstBeat() {
        this.setState({accentFirstBeat: !this.state.accentFirstBeat}, this.startOver);
    },

    toggleUseOscillator() {
        this.setState({useOscillator: !this.state.useOscillator}, this.startOver);
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
        this.playButton.focus();
    },

    render() {
        var playButtonText = this.state.isPlaying ? 'stop' : 'play',
            playButtonIcon = this.state.isPlaying ? 'red stop icon' : 'blue play icon',
            volume = parseInt(this.state.volume * 100);
        return (
            <div className="metronome">
                <div className="ui centered card">
                    <div className="content" ref="card">
                        <canvas ref="canvas" className="canvas">Canvas not supported!</canvas>
                    </div>
                    <div className="extra content ui form">
                        <div id="controls">
                            <div id="tempo">
                                Tempo: <span>{this.state.tempo}</span><br/>
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
                            <div id="volume">
                                Volume: <span>{volume}%</span><br/>
                                <input
                                    id="volume"
                                    type="range"
                                    min={this.minVolume}
                                    max={this.maxVolume}
                                    value={volume}
                                    onChange={this.changeVolume}
                                    className="metronome__slider"
                                />
                            </div>

                            <div style={{display: this.iOS() ? 'none' : 'block'}}>

                                <div className="ui divider"></div>

                                <div className="ui oscillator toggle checked checkbox">
                                    <input
                                        type="checkbox"
                                        tabindex="0"
                                        class="hidden"
                                        name="oscillator"
                                        checked={this.state.useOscillator}
                                        onChange={this.toggleUseOscillator}/>
                                    <label>Digital sound</label>
                                </div>
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
                                               value="12"
                                               tabindex="0"
                                               className="hidden"/>
                                        <label>Shuffle</label>
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

                            <div style={{display: this.state.useOscillator ? 'block' : 'none'}}>

                                <div className="ui divider"></div>

                                <div className="ui accent toggle checked checkbox">
                                    <input
                                        type="checkbox"
                                        tabindex="0"
                                        class="hidden"
                                        name="accent"
                                        checked={this.state.accentFirstBeat}
                                        onChange={this.toggleAccentFirstBeat}/>
                                    <label>Accent the first beat</label>
                                </div>
                            </div>

                            <div className="ui divider"></div>

                        </div>
                    </div>
                    <button className="ui bottom attached button" onClick={this.play} ref="playButton">
                        <i className={playButtonIcon}></i>
                        {playButtonText}
                    </button>
                </div>

            </div>
        );
    }
});

module.exports = Metronome;