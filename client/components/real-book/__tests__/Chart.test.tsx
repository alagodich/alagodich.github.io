/* eslint max-len: 0 */

import {useSelector} from 'react-redux';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => jest.fn(() => {
    })
}));

jest.mock('react-router-dom', () => ({
    useHistory: () => {
    }
}));

import Chart, {processLines} from '../Chart';
import React from 'react';
import {create} from 'react-test-renderer';
import util from 'util';

// eslint-disable-next-line no-console,@typescript-eslint/no-unused-vars,no-unused-vars
const varDump = (object: any) => console.log(util.inspect(object, {depth: null}));

const emptyBootstrapProps = {match: {params: {playlist: 'jazz', songId: 2}}, history: {}, location: {}} as any;

describe('Chart Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render Afternoon in Paris', () => {
        const props = {
            title: 'Afternoon In Paris',
            author: 'Lewis John',
            style: 'Medium Swing',
            key: 'C',
            chordString: '*A{T44C^7 |C-7 F7|Bb^7 |Bb-7 Eb7|Ab^7 |D-7 G7#9|N1C^7 |D-7 G7 } |N2C^7 |x ]*B[D-7 |G7 |C^7/E |A7 |Y|D-7 |G7 |C^7(C#-7) (F#7)|D-7 G7 ]*A[C^7 |C-7 F7|Bb^7 |Bb-7 Eb7|Ab^7 |D-7 G7#9|C^7 |D-7 G7 Z'
        };

        (useSelector as any).mockImplementation(() => ({
            songs: [props],
            activePlaylist: 'jazz',
            activeSong: 0
        }));

        const element = create(<Chart {...emptyBootstrapProps} />);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });
    it('should render 500 Miles High', () => {
        const props = {
            title: '500 Miles High',
            author: 'Corea Chick',
            style: 'Bossa Nova',
            key: 'E-',
            chordString: '[T44E-7 |x |G-7 |x |Bb^7 |x |Bh7 |E7#9 |A-7 |x |F#h7 |x |F-7 |x Q|C-7 |x |B7#9 |x Z Y{QC-7 |x |Ab^7 |x }'
        };

        (useSelector as any).mockImplementation(() => ({
            songs: [props],
            activePlaylist: 'jazz',
            activeSong: 0
        }));

        const element = create(<Chart {...emptyBootstrapProps} />);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });
    it('should render song with repeats (r), The African Queen', () => {
        const props = {
            title: 'African Queen, The',
            author: 'Silver Horace',
            style: 'Latin',
            key: 'C-',
            chordString: '*A[T44C-9 Db9|x |r|C-9 Db9|x |r|]*A[C-9 Db9|x |r|C-9 Db9|x |r|]*B[Bb7 A7|Ab7 G7|C-9 Db9|x |C-9 Db9|x Z'
        };

        (useSelector as any).mockImplementation(() => ({
            songs: [props],
            activePlaylist: 'jazz',
            activeSong: 0
        }));

        const element = create(<Chart {...emptyBootstrapProps} />);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });
    it('should render Agua De Beber (alt) and (sus)', () => {
        const props = {
            title: 'Agua De Beber',
            author: 'Jobim Antonio-Carlos',
            style: 'Bossa Nova',
            key: 'D-',
            chordString: '*i{T44D-7 |E7#9 A7b13|D-7 |E7#9 A7b13|D-7 |Bb^7 |D-7 |x }*A[E7b9 |A7alt |D-7 |G7 |G-7 |C7 |F^7 |x |E7 Eb7|D-7 Dbo7|F7/C |E7#9/B |E7b9 |A7sus |D-7 |D7b9 ]*B[G7 |G-7 |D-7 |D7b9 |G7 |G-7 |D-7 |A7b13 ]*C[D-7 |E7#9 A7b13|D-7 |E7#9 A7b13|D-7 |Bb^7 |D-7 |x Z'
        };

        (useSelector as any).mockImplementation(() => ({
            songs: [props],
            activePlaylist: 'jazz',
            activeSong: 0
        }));

        const element = create(<Chart {...emptyBootstrapProps} />);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });
    it('should render Airmail Special with Segno symbol (s), and 4 repeats', () => {
        const props = {
            title: 'Airmail Special',
            author: 'Christian Charlie',
            style: 'Medium Up Swing',
            key: 'C',
            chordString: '*i[T44C6 |x |r|r|r|][Co7 |x |r|Co7 Bo7|Bbo7 |Ab7 |G7 ] *A{SC C/E|F G|C C/E|F G|C C7|F F#o7|C/G |C  }*B[Co7 |x |r|Co7 Bo7|Bbo7 |Ab7 |G7 Z'
        };

        (useSelector as any).mockImplementation(() => ({
            songs: [props],
            activePlaylist: 'jazz',
            activeSong: 0
        }));

        const element = create(<Chart {...emptyBootstrapProps} />);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });
    it('should render Alfie with strange long second ending', () => {
        const props = {
            title: 'Alfie',
            author: 'Bacharach Burt',
            style: 'Ballad',
            key: 'Bb',
            chordString: '*A{T44Bb^7 |F7sus |Bb^7 |D-7 G7|C-7 |D-7 G-7|C-7 F7sus|Bbo7 |N1F7sus |F7 F7#5 } *B[N2A-7 |Bb-/C C7|A-7 |C7sus |A-7 |Bb-/C C7|F7sus |F6 F7 ]*A[Bb^7 |F7sus |Eh7 Eb7|D-7 G-7|Eh7 Eb7|D-7 G-7|C7#11 |C-7 F7sus|Bbo7 |F7sus |Bo7 |C-9 |Bo7 |Bb^7 Z'
        };

        (useSelector as any).mockImplementation(() => ({
            songs: [props],
            activePlaylist: 'jazz',
            activeSong: 0
        }));

        const element = create(<Chart {...emptyBootstrapProps} />);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });
    it('should render Ahmid-6 with multiple time signatures', () => {
        const props = {
            title: 'Ahmid-6',
            author: 'Metheny Pat',
            style: 'Even 8ths',
            key: 'C',
            chordString: '*A[T44D-7 |C#-7 |r|F#-7 B7|E-7 A7|G F|E- D-7|C^7 |B7 |Bb^7#11 |Ah7 D7b9|F#h7 B7b9|Eh7 A7b9|D-7 E-7|F-7 Bb7|Eb9sus|x|Ab^9|x|Ab7sus|x|Db^13|x|Dh7 G7b9|C-7 F7|F-7 Bb7|Gh7 C7#9|F-7 F#-7|G-7 C-7|T34 F#-7 B7 |E-7 A7sus|T24A7sus|T44 A7sus |x *B[D-7 |C#-7 |D-7 |C#-7 |F#-7 B7|E-7 A7|A-7 |\\ \\ D7|G^7 Bb7|Eb^7 B7|E^7 G7|C^7 Ab7|Db^7 E7|A^7 C7|F^7|x|E-7|x|F^7|x|E-7|x Z'
        };

        (useSelector as any).mockImplementation(() => ({
            songs: [props],
            activePlaylist: 'jazz',
            activeSong: 0
        }));

        const element = create(<Chart {...emptyBootstrapProps} />);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });
    it('should render All Through The Night with 2 long repeats', () => {
        const props = {
            title: 'All Through The Night',
            author: 'Cole Porter',
            style: 'Medium Swing',
            key: 'F',
            chordString: '*A{T44F^7 |Eh7 A7b9|D-7 Db7|C-7 F7b9|Bb^7 |Bb-7 Eb7b9|Ab^7 |x |N1Ah7|D7b9|Gh7|C7b9|F6|D7b9|G-7|C7b9 }|N2E^7|E7|Bbh7|Eb7b9|Ab^7|x|Gh7|C7b9 ]*B[F-7|Dh7|Gh7|C7b9|Eb-7|Ab7|Db6|x|Gh7|C7b9|F-7|F-7/Eb|Dh7|G7b9|Gh7|C7b9 ]*C[F^7 |Eh7 A7b9|D-7 Db7|C-7 F7b9|Bb^7 |x |Bb-7 |Eb7 |A-7 |D7 |G-7 |C7b9 |F6 |D7#9 |G-7 |C7b9 Z'
        };

        (useSelector as any).mockImplementation(() => ({
            songs: [props],
            activePlaylist: 'jazz',
            activeSong: 0
        }));

        const element = create(<Chart {...emptyBootstrapProps} />);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });
    it('should render Butterfly fermata and pauses and N.C.', () => {
        const props = {
            title: 'Butterfly',
            author: 'Herbie Hancock',
            style: 'Funk',
            key: 'F-',
            chordString: '*i{T44F-7 |\\ A-7 |F-7 |\\ A-7 }*A{SF-11 |\\ A-11 |F-11 |\\ D-11 }*B[n Bb7|n |n |n A7#9#5 |Ab^7/Bb |Ab^7#5/Bb |Ab^7/Bb |Bb13 |Eb13sus |x |Eb7#9#5 |x |Ab13sus |\\ \\ W/C QC7/E |n F-7|\\ A-7 |{F-7 |\\ A-7  } Y{QF-11  |x |x |x }{Bb13 |x |x |x }fA^7#11 Z'
        };

        (useSelector as any).mockImplementation(() => ({
            songs: [props],
            activePlaylist: 'jazz',
            activeSong: 0
        }));

        const element = create(<Chart {...emptyBootstrapProps} />);
        const tree = element.toJSON();

        expect(tree).toMatchSnapshot();
    });

    describe('processLines', () => {
        it('should handle empty call', () => {
            expect(processLines(undefined as any)).toEqual([]);
            expect(processLines('' as any)).toEqual([]);
            expect(processLines(null as any)).toEqual([]);
        });
        it('should correctly process segment with repeat', () => {
            const segment = {
                name: 'A',
                data: [
                    {timeSignature: '4 / 4', open: '{', chords: 'C^7'},
                    {open: '|', chords: 'C-7 F7'},
                    {open: '|', chords: 'Bb^7'},
                    {open: '|', chords: 'Bb-7 Eb7'},
                    {open: '|', chords: 'Ab^7'},
                    {open: '|', chords: 'D-7 G7#9'},
                    {ending: 'N1', open: '|', chords: 'C^7'},
                    {open: '|', chords: 'D-7 G7', close: '}'},
                    {ending: 'N2', open: '|', chords: 'C^7'},
                    {open: '|', chords: 'x', close: ']'}
                ]
            };

            expect(processLines(segment)).toEqual([
                [
                    {timeSignature: '4 / 4', open: '{', chords: 'C^7'},
                    {open: '|', chords: 'C-7 F7'},
                    {open: '|', chords: 'Bb^7'},
                    {open: '|', chords: 'Bb-7 Eb7', close: '|'}
                ],
                [
                    {open: '|', chords: 'Ab^7'},
                    {open: '|', chords: 'D-7 G7#9'},
                    {ending: 'N1', open: '|', chords: 'C^7'},
                    {open: '|', chords: 'D-7 G7', close: '}'}
                ],
                [
                    {empty: true},
                    {empty: true},
                    {ending: 'N2', open: '|', chords: 'C^7'},
                    {open: '|', chords: 'x', close: ']'}
                ]
            ]);
        });

        it('should process not /4 number of chords with no repeat', () => {
            const segment = {
                name: '',
                data: [
                    {timeSignature: '4 / 4', open: '[', chords: 'E-7'},
                    {open: '|', chords: 'x'},
                    {open: '|', chords: 'G-7'},
                    {open: '|', chords: 'x'},
                    {open: '|', chords: 'F-7'},
                    {coda: true, open: '|', chords: 'x'},
                    {open: '|', chords: 'C-7'},
                    {open: '|', chords: 'x'},
                    {open: '|', chords: 'B7#9'},
                    {open: '|', chords: 'x', close: 'Z'},
                    {divider: 'Y'},
                    {coda: true, open: '{', chords: 'C-7'},
                    {open: '|', chords: 'x'},
                    {open: '|', chords: 'Ab^7'},
                    {open: '|', chords: 'x', close: '}'}
                ]
            };

            expect(processLines(segment)).toEqual([
                [
                    {timeSignature: '4 / 4', open: '[', chords: 'E-7'},
                    {open: '|', chords: 'x'},
                    {open: '|', chords: 'G-7'},
                    {open: '|', chords: 'x', close: '|'}
                ],
                [
                    {open: '|', chords: 'F-7'},
                    {coda: true, open: '|', chords: 'x'},
                    {open: '|', chords: 'C-7'},
                    {open: '|', chords: 'x', close: '|'}
                ],
                [
                    {open: '|', chords: 'B7#9'},
                    {open: '|', chords: 'x', close: 'Z'}
                ],
                [
                    {coda: true, open: '{', chords: 'C-7'},
                    {open: '|', chords: 'x'},
                    {open: '|', chords: 'Ab^7'},
                    {open: '|', chords: 'x', close: '}'}
                ]
            ]);
        });

        it('should process lines with long 8 bars repeats, All Through The Night', () => {
            const segment = {
                name: 'A',
                data: [
                    {timeSignature: '4 / 4', open: '{', chords: 'F^7'},
                    {open: '|', chords: 'Eh7 A7b9'},
                    {open: '|', chords: 'D-7 Db7'},
                    {open: '|', chords: 'C-7 F7b9', close: '|'},
                    {open: '|', chords: 'Bb^7'},
                    {open: '|', chords: 'Bb-7 Eb7b9'},
                    {open: '|', chords: 'Ab^7'},
                    {open: '|', chords: 'x', close: '|'},
                    {ending: 'N1', open: '|', chords: 'Ah7'},
                    {open: '|', chords: 'D7b9'},
                    {open: '|', chords: 'Gh7'},
                    {open: '|', chords: 'C7b9', close: '|'},
                    {open: '|', chords: 'F6'},
                    {open: '|', chords: 'D7b9'},
                    {open: '|', chords: 'G-7'},
                    {open: '|', chords: 'C7b9', close: '}'},
                    {ending: 'N2', open: '|', chords: 'E^7'},
                    {open: '|', chords: 'E7'},
                    {open: '|', chords: 'Bbh7'},
                    {open: '|', chords: 'Eb7b9', close: '|'},
                    {open: '|', chords: 'Ab^7'},
                    {open: '|', chords: 'x'},
                    {open: '|', chords: 'Gh7'},
                    {open: '|', chords: 'C7b9', close: ']'}
                ]
            };

            expect(processLines(segment)).toEqual([
                [
                    {timeSignature: '4 / 4', open: '{', chords: 'F^7'},
                    {open: '|', chords: 'Eh7 A7b9'},
                    {open: '|', chords: 'D-7 Db7'},
                    {open: '|', chords: 'C-7 F7b9', close: '|'}
                ],
                [
                    {open: '|', chords: 'Bb^7'},
                    {open: '|', chords: 'Bb-7 Eb7b9'},
                    {open: '|', chords: 'Ab^7'},
                    {open: '|', chords: 'x', close: '|'}
                ],
                [
                    {ending: 'N1', open: '|', chords: 'Ah7'},
                    {open: '|', chords: 'D7b9'},
                    {open: '|', chords: 'Gh7'},
                    {open: '|', chords: 'C7b9', close: '|'}
                ],
                [
                    {open: '|', chords: 'F6'},
                    {open: '|', chords: 'D7b9'},
                    {open: '|', chords: 'G-7'},
                    {open: '|', chords: 'C7b9', close: '}'}
                ],
                [
                    {ending: 'N2', open: '|', chords: 'E^7'},
                    {open: '|', chords: 'E7'},
                    {open: '|', chords: 'Bbh7'},
                    {open: '|', chords: 'Eb7b9', close: '|'}
                ],
                [
                    {open: '|', chords: 'Ab^7'},
                    {open: '|', chords: 'x'},
                    {open: '|', chords: 'Gh7'},
                    {open: '|', chords: 'C7b9', close: ']'}
                ]
            ]);
        });
        it('should process lines divider inside segment, divider should break the line, A. Beleza é Você, Menina', () => {
            const segment = {
                name: 'i',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '[',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'B-7',
                        harmony: [{root: 'B', quality: '-7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', numeric: 5}],
                        close: ']'
                    },
                    {divider: 'Y'},
                    {
                        open: '{',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'B-7',
                        harmony: [{root: 'B', quality: '-7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'E-9',
                        harmony: [{root: 'E', quality: '-9', numeric: 5}],
                        close: '}'
                    },
                    {divider: 'Y', close: ']'}
                ]
            };

            expect(processLines(segment)).toEqual([
                [
                    {
                        timeSignature: '4 / 4',
                        open: '[',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'B-7',
                        harmony: [{root: 'B', quality: '-7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', numeric: 1}],
                        close: '|'
                    }
                ],
                [
                    {
                        open: '|',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', numeric: 5}],
                        close: ']'
                    }
                ],
                [
                    {
                        open: '{',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'B-7',
                        harmony: [{root: 'B', quality: '-7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'E-9',
                        harmony: [{root: 'E', quality: '-9', numeric: 5}],
                        close: '}'
                    }
                ]
            ]);
        });
        it('should process lines divider after segment, A.Epopéia de Zumbi - In ABC ABC', () => {
            const segment = {
                name: 'A',
                data: [
                    {
                        open: '{',
                        chords: 'E-',
                        harmony: [{root: 'E', quality: '-', numeric: 1}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'D7',
                        harmony: [{root: 'D', quality: '7', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'x(D7/F#)',
                        harmony: [{root: 'x'}],
                        alt: [{root: 'D', quality: '7', inversion: '/F#', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'C7',
                        harmony: [{root: 'C', quality: '7', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'x(C7/Bb)',
                        harmony: [{root: 'x'}],
                        alt: [{root: 'C', quality: '7', inversion: '/Bb', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'B7',
                        harmony: [{root: 'B', quality: '7', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: '}'
                    },
                    {divider: 'Y'},
                    {
                        open: '{',
                        chords: 'A-',
                        harmony: [{root: 'A', quality: '-', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'D7',
                        harmony: [{root: 'D', quality: '7', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'G',
                        harmony: [{root: 'G', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'C',
                        harmony: [{root: 'C', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'F#h',
                        harmony: [{root: 'F', shift: '#', quality: 'h', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'B7',
                        harmony: [{root: 'B', quality: '7', numeric: 5}]
                    },
                    {
                        ending: 'N1',
                        open: '|',
                        chords: 'E7',
                        harmony: [{root: 'E', quality: '7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: '}'
                    },
                    {
                        ending: 'N2',
                        open: '|',
                        chords: 'E- B7',
                        harmony: [
                            {root: 'E', quality: '-', numeric: 1},
                            {root: 'B', quality: '7', numeric: 5}
                        ],
                        close: ']'
                    },
                    {divider: 'Y', close: ']'}
                ]
            };

            expect(processLines(segment)).toEqual([
                [
                    {
                        open: '{',
                        chords: 'E-',
                        harmony: [{root: 'E', quality: '-', numeric: 1}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'D7',
                        harmony: [{root: 'D', quality: '7', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'x(D7/F#)',
                        harmony: [{root: 'x'}],
                        alt: [{root: 'D', quality: '7', inversion: '/F#', numeric: 7}],
                        close: '|'
                    }
                ],
                [
                    {
                        open: '|',
                        chords: 'C7',
                        harmony: [{root: 'C', quality: '7', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'x(C7/Bb)',
                        harmony: [{root: 'x'}],
                        alt: [{root: 'C', quality: '7', inversion: '/Bb', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'B7',
                        harmony: [{root: 'B', quality: '7', numeric: 5}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}], close: '}'}
                ],
                [
                    {
                        open: '{',
                        chords: 'A-',
                        harmony: [{root: 'A', quality: '-', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'D7',
                        harmony: [{root: 'D', quality: '7', numeric: 7}]
                    },
                    {open: '|', chords: 'G', harmony: [{root: 'G', numeric: 3}]},
                    {
                        open: '|',
                        chords: 'C',
                        harmony: [{root: 'C', numeric: 6}],
                        close: '|'
                    }
                ],
                [
                    {
                        open: '|',
                        chords: 'F#h',
                        harmony: [{root: 'F', shift: '#', quality: 'h', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'B7',
                        harmony: [{root: 'B', quality: '7', numeric: 5}]
                    },
                    {
                        ending: 'N1',
                        open: '|',
                        chords: 'E7',
                        harmony: [{root: 'E', quality: '7', numeric: 1}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}], close: '}'}
                ],
                [
                    {empty: true},
                    {empty: true},
                    {empty: true},
                    {
                        ending: 'N2',
                        open: '|',
                        chords: 'E- B7',
                        harmony: [
                            {root: 'E', quality: '-', numeric: 1},
                            {root: 'B', quality: '7', numeric: 5}
                        ],
                        close: ']'
                    }
                ]
            ]);
        });
        it('should correctly process ending line if previous was shorter than 4', () => {
            const segment = {
                name: 'A',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '[',
                        chords: 'G^9',
                        harmony: [{root: 'G', quality: '^9', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-9 Eb-6',
                        harmony: [
                            {root: 'E', shift: 'b', quality: '-9', numeric: 4},
                            {root: 'E', shift: 'b', quality: '-6', numeric: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-9',
                        harmony: [{root: 'D', quality: '-9', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'G7#9#5',
                        harmony: [{root: 'G', quality: '7#9#5', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'C-9',
                        harmony: [{root: 'C', quality: '-9', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'F13b9',
                        harmony: [{root: 'F', quality: '13b9', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'Bb^9 A-7',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '^9', numeric: 1},
                            {root: 'A', quality: '-7', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-9 G-7/F',
                        harmony: [
                            {root: 'G', quality: '-9', numeric: 6},
                            {root: 'G', quality: '-7', inversion: '/F', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-9',
                        harmony: [{root: 'E', quality: '-9', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'A7b9b5',
                        harmony: [{root: 'A', quality: '7b9b5', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-9 Ab9',
                        harmony: [
                            {root: 'E', shift: 'b', quality: '-9', numeric: 4},
                            {root: 'A', shift: 'b', quality: '9', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Db-9 Gb9',
                        harmony: [
                            {root: 'D', shift: 'b', quality: '-9', numeric: 3},
                            {root: 'G', shift: 'b', quality: '9', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C-9 F7b9',
                        harmony: [
                            {root: 'C', quality: '-9', numeric: 2},
                            {root: 'F', quality: '7b9', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb^9',
                        harmony: [{root: 'B', shift: 'b', quality: '^9', numeric: 1}]
                    },
                    {
                        ending: 'N1',
                        open: '|',
                        chords: 'D9sus',
                        harmony: [{root: 'D', quality: '9sus', numeric: 3}],
                        close: '}'
                    },
                    {
                        ending: 'N2',
                        open: '|',
                        chords: 'B7#9',
                        harmony: [{root: 'B', quality: '7#9', numeric: 1}],
                        close: ']'
                    }
                ]
            };

            expect(processLines(segment)).toEqual([
                [
                    {
                        timeSignature: '4 / 4',
                        open: '[',
                        chords: 'G^9',
                        harmony: [{root: 'G', quality: '^9', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-9 Eb-6',
                        harmony: [
                            {root: 'E', shift: 'b', quality: '-9', numeric: 4},
                            {root: 'E', shift: 'b', quality: '-6', numeric: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-9',
                        harmony: [{root: 'D', quality: '-9', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'G7#9#5',
                        harmony: [{root: 'G', quality: '7#9#5', numeric: 6}],
                        close: '|'
                    }
                ],
                [
                    {
                        open: '|',
                        chords: 'C-9',
                        harmony: [{root: 'C', quality: '-9', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'F13b9',
                        harmony: [{root: 'F', quality: '13b9', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'Bb^9 A-7',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '^9', numeric: 1},
                            {root: 'A', quality: '-7', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-9 G-7/F',
                        harmony: [
                            {root: 'G', quality: '-9', numeric: 6},
                            {root: 'G', quality: '-7', inversion: '/F', numeric: 6}
                        ],
                        close: '|'
                    }
                ],
                [
                    {
                        open: '|',
                        chords: 'E-9',
                        harmony: [{root: 'E', quality: '-9', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'A7b9b5',
                        harmony: [{root: 'A', quality: '7b9b5', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-9 Ab9',
                        harmony: [
                            {root: 'E', shift: 'b', quality: '-9', numeric: 4},
                            {root: 'A', shift: 'b', quality: '9', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Db-9 Gb9',
                        harmony: [
                            {root: 'D', shift: 'b', quality: '-9', numeric: 3},
                            {root: 'G', shift: 'b', quality: '9', numeric: 6}
                        ],
                        close: '|'
                    }
                ],
                [
                    {
                        open: '|',
                        chords: 'C-9 F7b9',
                        harmony: [
                            {root: 'C', quality: '-9', numeric: 2},
                            {root: 'F', quality: '7b9', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb^9',
                        harmony: [{root: 'B', shift: 'b', quality: '^9', numeric: 1}]
                    },
                    {
                        ending: 'N1',
                        open: '|',
                        chords: 'D9sus',
                        harmony: [{root: 'D', quality: '9sus', numeric: 3}],
                        close: '}'
                    }
                ],
                [
                    {empty: true},
                    {empty: true},
                    {
                        ending: 'N2',
                        open: '|',
                        chords: 'B7#9',
                        harmony: [{root: 'B', quality: '7#9', numeric: 1}],
                        close: ']'
                    }
                ]
            ]);
        });
    });
});
