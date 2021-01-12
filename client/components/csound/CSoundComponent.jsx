import React, {Component} from 'react';
import {default as CSound} from '@kunstmusik/csound';
import randomDiatonicChordsCsd from './orchestras/random-diatonic-chords.csd';

const orchestras = {
    'random-diatonic-chords.csd': randomDiatonicChordsCsd
};

export default class CSoundComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            orchestraLoaded: '',
            playing: false,
            cSound: null,
            messages: []
        };

        this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleBeforeUnload);
        CSound.initialize().then(() => {
            const cSound = new CSound();

            cSound.setMessageCallback(this.handleCSoundMessage());
            this.setState({cSound, loading: false});
        });
    }

    componentWillUnmount() {
        this.handleBeforeUnload();
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }

    handleBeforeUnload() {
        this.state.cSound.stop();
        this.state.cSound.reset();
        this.state.cSound.destroy();
    }

    handleCSoundMessage() {
        return message => {
            const messages = this.state.messages;

            messages.unshift(message);
            this.setState({messages});
        };
    }

    handleCSoundPlay() {
        return () => {
            this.state.cSound.setOption('-+msg_color=false');
            this.state.cSound.start();
            this.state.cSound.audioContext.resume();
            if (CSound.CSOUND_AUDIO_CONTEXT.state === 'suspended') {
                CSound.CSOUND_AUDIO_CONTEXT.resume().then(() => {
                    // console.log('CSound.CSOUND_AUDIO_CONTEXT.resume() DONE');
                });
            }
            this.setState({playing: true});
        };
    }

    handleCSoundStop() {
        return () => {
            if (CSound.CSOUND_AUDIO_CONTEXT.state === 'running') {
                CSound.CSOUND_AUDIO_CONTEXT.suspend().then(() => {
                    // console.log('CSound.CSOUND_AUDIO_CONTEXT.suspend() DONE');
                });
            }
            this.setState({playing: false});
        };
    }

    handleLoadOrchestra(orchestra) {
        if (!orchestras[orchestra]) {
            throw new Error(`Unknown orchestra ${orchestra}`);
        }
        return () => {
            this.state.cSound.compileCSD(orchestras[orchestra]);
            this.setState({orchestraLoaded: orchestra});
        };
    }

    handleOrchestraReset() {
        return () => {
            this.state.cSound.stop();
            this.state.cSound.reset();
            this.setState({orchestraLoaded: ''});
        };
    }

    render() {
        return (
            <div>
                <div style={{marginBottom: '1em'}}>
                    <div>{'Orchestras:'}</div>
                    <span>{'random-diatonic-chords.csd -- '}</span>
                    {
                        this.state.orchestraLoaded === 'random-diatonic-chords.csd'
                            ? (
                                <a href="#" onClick={this.handleOrchestraReset()}>
                                    {'unload'}
                                </a>
                            )
                            : (
                                <a href="#" onClick={this.handleLoadOrchestra('random-diatonic-chords.csd')}>
                                    {'load'}
                                </a>
                            )
                    }
                </div>
                {
                    this.state.loading
                        ? <div>{'loading...'}</div>
                        : this.state.playing
                            ? <a href="#" onClick={this.handleCSoundStop()}>{'Stop'}</a>
                            : <a href="#" onClick={this.handleCSoundPlay()}>{'Play'}</a>
                }
                <div style={{marginTop: '1em'}}>
                    {this.state.messages.map((message, index) =>
                        <span style={{display: 'block'}} key={index}>{message}</span>)}
                </div>
            </div>
        );
    }
}
