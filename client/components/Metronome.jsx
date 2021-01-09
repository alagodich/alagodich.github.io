/* eslint no-console: 0 */

import React, {Component} from 'react';
import {Input, Button, Icon, Checkbox, Radio} from 'semantic-ui-react';
import {SVG} from '@svgdotjs/svg.js';

const minTempo = 30,
    maxTempo = 200,
    minVolume = 0,
    maxVolume = 100,
    lookAhead = 25.0,
    /**
     * How far ahead to schedule audio (sec)
     */
    scheduleAheadTime = 0.1,
    noteLength = 0.05,
    /**
     * Svg settings
     */
    svgHeight = 50,
    svgPadding = 4,
    rulerLineWidth = 1,
    quarterSerifHeight = 14,
    eightSerifHeight = 7,
    rulerColor = '#979797',
    stressedNoteColor = '#DB2828',
    noteColor = '#2185D0',
    emptyNoteColor = '#EEE',
    defaultState = {
        tempo: 101.0,
        noteResolution: 4,
        isPlaying: false,
        signature: '4/4',
        accentFirstBeat: false,
        volume: 0.5,
        useOscillator: false
    },
    spaceKeyCode = 32,
    githubUrl = 'https://github.com/alagodich/alagodich.github.io/blob/master/client/components/Metronome.jsx';

/**
 * TODO get rid of Snap and render svg with pure js
 */
class Metronome extends Component {

    constructor() {
        super();

        this.state = defaultState;

        this.audioContext = null;
        this.timerWorker = null;
        this.current16thNote = 0.0;

        /**
         * This is calculated from lookahead, and overlaps
         * with next interval (in case the timer is late)
         */
        this.nextNoteTime = 0.0;
        this.notesInQueue = [];
        this.quartersQuantity = null;
        this.sixteenthQuantity = null;
        this.nextNoteMultiplier = null;

        this.svg = null;
        // Inner width of the semantic ui card box
        this.svgWidth = 254;

        this.pointer = null;

        this.spacing = null;
        /**
         * Unlocked AudioContext on iOS devices
         */
        this.unlocked = false;
        this.decodedBeatSound = null;

        this.handlePlay = this.handlePlay.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChangeTempo = this.handleChangeTempo.bind(this);
        this.handleChangeVolume = this.handleChangeVolume.bind(this);
        this.handleToggleAccentFirstBeat = this.handleToggleAccentFirstBeat.bind(this);
        this.handleToggleUseOscillator = this.handleToggleUseOscillator.bind(this);
    }

    /**
     * Init metronome after the component is mounted
     * Init checkboxes
     */
    componentDidMount() {
        this.init();
        document.addEventListener('keyup', this.handleKeyPress, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.handleKeyPress, false);
    }

    handleKeyPress(event) {
        if (event.keyCode === spaceKeyCode) {
            event.preventDefault();
            // $('.toggle.checkbox input').blur();
            this.handlePlay();
        }
    }

    /**
     * Init svg, audio context and worker
     * Pre-load beat sound
     * Start drawer loop
     */
    init() {
        // Default
        const AudioContext = window.AudioContext
            // Safari and old versions of Chrome
            || window.webkitAudioContext
            || false;

        this.initSvg();

        // Init audio context
        if (AudioContext) {
            this.audioContext = new AudioContext();
        } else {
            // Web Audio API is not supported
            console.log('Sorry, but the Web Audio API is not supported by your browser. '
                + 'Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox');
            return;
        }

        // Pre-load beat sound
        this.loadBeatData().then(buffer => {
            this.decodedBeatSound = buffer;
        }, error => {
            console.log('Cannot load beat sound.', error);
        });

        // Init Worker
        this.timerWorker = new Worker('assets/metronome/metronomeworker.js');
        this.timerWorker.onmessage = message => {
            if (message.data === 'tick') {
                this.scheduler();
            }
        };
        this.timerWorker.postMessage({interval: lookAhead});
    }

    /**
     * Create svg with default ruler and pointer
     */
    initSvg() {
        const svgNode = this.svgContainer;

        if (!svgNode) {
            return;
        }

        this.svg = SVG().addTo(this.svgContainer);

        this.drawRuler();
        this.drawPointer();
    }

    /**
     * Draw ruler depending on metronome params
     */
    drawRuler() {
        let ruler = this.svg.findOne('.svg--ruler');

        // Clear existing ruler, before drawing a new one
        if (ruler) {
            ruler.clear();
        } else {
            ruler = this.svg.group().addClass('svg--ruler');
        }
        this.initParams();
        this.spacing = (this.svgWidth - (this.sixteenthQuantity * rulerLineWidth)) / this.sixteenthQuantity;
        // Draw ruler base line
        ruler.line(svgPadding / 2, svgHeight, this.svgWidth + (svgPadding), svgHeight);

        for (let i = 0; i <= this.sixteenthQuantity; i++) {
            const x = (this.spacing * i) + (i * rulerLineWidth) + (svgPadding),
                y = (i % this.quartersQuantity === 0) ? quarterSerifHeight : eightSerifHeight;

            ruler.line(x, svgHeight, x, svgHeight - y);
        }
        ruler.stroke({width: 1, color: rulerColor});
    }

    /**
     * Draw transparent pointer
     */
    drawPointer() {
        this.pointer = this.svg.polygon([
            [svgPadding, svgHeight - quarterSerifHeight].join(','),
            [svgPadding + 3, svgHeight - 38].join(','),
            [svgPadding - 3, svgHeight - 38].join(',')
        ].join(' '))
            .fill(noteColor);
    }

    /**
     * Move pointer to the current beat serif and apply color
     */
    movePointer() {
        const x = (this.spacing * this.current16thNote) + (this.current16thNote);
        const color = this.state.accentFirstBeat && this.current16thNote === 0
            ? stressedNoteColor
            : (this.current16thNote % this.quartersQuantity === 0) ? noteColor : emptyNoteColor;

        this.pointer.move(x, 0).fill(color);
    }

    /**
     * Init params from controls
     */
    initParams() {
        if (this.state.signature === '4/4') {
            this.sixteenthQuantity = this.state.noteResolution === 12 ? 12 : 16;
        }
        if (this.state.signature === '3/4') {
            this.sixteenthQuantity = this.state.noteResolution === 12 ? 9 : 12;
        }
        this.quartersQuantity = this.state.noteResolution === 12 ? 3 : 4;
        this.nextNoteMultiplier = this.state.noteResolution === 12 ? 0.33 : 0.25;
    }

    /**
     * Load mp3 beat data and decode it
     * @returns Promise
     */
    loadBeatData() {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.open('get', 'assets/metronome/beat.mp3', true);
            request.responseType = 'arraybuffer';
            request.onload = () => {
                const audioData = request.response;

                this.audioContext.decodeAudioData(audioData, buffer => {
                    resolve(buffer);
                }, error => {
                    console.log(`Error decoding audio data. ${error.err}`);
                    reject(error.err);
                });
            };
            request.send();
        });
    }

    /**
     * Toggle worker by sending start or stop
     */
    handlePlay() {
        this.unlock();
        this.setState({isPlaying: !this.state.isPlaying}, () => {
            if (this.state.isPlaying) {
                this.initParams();
                this.current16thNote = -1;
                this.nextNoteTime = this.audioContext.currentTime;
                this.timerWorker.postMessage('start');
            } else {
                this.timerWorker.postMessage('stop');
            }
        });
    }

    /**
     * Restart metronome if it was playing
     * @note No need to change state of the object invoking play()
     */
    startOver() {
        if (this.state.isPlaying) {
            this.timerWorker.postMessage('stop');
            this.initParams();
            this.current16thNote = -1;
            this.nextNoteTime = this.audioContext.currentTime;
            this.timerWorker.postMessage('start');
        }
    }

    /**
     * While there are notes that will need to play before the next interval,
     * schedule them and advance the pointer.
     */
    scheduler() {
        while (this.nextNoteTime < this.audioContext.currentTime + scheduleAheadTime) {
            this.scheduleNote(this.current16thNote, this.nextNoteTime);
            this.nextNote();
        }
    }

    /**
     * Advance current note and time by a 16th note
     */
    nextNote() {
        const secondsPerBeat = 60.0 / this.state.tempo;

        this.nextNoteTime += secondsPerBeat * this.nextNoteMultiplier;

        // Advance the beat number, wrap to zero
        this.current16thNote++;
        if (this.current16thNote === this.sixteenthQuantity) {
            this.current16thNote = 0;
        }
    }

    /**
     * Playing note here
     * @param beatNumber
     * @param time
     */
    scheduleNote(beatNumber, time) {
        this.notesInQueue.push({note: beatNumber, time});
        this.movePointer();
        if (!this.noteShouldBePlayed(beatNumber)) {
            return;
        }

        // create an oscillator
        const source = this.getAudioSource(beatNumber);

        source.start(time);
        source.stop(time + noteLength);
    }

    /**
     * Get audio source either oscillator generated or preloaded mp3
     * @param beatNumber
     * @returns {*}
     */
    getAudioSource(beatNumber) {
        let source;
        const gainNode = this.audioContext.createGain();

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
    }

    /**
     * Unlock AudioContext on iOS devices
     * @see https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/
     * Using_HTML5_Audio_Video/PlayingandSynthesizingSounds/PlayingandSynthesizingSounds.html
     */
    unlock() {
        // https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
        this.audioContext.resume();

        if (!this.iOS() || this.unlocked) {
            return;
        }

        // Create an empty buffer and play it
        const source = this.audioContext.createBufferSource();

        source.buffer = this.audioContext.createBuffer(1, 1, 22050);
        source.connect(this.audioContext.destination);
        source.noteOn(0);
        // By checking the play state after some time, we know if we're really unlocked
        setTimeout(() => {
            if ((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
                this.unlocked = true;
            }
        }, 0);
    }

    /**
     * Check for a known iOS device
     * @returns {boolean}
     */
    iOS() {
        const iDevices = [
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
    }

    /**
     * Detect IE
     * returns version of IE or false, if browser is not Internet Explorer
     */
    isIE() {
        const userAgent = window.navigator.userAgent,
            msie = userAgent.indexOf('MSIE '),
            // IE 11 => return version number
            rv = userAgent.indexOf('rv:'),
            trident = userAgent.indexOf('Trident/'),
            edge = userAgent.indexOf('Edge/');

        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(userAgent.substring(msie + 5, userAgent.indexOf('.', msie)), 10);
        }

        if (trident > 0) {
            return parseInt(userAgent.substring(rv + 3, userAgent.indexOf('.', rv)), 10);
        }

        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(userAgent.substring(edge + 5, userAgent.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    }

    /**
     * Try to detect Chrome
     *
     * please note, that IE11 now returns undefined again for window.chrome
     * and new Opera 30 outputs true for window.chrome
     * and new IE Edge outputs to true now for window.chrome
     * and if not iOS Chrome check
     * so use the below updated condition
     *
     * @return bool
     */
    isChrome() {
        const isChromium = window.chrome,
            winNav = window.navigator,
            vendorName = winNav.vendor,
            isOpera = winNav.userAgent.includes('OPR'),
            isIEedge = winNav.userAgent.includes('Edge'),
            isIOSChrome = winNav.userAgent.match('CriOS'),
            isChrome =
                isChromium !== null
                && isChromium !== undefined
                && vendorName === 'Google Inc.'
                && isOpera === false
                && isIEedge === false;

        return isIOSChrome || isChrome;
    }

    /**
     * Check if browser has AudioContext
     * AudioContext.currentTime property is always zero in webkitAudioContext in Safari for some reason
     * @doc https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/
     * PlayingandSynthesizingSounds/PlayingandSynthesizingSounds.html
     *
     * Because currentTime is always zero this.noteShouldBePlayed() never returns true
     */
    hasNormalAudioContext() {
        return window.AudioContext;
    }

    /**
     * @param beatNumber
     * @returns {boolean}
     */
    noteShouldBePlayed(beatNumber) {
        // Play only quarter notes
        if (this.state.noteResolution === 4) {
            if (beatNumber % 4) {
                return false;
            }
        }
        // Skip the second beat
        if (this.state.noteResolution === 12) {
            if ([1, 4, 7, 10].includes(beatNumber)) {
                // Skip the second beat
                return false;
            }
        }
        // Play eighths
        if (this.state.noteResolution === 8) {
            if (beatNumber % 2) {
                return false;
            }
        }
        return true;
    }

    handleChangeTempo(event) {
        this.setState({tempo: event.target.value}, this.startOver);
    }

    handleChangeResolution(value) {
        return () => {
            this.setState({noteResolution: value}, () => {
                this.drawRuler();
                this.startOver();
            });
        };
    }

    handleChangeSignature(value) {
        return () => {
            this.setState({signature: value}, () => {
                this.drawRuler();
                this.startOver();
            });
        };

    }

    handleChangeVolume(event) {
        this.setState({volume: event.target.value / 100});
    }

    handleToggleAccentFirstBeat() {
        this.setState({accentFirstBeat: !this.state.accentFirstBeat}, this.startOver);
    }

    handleToggleUseOscillator() {
        this.setState({useOscillator: !this.state.useOscillator}, this.startOver);
    }

    render() {
        const volume = parseInt(this.state.volume * 100, 10);

        if (!this.isChrome() && !this.hasNormalAudioContext()) {
            const documentationUrl = 'https://developer.apple.com/library/content/documentation/AudioVideo'
                + '/Conceptual/Using_HTML5_Audio_Video/PlayingandSynthesizingSounds/PlayingandSynthesizingSounds.html';

            return (
                <div className="ui info message">
                    <div className="header">
                        {'Sorry at this moment i do not support this browser.'}
                    </div>
                    <p>
                        {'Browser should have valid AudioContext object.'}
                        {' For example in Safari, it is supposed to work according to '}
                        <a href={documentationUrl} target="_blank" rel="noreferrer">
                            {'the official documentation'}
                        </a>
                        {', but it does not. As audioContext.currentTime is always 0 there.'}
                    </p>
                </div>
            );
        }

        return (
            <div className="metronome">
                <div className="ui centered card">
                    <div className="content" ref={c => (this.container = c)}>
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="ui right corner blue label"
                        >
                            <Icon name="github" style={{textDecoration: 'none', cursor: 'pointer'}} />
                        </a>
                        <svg style={{width: '100%', height: 50}} ref={c => (this.svgContainer = c)}/>
                    </div>
                    <div className="extra content ui form">
                        <div id="controls">
                            <div id="tempo">
                                {'Tempo: '}<span>{this.state.tempo}</span><br/>
                                <Input
                                    type="range"
                                    min={minTempo}
                                    max={maxTempo}
                                    value={this.state.tempo}
                                    onChange={this.handleChangeTempo}
                                    className="metronome__slider"
                                />
                            </div>
                            <div id="volume">
                                {'Volume: '}<span>{volume}{'%'}</span><br/>
                                <Input
                                    type="range"
                                    min={minVolume}
                                    max={maxVolume}
                                    value={volume}
                                    onChange={this.handleChangeVolume}
                                    className="metronome__slider"
                                />
                            </div>

                            <div style={{display: this.iOS() ? 'none' : 'block'}}>
                                <div className="ui divider"/>
                                <Checkbox
                                    toggle
                                    label="Digital sound"
                                    defaultChecked={this.state.useOscillator}
                                    onChange={this.handleToggleUseOscillator}
                                />
                            </div>

                            <div style={{display: this.state.useOscillator ? 'block' : 'none'}}>
                                <div className="ui divider"/>
                                <Checkbox
                                    toggle
                                    label="Accent the first beat"
                                    defaultChecked={this.state.accentFirstBeat}
                                    onChange={this.handleToggleAccentFirstBeat}
                                />
                            </div>

                            <div className="ui divider"/>

                            <div className="inline fields">
                                <div className="field">
                                    <Radio
                                        name="resolution"
                                        value="4"
                                        tabIndex="0"
                                        className="hidden"
                                        checked={this.state.noteResolution === 4}
                                        onChange={this.handleChangeResolution(4)}
                                        label="Quarter"
                                    />
                                </div>
                                <div className="field">
                                    <Radio
                                        name="resolution"
                                        value="8"
                                        tabIndex="0"
                                        className="hidden"
                                        checked={this.state.noteResolution === 8}
                                        onChange={this.handleChangeResolution(8)}
                                        label="8th"
                                    />
                                </div>
                                <div className="field">
                                    <Radio
                                        name="resolution"
                                        value="12"
                                        tabIndex="0"
                                        className="hidden"
                                        checked={this.state.noteResolution === 12}
                                        onChange={this.handleChangeResolution(12)}
                                        label="Shuffle"
                                    />
                                </div>
                            </div>

                            <div className="ui divider"/>

                            <div className="inline fields">
                                <div className="field">
                                    <Radio
                                        name="signature"
                                        value="4/4"
                                        tabIndex="0"
                                        className="hidden"
                                        checked={this.state.signature === '4/4'}
                                        onChange={this.handleChangeSignature('4/4')}
                                        label="4/4"
                                    />
                                </div>
                                <div className="field">
                                    <Radio
                                        name="signature"
                                        value="3/4"
                                        tabIndex="0"
                                        className="hidden"
                                        checked={this.state.signature === '3/4'}
                                        onChange={this.handleChangeSignature('3/4')}
                                        label="3/4"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button
                        primary
                        attached="bottom"
                        onClick={this.handlePlay}
                    >
                        <Icon name={this.state.isPlaying ? 'stop' : 'play'} />
                    </Button>
                </div>

            </div>
        );
    }
}

export default Metronome;
