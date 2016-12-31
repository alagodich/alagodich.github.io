'use strict';
/* eslint complexity: 0 */
/* eslint react/no-set-state: 0 */
/* eslint no-console: 0 */

import React, {Component} from 'react';
import 'script-loader!Bower/Snap.svg/dist/snap.svg.js';

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
        noteResolution: '4',
        isPlaying: false,
        signature: '4/4',
        accentFirstBeat: false,
        volume: 0.5,
        useOscillator: false
    },
    spaceKeyCode = 32;

/**
 * TODO get rid of Snap and render svg with pure js
 */
class Metronome extends Component {

    constructor() {
        super();

        this.state = defaultState;

        this.audioContext = null;
        this.timeWorker = null;
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
        this.svgWidth = 254; // Inner width of the semantic ui card box

        this.pointer = null;

        this.spacing = null;
        /**
         * Unlocked AudioContext on iOS devices
         */
        this.unlocked = false;
        this.decodedBeatSound = null;
        this.playButton = null;

        this.browserCompatible = true;

        this.handlePlay = this.handlePlay.bind(this);
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
        const self = this;
        if (this.isIE()) {
            this.popups();
            return;
        }
        this.init();
        $('.ui.resolution.radio.checkbox')
            .checkbox({
                onChange() {
                    self.handleChangeResolution(this.value);
                }
            });
        $('.ui.signature.radio.checkbox')
            .checkbox({
                onChange() {
                    self.handleChangeSignature(this.value);
                }
            });

        $('.ui.oscillator.toggle.checkbox')
            .checkbox({
                onChange() {
                    self.handleToggleUseOscillator();
                }
            });

        $('.ui.accent.toggle.checkbox')
            .checkbox({
                onChange() {
                    self.handleToggleAccentFirstBeat();
                }
            });

        // Toggle metronome with space key
        $(document).on('keyup', event => {
            if (event.keyCode === spaceKeyCode) {
                event.preventDefault();
                $('.toggle.checkbox input').blur();
                this.handlePlay();
            }
        });
    }

    /**
     * Init svg, audio context and worker
     * Pre-load beat sound
     * Start drawer loop
     */
    init() {
        const AudioContext = window.AudioContext // Default
            || window.webkitAudioContext // Safari and old versions of Chrome
            || false;

        this.initSvg();

        // Init audio context
        if (AudioContext) {
            this.audioContext = new AudioContext();
        } else {
            // Web Audio API is not supported
            console.log('Sorry, but the Web Audio API is not supported by your browser. ' +
                'Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox');
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
        const svgNode = this.svgContainer,
            cardWidth = $(this.container).width();
        if (!svgNode) {
            return;
        }

        $(svgNode).width(cardWidth).height(50);
        $(this.container).width();
        this.svg = new Snap(svgNode);

        this.drawRuler();
        this.drawPointer();
    }

    /**
     * Draw ruler depending on metronome params
     */
    drawRuler() {
        let ruler = this.svg.select('#ruler');
        // Remove existing ruler, before drawing a new one
        if (ruler) {
            ruler.remove();
        }
        this.initParams();
        this.spacing = ((this.svgWidth - (this.sixteenthQuantity * rulerLineWidth)) / this.sixteenthQuantity);
        // Draw ruler base line
        ruler = this.svg.group(
            this.svg.line(svgPadding / 2, svgHeight, this.svgWidth + (svgPadding), svgHeight)
        );
        for (let i = 0; i <= this.sixteenthQuantity; i++) {
            const x = (this.spacing * i) + (i * rulerLineWidth) + (svgPadding),
                y = (i % this.quartersQuantity === 0) ? quarterSerifHeight : eightSerifHeight;

            ruler.add(this.svg.line(x, svgHeight, x, svgHeight - y));
        }
        ruler.attr({
            stroke: rulerColor,
            strokeWidth: rulerLineWidth,
            id: 'ruler'
        });
    }

    /**
     * Draw transparent pointer
     */
    drawPointer() {
        this.pointer = this.svg.polygon([
            svgPadding, svgHeight - quarterSerifHeight,
            svgPadding + 3, svgHeight - 38,
            svgPadding - 3, svgHeight - 38,
            svgPadding, svgHeight - quarterSerifHeight
        ]).attr({
            fill: '#FFF'
        });
    }

    /**
     * Move pointer to the current beat serif and apply color
     */
    movePointer() {
        const animationSpeed = (1 / this.state.tempo) * 1500,
            x = (this.spacing * this.current16thNote) + (this.current16thNote);
            //serif = this.svg.select('line:nth-child(' + (this.current16thNote + 2) + ')');
        let color;

        if (this.state.accentFirstBeat && this.current16thNote === 0) {
            color = stressedNoteColor;
        } else {
            color = (this.current16thNote % this.quartersQuantity === 0) ? noteColor : emptyNoteColor;
        }
        this.pointer.animate({
            transform: `t${x},0`,
            fill: color
        }, animationSpeed);
    }

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
        if (!this.iOS() || this.unlocked) {
            return;
        }

        // Create an empty buffer and play it
        const source = this.audioContext.createBufferSource();
        source.buffer = this.audioContext.createBuffer(1, 1, 22050);
        source.connect(this.audioContext.destination);
        source.noteOn(0);
        // By checking the play state after some time, we know if we're really unlocked
        setTimeout(function () {
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
     * @return bool
     */
    isChrome() {
        // please note,
        // that IE11 now returns undefined again for window.chrome
        // and new Opera 30 outputs true for window.chrome
        // and new IE Edge outputs to true now for window.chrome
        // and if not iOS Chrome check
        // so use the below updated condition
        const isChromium = window.chrome,
            winNav = window.navigator,
            vendorName = winNav.vendor,
            isOpera = winNav.userAgent.indexOf('OPR') > -1,
            isIEedge = winNav.userAgent.indexOf('Edge') > -1,
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
    }

    handleChangeTempo(event) {
        this.setState({tempo: event.target.value}, this.startOver);
    }

    handleChangeResolution(value) {
        this.setState({noteResolution: value}, function () {
            this.drawRuler();
            this.startOver();
        });
    }

    handleChangeSignature(value) {
        this.setState({signature: value}, function () {
            this.drawRuler();
            this.startOver();
        });
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
    }

    render() {
        const playButtonText = this.state.isPlaying ? 'stop' : 'play',
            playButtonIcon = this.state.isPlaying ? 'red stop icon' : 'white play icon',
            volume = parseInt(this.state.volume * 100, 10),
            githubUrl = 'https://github.com/alagodich/alagodich.github.io/blob/master/app/components/Metronome.jsx';

        if (!this.hasNormalAudioContext()) {
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
                        <a href={documentationUrl} target="_blank">
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
                            className="ui right corner blue label"
                        >
                            <i
                                ref={c => (this.notSupportedContainer = c)}
                                className="white github icon"
                                style={{textDecoration: 'none', cursor: 'pointer'}}
                            />
                        </a>
                        <svg ref={c => (this.svgContainer = c)}/>
                    </div>
                    <div className="extra content ui form">
                        <div id="controls">
                            <div id="tempo">
                                {'Tempo: '}<span>{this.state.tempo}</span><br/>
                                <input
                                    id="tempo"
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
                                <input
                                    id="volume"
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
                                <div className="ui oscillator toggle checkbox">
                                    <input
                                        type="checkbox"
                                        tabIndex="0"
                                        className="hidden"
                                        name="oscillator"
                                        defaultChecked={this.state.useOscillator}
                                    />
                                    <label>{'Digital sound'}</label>
                                </div>
                            </div>

                            <div className="ui divider"/>

                            <div className="inline fields">
                                <div className="field">
                                    <div className="ui resolution radio checkbox">
                                        <input type="radio"
                                            name="resolution"
                                            value="4"
                                            tabIndex="0"
                                            className="hidden"
                                            defaultChecked={this.state.noteResolution === '4'}
                                        />
                                        <label>{'Quarter'}</label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui resolution radio checkbox">
                                        <input type="radio"
                                            name="resolution"
                                            value="8"
                                            tabIndex="0"
                                            className="hidden"
                                            defaultChecked={this.state.noteResolution === '8'}
                                        />
                                        <label>{'8th'}</label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui resolution radio checkbox">
                                        <input type="radio"
                                            name="resolution"
                                            value="12"
                                            tabIndex="0"
                                            className="hidden"
                                            defaultChecked={this.state.noteResolution === '12'}
                                        />
                                        <label>{'Shuffle'}</label>
                                    </div>
                                </div>
                            </div>

                            <div className="ui divider"/>

                            <div className="inline fields">
                                <div className="field">
                                    <div className="ui signature radio checkbox">
                                        <input type="radio"
                                            name="signature"
                                            value="4/4"
                                            tabIndex="0"
                                            className="hidden"
                                            defaultChecked={this.state.signature === '4/4'}
                                        />
                                        <label>{'4/4'}</label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui signature radio checkbox">
                                        <input type="radio"
                                            name="signature"
                                            value="3/4"
                                            tabIndex="0"
                                            className="hidden"
                                            defaultChecked={this.state.signature === '3/4'}
                                        />
                                        <label>{'3/4'}</label>
                                    </div>
                                </div>
                            </div>

                            <div style={{display: this.state.useOscillator ? 'block' : 'none'}}>

                                <div className="ui divider"/>

                                <div className="ui accent toggle checkbox">
                                    <input
                                        type="checkbox"
                                        tabIndex="0"
                                        className="hidden"
                                        name="accent"
                                        defaultChecked={this.state.accentFirstBeat}
                                    />
                                    <label>{'Accent the first beat'}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="ui bottom primary attached button"
                        onClick={this.handlePlay}
                        ref={c => (this.playButton = c)}
                    >
                        <i className={playButtonIcon} />
                        {playButtonText}
                    </button>
                </div>

            </div>
        );
    }
}

export default Metronome;
