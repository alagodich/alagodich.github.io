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

    notesInQueue: [],
    quartersQuantity: null,
    sixteenthQuantity: null,
    nextNoteMultiplier: null,

    svg: null,
    svgWidth: null, // Depends on container width
    svgHeight: 50,
    svgPadding: 4,
    pointer: null,
    rulerLineWidth: 1,
    quarterSerifHeight: 14,
    eightSerifHeight: 7,
    spacing: null,

    rulerColor: '#979797',
    stressedNoteColor: '#DB2828',
    noteColor: '#2185D0',
    emptyNoteColor: '#EEE',
    /**
     * Unlocked AudioContext on iOS devices
     */
    unlocked: false,
    decodedBeatSound: null,
    playButton: null,

    browserCompatible: true,

    /**
     * Default params
     * @returns Object
     */
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
     * Init svg, audio context and worker
     * Pre-load beat sound
     * Start drawer loop
     */
    init() {
        var AudioContext = window.AudioContext // Default
            || window.webkitAudioContext // Safari and old versions of Chrome
            || false;

        // Init play button
        this.playButton = $(this.refs.playButton.getDOMNode());
        this.playButton.focus();

        this.initSvg();

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
        this.loadBeatData().then(function (buffer) {
            this.decodedBeatSound = buffer;
        }.bind(this), function (error) {
            console.log('Cannot load beat sound.', error);
        });

        // Init Worker
        this.timerWorker = new Worker("assets/metronome/metronomeworker.js");
        this.timerWorker.onmessage = function (message) {
            if (message.data == "tick") {
                this.scheduler();
            }
        }.bind(this);
        this.timerWorker.postMessage({"interval": this.lookAhead});
    },

    /**
     * Create svg with default ruler and pointer
     */
    initSvg() {
        var svgNode = this.refs.svg.getDOMNode(),
            cardWidth = $(this.refs.card.getDOMNode()).width();

        $(svgNode).width(cardWidth).height(50);
        $(this.refs.card.getDOMNode()).width();
        this.svg = Snap(svgNode);
        this.svgWidth = this.svg.node.width.baseVal.value - this.svgPadding * 2;

        this.drawRuler();
        this.drawPointer();
    },

    /**
     * Draw ruler depending on metronome params
     */
    drawRuler() {
        var ruler = this.svg.select('#ruler');
        // Remove existing ruler, before drawing a new one
        if (ruler) {
            ruler.remove();
        }
        this.initParams();
        this.spacing = ((this.svgWidth - (this.sixteenthQuantity * this.rulerLineWidth)) / this.sixteenthQuantity);
        // Draw ruler base line
        ruler = this.svg.group(
            this.svg.line(this.svgPadding / 2, this.svgHeight, this.svgWidth + (this.svgPadding), this.svgHeight)
        );
        for (var i = 0; i <= this.sixteenthQuantity; i++) {
            var x = (this.spacing * i) + (i * this.rulerLineWidth) + (this.svgPadding),
                y = (i % this.quartersQuantity === 0) ? this.quarterSerifHeight : this.eightSerifHeight;

            ruler.add(this.svg.line(x, this.svgHeight, x, this.svgHeight - y));
        }
        ruler.attr({
            stroke: this.rulerColor,
            strokeWidth: this.rulerLineWidth,
            id: 'ruler'
        });
    },

    /**
     * Draw transparent pointer
     */
    drawPointer() {
        this.pointer = this.svg.polygon([
            this.svgPadding, this.svgHeight - this.quarterSerifHeight,
            this.svgPadding + 3, this.svgHeight - 38,
            this.svgPadding - 3, this.svgHeight - 38,
            this.svgPadding, this.svgHeight - this.quarterSerifHeight
        ]).attr({
            fill: '#FFF'
        });
    },

    /**
     * Move pointer to the current beat serif and apply color
     */
    movePointer() {
        var animationSpeed = (1 / this.state.tempo) * 1500,
            x = (this.spacing * this.current16thNote) + (this.current16thNote),
            //serif = this.svg.select('line:nth-child(' + (this.current16thNote + 2) + ')'),
            color;

        if (this.state.accentFirstBeat && this.current16thNote === 0) {
            color = this.stressedNoteColor;
        } else {
            color = (this.current16thNote % this.quartersQuantity === 0) ? this.noteColor : this.emptyNoteColor;
        }

        this.pointer.animate({
            transform: 't' + x + ',0',
            fill: color
        }, animationSpeed);
    },

    /**
     * Init params from controls
     */
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
     * @returns Promise
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

        this.notesInQueue.push({note: beatNumber, time: time});
        this.movePointer();
        if (!this.noteShouldBePlayed(beatNumber)) {
            return;
        }

        // create an oscillator
        source = this.getAudioSource(beatNumber);
        source.start(time);
        source.stop(time + this.noteLength);
    },

    /**
     * Get audio source either oscillator generated or preloaded mp3
     * @param beatNumber
     * @returns {*}
     */
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
     * Detect IE
     * returns version of IE or false, if browser is not Internet Explorer
     */
    detectIE() {
        var userAgent = window.navigator.userAgent,
            msie = userAgent.indexOf('MSIE '),
            trident,
            edge;

        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(userAgent.substring(msie + 5, userAgent.indexOf('.', msie)), 10);
        }

        trident = userAgent.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = userAgent.indexOf('rv:');
            return parseInt(userAgent.substring(rv + 3, userAgent.indexOf('.', rv)), 10);
        }

        edge = userAgent.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(userAgent.substring(edge + 5, userAgent.indexOf('.', edge)), 10);
        }

        // other browser
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
        this.setState({noteResolution: value}, function () {
            this.drawRuler();
            this.startOver();
        });
    },

    changeSignature(value) {
        this.setState({signature: value}, function () {
            this.drawRuler();
            this.startOver();
        });
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

    /**
     * Display not supporting IE message
     */
    popups() {
        $('.blue.question.icon').popup({
            transition: 'vertical flip',
            inline: true,
            hoverable: true,
            delay: {
                show: 300,
                hide: 800
            }
        });
    },

    /**
     * Init metronome after the component is mounted
     * Init checkboxes
     */
    componentDidMount() {
        var self = this;
        if (this.detectIE()) {
            this.popups();
            return;
        }
        this.init();
        $('.ui.resolution.radio.checkbox')
            .checkbox({
                onChange: function () {
                    self.changeResolution(this.value);
                }
            });
        $('.ui.signature.radio.checkbox')
            .checkbox({
                onChange() {
                    self.changeSignature(this.value);
                }
            });
    },

    componentDidUpdate() {

    },

    render() {
        var playButtonText = this.state.isPlaying ? 'stop' : 'play',
            playButtonIcon = this.state.isPlaying ? 'red stop icon' : 'white play icon',
            volume = parseInt(this.state.volume * 100),
            IEVersion;

        if (IEVersion = this.detectIE()) {
            return (
                <div className="ui negative message">
                    <div className="header">Sorry internet explorer is not supported.</div>
                    Please install another browser (chrome, firefox, safari, opera etc).
                    <i ref="notSupported" className="blue question icon"/>
                    <div className="ui popup">
                        Unfortunately Internet explorer {IEVersion} <a
                        href="https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/currentTime"
                        target="_blank">does not support</a> currentTime property of audio context,
                        and it is required to calculate actual time properly, without delays.
                    </div>
                </div>
            );
        }
        return (
            <div className="metronome">
                <div className="ui centered card">
                    <div className="content" ref="card">
                        <a href="https://github.com/alagodich/alagodich.github.io/blob/master/app/components/Metronome.js"
                           target="_blank"
                           className="ui right corner blue label">
                            <i ref="notSupported" className="white github icon" style={{'text-decoration': 'none', cursor: 'pointer'}}/>
                        </a>
                        <svg ref="svg"/>
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
                                               className="hidden"
                                               checked={this.state.noteResolution === '4'}
                                        />
                                        <label>Quarter</label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui resolution radio checkbox">
                                        <input type="radio"
                                               name="resolution"
                                               value="8"
                                               tabindex="0"
                                               className="hidden"
                                               checked={this.state.noteResolution === '8'}
                                        />
                                        <label>8th</label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui resolution radio checkbox">
                                        <input type="radio"
                                               name="resolution"
                                               value="12"
                                               tabindex="0"
                                               className="hidden"
                                               checked={this.state.noteResolution === '12'}
                                        />
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
                                               className="hidden"
                                               checked={this.state.signature === '4/4'}
                                        />
                                        <label>4/4</label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui signature radio checkbox">
                                        <input type="radio"
                                               name="signature"
                                               value="3/4"
                                               tabindex="0"
                                               className="hidden"
                                               checked={this.state.signature === '3/4'}
                                        />
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
                        </div>
                    </div>
                    <button className="ui bottom primary attached button" onClick={this.play} ref="playButton">
                        <i className={playButtonIcon}/>
                        {playButtonText}
                    </button>
                </div>

            </div>
        );
    }
});

module.exports = Metronome;
