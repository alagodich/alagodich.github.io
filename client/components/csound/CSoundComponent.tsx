import React, {Component, ReactElement} from 'react';
import {default as CSound} from '@kunstmusik/csound';
// import randomDiatonicChordsCsd from './orchestras/random-diatonic-chords.csd';
import CsdGenerator from './CsdGenerator';
import {IIRealProChord} from '../real-book/types';

// const orchestras: {[key: string]: string} = {
//     'random-diatonic-chords.csd': randomDiatonicChordsCsd
// };

interface ICSoundComponentState {
    loading: boolean;
    orchestraLoaded: string;
    playing: boolean;
    cSound: any;
    messages: string[];
}

export default class CSoundComponent extends Component<any, ICSoundComponentState> {
    constructor(props: never) {
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

    public componentDidMount(): void {
        window.addEventListener('beforeunload', this.handleBeforeUnload);
        CSound.initialize().then(() => {
            const cSound = new CSound();

            cSound.setMessageCallback(this.handleCSoundMessage());
            this.setState({cSound, loading: false});
        });
    }

    public componentWillUnmount(): void {
        this.handleBeforeUnload();
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }

    public handleBeforeUnload(): void {
        this.state.cSound.stop();
        this.state.cSound.reset();
        this.state.cSound.destroy();
    }

    public handleCSoundMessage(): (message: string) => void {
        return message => {
            const messages = this.state.messages;

            messages.unshift(message);
            this.setState({messages});
        };
    }

    public handleCSoundPlay(): () => void {
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

    public handleCSoundStop(): () => void {
        return () => {
            if (CSound.CSOUND_AUDIO_CONTEXT.state === 'running') {
                CSound.CSOUND_AUDIO_CONTEXT.suspend().then(() => {
                    // console.log('CSound.CSOUND_AUDIO_CONTEXT.suspend() DONE');
                });
            }
            this.setState({playing: false});
        };
    }

    public handleLoadOrchestra(orchestra: string): () => void {
        const csdGenerator = new CsdGenerator();

        // TODO maybe we should set the key instead, but major/minor should be enough too
        csdGenerator.setIsMajor(true);
        csdGenerator.useDefaultInstruments();
        const C: IIRealProChord = {
            root: 'C',
            numeric: 1,
            quality: '^'
        };
        const Am: IIRealProChord = {
            root: 'A',
            numeric: 6,
            quality: '-7'
        };
        const Dm: IIRealProChord = {
            root: 'D',
            numeric: 2,
            quality: '-7'
        };
        const G7: IIRealProChord = {
            root: 'G',
            numeric: 5,
            quality: '7'
        };

        csdGenerator.addChord(C, 0, 2);
        csdGenerator.addChord(Am, 2, 2);
        csdGenerator.addChord(Dm, 4, 2);
        csdGenerator.addChord(G7, 6, 2);

        return () => {
            this.state.cSound.compileCSD(csdGenerator.compile());
            this.setState({orchestraLoaded: orchestra});
        };
    }

    public handleOrchestraReset(): () => void {
        return () => {
            this.state.cSound.stop();
            this.state.cSound.reset();
            this.setState({orchestraLoaded: ''});
        };
    }

    public render(): ReactElement {
        return (
            <div>
                <div style={{marginBottom: '1em'}}>
                    <div>{'Orchestras:'}</div>
                    <span>{'C Am Dm G7 -- '}</span>
                    {
                        this.state.orchestraLoaded === 'random-diatonic-chords.csd'
                            ? (
                                <a href="#" onClick={this.handleOrchestraReset()}>
                                    {'unload'}
                                </a>
                            )
                            : (
                                <a href="#" onClick={this.handleLoadOrchestra('')}>
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
