/* eslint max-len: 0 */

import IRealProChartModel from '../IRealProChartModel';
import {IIRealProChartModelProps} from '../types';
// import {varDump} from '../../../../server/utils';

const emptyRealProChartProps: IIRealProChartModelProps = {
    title: '',
    author: '',
    style: '',
    key: '',
    chordString: ''
};

describe('IRealProChartModel', () => {
    it('should init with empty props', () => {
        expect(() => {
            // eslint-disable-next-line no-new
            new IRealProChartModel(emptyRealProChartProps);
        }).toThrowError('Segment string has no bar lines');
    });
    it('should init with valid Afternoon In Paris props with A A B A form and 2 endings', () => {
        const props = {
            title: 'Afternoon In Paris',
            author: 'Lewis John',
            style: 'Medium Swing',
            key: 'C',
            chordString: '*A{T44C^7 |C-7 F7|Bb^7 |Bb-7 Eb7|Ab^7 |D-7 G7#9|N1C^7 |D-7 G7 } |N2C^7 |x ]*B[D-7 |G7 |C^7/E |A7 |Y|D-7 |G7 |C^7(C#-7) (F#7)|D-7 G7 ]*A[C^7 |C-7 F7|Bb^7 |Bb-7 Eb7|Ab^7 |D-7 G7#9|C^7 |D-7 G7 Z'
        };
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Afternoon In Paris');
        expect(model.errors).toEqual([]);
        expect(model.author).toBe('Lewis John');
        expect(model.style).toBe('Medium Swing');
        expect(model.key).toBe('C');
        expect(model.chordString.length).toBe(191);
        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '{',
                        chords: 'C^7',
                        harmony: [{root: 'C', quality: '^7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'C-7 F7',
                        harmony: [
                            {root: 'C', quality: '-7', numeric: 1},
                            {root: 'F', quality: '7', numeric: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb^7',
                        harmony: [{root: 'B', quality: '^7', shift: 'b', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7 Eb7',
                        harmony: [
                            {root: 'B', quality: '-7', shift: 'b', numeric: 7},
                            {root: 'E', quality: '7', shift: 'b', numeric: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab^7',
                        harmony: [{root: 'A', quality: '^7', shift: 'b', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'D-7 G7#9',
                        harmony: [
                            {root: 'D', quality: '-7', numeric: 2},
                            {root: 'G', quality: '7#9', numeric: 5}
                        ]
                    },
                    {
                        ending: 'N1',
                        open: '|',
                        chords: 'C^7',
                        harmony: [{root: 'C', quality: '^7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'D-7 G7',
                        harmony: [
                            {root: 'D', quality: '-7', numeric: 2},
                            {root: 'G', quality: '7', numeric: 5}
                        ],
                        close: '}'
                    },
                    {
                        ending: 'N2',
                        open: '|',
                        chords: 'C^7',
                        harmony: [{root: 'C', quality: '^7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: ']'
                    }
                ]
            },
            {
                name: 'B',
                data: [
                    {
                        open: '[',
                        chords: 'D-7',
                        harmony: [{root: 'D', quality: '-7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'G7',
                        harmony: [{root: 'G', quality: '7', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'C^7/E',
                        harmony: [{root: 'C', quality: '^7', inversion: '/E', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'A7',
                        harmony: [{root: 'A', quality: '7', numeric: 6}],
                        close: '|'
                    },
                    {divider: 'Y'},
                    {
                        open: '|',
                        chords: 'D-7',
                        harmony: [{root: 'D', quality: '-7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'G7',
                        harmony: [{root: 'G', quality: '7', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'C^7(C#-7) (F#7)',
                        harmony: [
                            {
                                root: 'C',
                                quality: '^7',
                                numeric: 1
                            }
                        ],
                        alt: [
                            {
                                root: 'C',
                                shift: '#',
                                quality: '-7',
                                numeric: 1
                            },
                            {
                                root: 'F',
                                shift: '#',
                                quality: '7',
                                numeric: 4
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-7 G7',
                        harmony: [
                            {root: 'D', quality: '-7', numeric: 2},
                            {root: 'G', quality: '7', numeric: 5}
                        ],
                        close: ']'
                    }
                ]
            },
            {
                name: 'A',
                data: [
                    {
                        open: '[',
                        chords: 'C^7',
                        harmony: [{root: 'C', quality: '^7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'C-7 F7',
                        harmony: [
                            {root: 'C', quality: '-7', numeric: 1},
                            {root: 'F', quality: '7', numeric: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb^7',
                        harmony: [{root: 'B', quality: '^7', shift: 'b', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7 Eb7',
                        harmony: [
                            {root: 'B', quality: '-7', shift: 'b', numeric: 7},
                            {root: 'E', quality: '7', shift: 'b', numeric: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab^7',
                        harmony: [{root: 'A', quality: '^7', shift: 'b', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'D-7 G7#9',
                        harmony: [
                            {root: 'D', quality: '-7', numeric: 2},
                            {root: 'G', quality: '7#9', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C^7',
                        harmony: [{root: 'C', quality: '^7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'D-7 G7',
                        harmony: [
                            {root: 'D', quality: '-7', numeric: 2},
                            {root: 'G', quality: '7', numeric: 5}
                        ],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('should load 500 Miles High with no segments or endings', () => {
        const props = {
            title: '500 Miles High',
            author: 'Corea Chick',
            style: 'Bossa Nova',
            key: 'E-',
            chordString: '[T44E-7 |x |G-7 |x |Bb^7 |x |Bh7 |E7#9 |A-7 |x |F#h7 |x |F-7 |x Q|C-7 |x |B7#9 |x Z Y{QC-7 |x |Ab^7 |x }'
        };
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('500 Miles High');
        expect(model.errors).toEqual([]);
        expect(model.author).toBe('Corea Chick');
        expect(model.style).toBe('Bossa Nova');
        expect(model.key).toBe('E-');
        expect(model.chordString.length).toBe(104);

        expect(model.segments).toEqual([
            {
                name: '',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '[',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', numeric: 1}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', numeric: 3}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Bb^7',
                        harmony: [{root: 'B', shift: 'b', quality: '^7', numeric: 5}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Bh7',
                        harmony: [{root: 'B', quality: 'h7', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'E7#9',
                        harmony: [{root: 'E', quality: '7#9', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', numeric: 4}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'F#h7',
                        harmony: [{root: 'F', shift: '#', quality: 'h7', numeric: 2}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'F-7',
                        harmony: [{root: 'F', quality: '-7', numeric: 2}]
                    },
                    {
                        coda: true,
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}]
                    },
                    {
                        open: '|',
                        chords: 'C-7',
                        harmony: [{root: 'C', quality: '-7', numeric: 6}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'B7#9',
                        harmony: [{root: 'B', quality: '7#9', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: 'Z'
                    },
                    {divider: 'Y'},
                    {
                        coda: true,
                        open: '{',
                        chords: 'C-7',
                        harmony: [{root: 'C', quality: '-7', numeric: 6}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Ab^7',
                        harmony: [{root: 'A', shift: 'b', quality: '^7', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: '}'
                    }
                ]
            }
        ]);
    });
    it('should handle string with segment name inside and outside the bar lines, A Night In Tunisia', () => {
        const propsWithSegmentsInsideBars = {
            title: 'A Night In Tunisia',
            key: 'D-',
            chordString: '*A{T44Eb7 |D- |Eb7 |D- |Eb7 |D- |Eh7 A7b9|D- }*B[Ah7 |D7b9 |G-7 |x |Gh7 |C7b9 |F^7 |Eh7 A7b9 ]*A[Eb7 |D- |Eb7 |D- |Eb7 |D- |Eh7 A7b9|D- Q ZY[QEh7 |x |Eb7#11 |x |D-7 |x |G7#11 |x |G-^7 |G-7 |Gb7#9 |x |F^7 |x |Eh7 |A7b9 Z'
        } as IIRealProChartModelProps;

        const model = new IRealProChartModel(propsWithSegmentsInsideBars);

        expect(model.chordString.length).toBe(219);

        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '{',
                        chords: 'Eb7',
                        harmony: [{root: 'E', shift: 'b', quality: '7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'D-',
                        harmony: [{root: 'D', quality: '-', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb7',
                        harmony: [{root: 'E', shift: 'b', quality: '7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'D-',
                        harmony: [{root: 'D', quality: '-', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb7',
                        harmony: [{root: 'E', shift: 'b', quality: '7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'D-',
                        harmony: [{root: 'D', quality: '-', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', numeric: 2},
                            {root: 'A', quality: '7b9', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-',
                        harmony: [{root: 'D', quality: '-', numeric: 1}],
                        close: '}'
                    }
                ]
            },
            {
                name: 'B',
                data: [
                    {
                        open: '[',
                        chords: 'Ah7',
                        harmony: [{root: 'A', quality: 'h7', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'D7b9',
                        harmony: [{root: 'D', quality: '7b9', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', numeric: 4}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Gh7',
                        harmony: [{root: 'G', quality: 'h7', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'C7b9',
                        harmony: [{root: 'C', quality: '7b9', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'F^7',
                        harmony: [{root: 'F', quality: '^7', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', numeric: 2},
                            {root: 'A', quality: '7b9', numeric: 5}
                        ],
                        close: ']'
                    }
                ]
            },
            {
                name: 'A',
                data: [
                    {
                        open: '[',
                        chords: 'Eb7',
                        harmony: [{root: 'E', shift: 'b', quality: '7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'D-',
                        harmony: [{root: 'D', quality: '-', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb7',
                        harmony: [{root: 'E', shift: 'b', quality: '7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'D-',
                        harmony: [{root: 'D', quality: '-', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb7',
                        harmony: [{root: 'E', shift: 'b', quality: '7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'D-',
                        harmony: [{root: 'D', quality: '-', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', numeric: 2},
                            {root: 'A', quality: '7b9', numeric: 5}
                        ]
                    },
                    {
                        coda: true,
                        open: '|',
                        chords: 'D-',
                        harmony: [{root: 'D', quality: '-', numeric: 1}],
                        close: 'Z'
                    },
                    {divider: 'Y'},
                    {
                        coda: true,
                        open: '[',
                        chords: 'Eh7',
                        harmony: [{root: 'E', quality: 'h7', numeric: 2}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Eb7#11',
                        harmony: [{root: 'E', shift: 'b', quality: '7#11', numeric: 2}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'D-7',
                        harmony: [{root: 'D', quality: '-7', numeric: 1}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'G7#11',
                        harmony: [{root: 'G', quality: '7#11', numeric: 4}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'G-^7',
                        harmony: [{root: 'G', quality: '-^7', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Gb7#9',
                        harmony: [{root: 'G', shift: 'b', quality: '7#9', numeric: 4}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'F^7',
                        harmony: [{root: 'F', quality: '^7', numeric: 3}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Eh7',
                        harmony: [{root: 'E', quality: 'h7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'A7b9',
                        harmony: [{root: 'A', quality: '7b9', numeric: 5}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('should handle 2 bars repeats (r) like in The African Queen', () => {
        const props = {
            title: 'The African Queen',
            key: 'C-',
            chordString: '*A[T44C-9 Db9|x |r|C-9 Db9|x |r|]*A[C-9 Db9|x |r|C-9 Db9|x |r|]*B[Bb7 A7|Ab7 G7|C-9 Db9|x |C-9 Db9|x Z'
        } as IIRealProChartModelProps;
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('The African Queen');
        expect(model.errors).toEqual([]);
        expect(model.chordString.length).toBe(102);

        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '[',
                        chords: 'C-9 Db9',
                        harmony: [
                            {root: 'C', quality: '-9', numeric: 1},
                            {root: 'D', shift: 'b', quality: '9', numeric: 2}
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'C-9 Db9',
                        harmony: [
                            {root: 'C', quality: '-9', numeric: 1},
                            {root: 'D', shift: 'b', quality: '9', numeric: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'C-9 Db9',
                        harmony: [
                            {root: 'C', quality: '-9', numeric: 1},
                            {root: 'D', shift: 'b', quality: '9', numeric: 2}
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'C-9 Db9',
                        harmony: [
                            {root: 'C', quality: '-9', numeric: 1},
                            {root: 'D', shift: 'b', quality: '9', numeric: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: ']'
                    }
                ]
            },
            {
                name: 'A',
                data: [
                    {
                        open: '[',
                        chords: 'C-9 Db9',
                        harmony: [
                            {root: 'C', quality: '-9', numeric: 1},
                            {root: 'D', shift: 'b', quality: '9', numeric: 2}
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'C-9 Db9',
                        harmony: [
                            {root: 'C', quality: '-9', numeric: 1},
                            {root: 'D', shift: 'b', quality: '9', numeric: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'C-9 Db9',
                        harmony: [
                            {root: 'C', quality: '-9', numeric: 1},
                            {root: 'D', shift: 'b', quality: '9', numeric: 2}
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'C-9 Db9',
                        harmony: [
                            {root: 'C', quality: '-9', numeric: 1},
                            {root: 'D', shift: 'b', quality: '9', numeric: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: ']'
                    }
                ]
            },
            {
                name: 'B',
                data: [
                    {
                        open: '[',
                        chords: 'Bb7 A7',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '7', numeric: 7},
                            {root: 'A', quality: '7', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab7 G7',
                        harmony: [
                            {root: 'A', shift: 'b', quality: '7', numeric: 6},
                            {root: 'G', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C-9 Db9',
                        harmony: [
                            {root: 'C', quality: '-9', numeric: 1},
                            {root: 'D', shift: 'b', quality: '9', numeric: 2}
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'C-9 Db9',
                        harmony: [
                            {root: 'C', quality: '-9', numeric: 1},
                            {root: 'D', shift: 'b', quality: '9', numeric: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('should handle unclosed section like in Ahmid-6', () => {
        const props = {
            title: 'Ahmid-6',
            key: 'C',
            chordString: '*A[T44D-7 |C#-7 |r|F#-7 B7|E-7 A7|G F|E- D-7|C^7 |B7 |Bb^7#11 |Ah7 D7b9|F#h7 B7b9|Eh7 A7b9|D-7 E-7|F-7 Bb7|Eb9sus|x|Ab^9|x|Ab7sus|x|Db^13|x|Dh7 G7b9|C-7 F7|F-7 Bb7|Gh7 C7#9|F-7 F#-7|G-7 C-7|T34 F#-7 B7 |E-7 A7sus|T24A7sus|T44 A7sus |x *B[D-7 |C#-7 |D-7 |C#-7 |F#-7 B7|E-7 A7|A-7 |p p D7|G^7 Bb7|Eb^7 B7|E^7 G7|C^7 Ab7|Db^7 E7|A^7 C7|F^7|x|E-7|x|F^7|x|E-7|x Z'
        } as IIRealProChartModelProps;

        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Ahmid-6');
        expect(model.errors).toEqual([]);

        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '[',
                        chords: 'D-7',
                        harmony: [{root: 'D', quality: '-7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'C#-7',
                        harmony: [{root: 'C', shift: '#', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'D-7',
                        harmony: [{root: 'D', quality: '-7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'C#-7',
                        harmony: [{root: 'C', shift: '#', quality: '-7', numeric: 1}],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'F#-7 B7',
                        harmony: [
                            {root: 'F', shift: '#', quality: '-7', numeric: 4},
                            {root: 'B', quality: '7', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-7 A7',
                        harmony: [
                            {root: 'E', quality: '-7', numeric: 3},
                            {root: 'A', quality: '7', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G F',
                        harmony: [{root: 'G', numeric: 5}, {root: 'F', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'E- D-7',
                        harmony: [
                            {root: 'E', quality: '-', numeric: 3},
                            {root: 'D', quality: '-7', numeric: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C^7',
                        harmony: [{root: 'C', quality: '^7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'B7',
                        harmony: [{root: 'B', quality: '7', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Bb^7#11',
                        harmony: [{root: 'B', shift: 'b', quality: '^7#11', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Ah7 D7b9',
                        harmony: [
                            {root: 'A', quality: 'h7', numeric: 6},
                            {root: 'D', quality: '7b9', numeric: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F#h7 B7b9',
                        harmony: [
                            {root: 'F', shift: '#', quality: 'h7', numeric: 4},
                            {root: 'B', quality: '7b9', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', numeric: 3},
                            {root: 'A', quality: '7b9', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-7 E-7',
                        harmony: [
                            {root: 'D', quality: '-7', numeric: 2},
                            {root: 'E', quality: '-7', numeric: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F-7 Bb7',
                        harmony: [
                            {root: 'F', quality: '-7', numeric: 4},
                            {root: 'B', shift: 'b', quality: '7', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb9sus',
                        harmony: [{root: 'E', shift: 'b', quality: '9sus', numeric: 3}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Ab^9',
                        harmony: [{root: 'A', shift: 'b', quality: '^9', numeric: 6}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Ab7sus',
                        harmony: [{root: 'A', shift: 'b', quality: '7sus', numeric: 6}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Db^13',
                        harmony: [{root: 'D', shift: 'b', quality: '^13', numeric: 2}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Dh7 G7b9',
                        harmony: [
                            {root: 'D', quality: 'h7', numeric: 2},
                            {root: 'G', quality: '7b9', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C-7 F7',
                        harmony: [
                            {root: 'C', quality: '-7', numeric: 1},
                            {root: 'F', quality: '7', numeric: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F-7 Bb7',
                        harmony: [
                            {root: 'F', quality: '-7', numeric: 4},
                            {root: 'B', shift: 'b', quality: '7', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Gh7 C7#9',
                        harmony: [
                            {root: 'G', quality: 'h7', numeric: 5},
                            {root: 'C', quality: '7#9', numeric: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F-7 F#-7',
                        harmony: [
                            {root: 'F', quality: '-7', numeric: 4},
                            {root: 'F', shift: '#', quality: '-7', numeric: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7 C-7',
                        harmony: [
                            {root: 'G', quality: '-7', numeric: 5},
                            {root: 'C', quality: '-7', numeric: 1}
                        ]
                    },
                    {
                        timeSignature: '3 / 4',
                        open: '|',
                        chords: 'F#-7 B7',
                        harmony: [
                            {root: 'F', shift: '#', quality: '-7', numeric: 4},
                            {root: 'B', quality: '7', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-7 A7sus',
                        harmony: [
                            {root: 'E', quality: '-7', numeric: 3},
                            {root: 'A', quality: '7sus', numeric: 6}
                        ]
                    },
                    {
                        timeSignature: '2 / 4',
                        open: '|',
                        chords: 'A7sus',
                        harmony: [{root: 'A', quality: '7sus', numeric: 6}]
                    },
                    {
                        timeSignature: '4 / 4',
                        open: '|',
                        chords: 'A7sus',
                        harmony: [{root: 'A', quality: '7sus', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: ']'
                    }
                ]
            },
            {
                name: 'B',
                data: [
                    {
                        open: '[',
                        chords: 'D-7',
                        harmony: [{root: 'D', quality: '-7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'C#-7',
                        harmony: [{root: 'C', shift: '#', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'D-7',
                        harmony: [{root: 'D', quality: '-7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'C#-7',
                        harmony: [{root: 'C', shift: '#', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'F#-7 B7',
                        harmony: [
                            {root: 'F', shift: '#', quality: '-7', numeric: 4},
                            {root: 'B', quality: '7', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-7 A7',
                        harmony: [
                            {root: 'E', quality: '-7', numeric: 3},
                            {root: 'A', quality: '7', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'p p D7',
                        harmony: [
                            {root: 'p'},
                            {root: 'p'},
                            {root: 'D', quality: '7', numeric: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G^7 Bb7',
                        harmony: [
                            {root: 'G', quality: '^7', numeric: 5},
                            {root: 'B', shift: 'b', quality: '7', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb^7 B7',
                        harmony: [
                            {root: 'E', shift: 'b', quality: '^7', numeric: 3},
                            {root: 'B', quality: '7', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E^7 G7',
                        harmony: [
                            {root: 'E', quality: '^7', numeric: 3},
                            {root: 'G', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C^7 Ab7',
                        harmony: [
                            {root: 'C', quality: '^7', numeric: 1},
                            {root: 'A', shift: 'b', quality: '7', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Db^7 E7',
                        harmony: [
                            {root: 'D', shift: 'b', quality: '^7', numeric: 2},
                            {root: 'E', quality: '7', numeric: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A^7 C7',
                        harmony: [
                            {root: 'A', quality: '^7', numeric: 6},
                            {root: 'C', quality: '7', numeric: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^7',
                        harmony: [{root: 'F', quality: '^7', numeric: 4}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', numeric: 3}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'F^7',
                        harmony: [{root: 'F', quality: '^7', numeric: 4}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('should handle Airmail Special with Segno symbol (s) and 4 double repeats', () => {
        const props = {
            title: 'Airmail Special',
            key: 'C',
            chordString: '*i[T44C6 |x |r|r|r|][Co7 |x |r|Co7 Bo7|Bbo7 |Ab7 |G7 ] *A{SC C/E|F G|C C/E|F G|C C7|F F#o7|C/G |C  }*B[Co7 |x |r|Co7 Bo7|Bbo7 |Ab7 |G7 Z'
        } as IIRealProChartModelProps;

        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Airmail Special');
        expect(model.errors).toEqual([]);
        expect(model.segments).toEqual([
            {
                name: 'i',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '[',
                        chords: 'C6',
                        harmony: [{root: 'C', quality: '6', numeric: 1}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'C6',
                        harmony: [{root: 'C', quality: '6', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'C6',
                        harmony: [{root: 'C', quality: '6', numeric: 1}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'C6',
                        harmony: [{root: 'C', quality: '6', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: ']'
                    },
                    {
                        open: '[',
                        chords: 'Co7',
                        harmony: [{root: 'C', quality: 'o7', numeric: 1}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Co7',
                        harmony: [{root: 'C', quality: 'o7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'Co7 Bo7',
                        harmony: [
                            {root: 'C', quality: 'o7', numeric: 1},
                            {root: 'B', quality: 'o7', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bbo7',
                        harmony: [{root: 'B', shift: 'b', quality: 'o7', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Ab7',
                        harmony: [{root: 'A', shift: 'b', quality: '7', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'G7',
                        harmony: [{root: 'G', quality: '7', numeric: 5}],
                        close: ']'
                    }
                ]
            },
            {
                name: 'A',
                data: [
                    {
                        segno: true,
                        open: '{',
                        chords: 'C C/E',
                        harmony: [
                            {root: 'C', numeric: 1},
                            {root: 'C', inversion: '/E', numeric: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F G',
                        harmony: [{root: 'F', numeric: 4}, {root: 'G', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'C C/E',
                        harmony: [
                            {root: 'C', numeric: 1},
                            {root: 'C', inversion: '/E', numeric: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F G',
                        harmony: [{root: 'F', numeric: 4}, {root: 'G', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'C C7',
                        harmony: [
                            {root: 'C', numeric: 1},
                            {root: 'C', quality: '7', numeric: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F F#o7',
                        harmony: [
                            {root: 'F', numeric: 4},
                            {root: 'F', shift: '#', quality: 'o7', numeric: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C/G',
                        harmony: [{root: 'C', inversion: '/G', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'C',
                        harmony: [{root: 'C', numeric: 1}],
                        close: '}'
                    }
                ]
            },
            {
                name: 'B',
                data: [
                    {
                        open: '[',
                        chords: 'Co7',
                        harmony: [{root: 'C', quality: 'o7', numeric: 1}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Co7',
                        harmony: [{root: 'C', quality: 'o7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'Co7 Bo7',
                        harmony: [
                            {root: 'C', quality: 'o7', numeric: 1},
                            {root: 'B', quality: 'o7', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bbo7',
                        harmony: [{root: 'B', shift: 'b', quality: 'o7', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Ab7',
                        harmony: [{root: 'A', shift: 'b', quality: '7', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'G7',
                        harmony: [{root: 'G', quality: '7', numeric: 5}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('should handle Alone Together with two endings on one line', () => {
        const props = {
            title: 'Alone Together',
            key: 'D-',
            chordString: '*A{T44D-6 |Eh7 A7b9|D-6 |Eh7 A7b9|D-6 |Ah7 D7b9|G-7 |x |B-7 E7|G-7 C7|F^7 |Eh7 A7b9|N1D^7 |(Eh7) x (A7b9) }|N2 D^7 |x ]*B[Ah7 |D7b9 |G-6 |x |Gh7 |C7b9 |F^7 |Eh7 A7b9 ]*A[D-6 |Eh7 A7b9|D-6 |Eh7 A7b9|D-6 Bh7|Bb7 A7b9|D-6 |Eh7 A7b9 Z'
        } as IIRealProChartModelProps;

        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Alone Together');
        expect(model.errors).toEqual([]);
        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '{',
                        chords: 'D-6',
                        harmony: [{root: 'D', quality: '-6', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', numeric: 2},
                            {root: 'A', quality: '7b9', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-6',
                        harmony: [{root: 'D', quality: '-6', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', numeric: 2},
                            {root: 'A', quality: '7b9', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-6',
                        harmony: [{root: 'D', quality: '-6', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Ah7 D7b9',
                        harmony: [
                            {root: 'A', quality: 'h7', numeric: 5},
                            {root: 'D', quality: '7b9', numeric: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', numeric: 4}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'B-7 E7',
                        harmony: [
                            {root: 'B', quality: '-7', numeric: 6},
                            {root: 'E', quality: '7', numeric: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7 C7',
                        harmony: [
                            {root: 'G', quality: '-7', numeric: 4},
                            {root: 'C', quality: '7', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^7',
                        harmony: [{root: 'F', quality: '^7', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', numeric: 2},
                            {root: 'A', quality: '7b9', numeric: 5}
                        ]
                    },
                    {
                        ending: 'N1',
                        open: '|',
                        chords: 'D^7',
                        harmony: [{root: 'D', quality: '^7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: '(Eh7) x (A7b9)',
                        harmony: [{root: 'x'}],
                        alt: [
                            {root: 'E', quality: 'h7', numeric: 2},
                            {root: 'A', quality: '7b9', numeric: 5}
                        ],
                        close: '}'
                    },
                    {
                        ending: 'N2',
                        open: '|',
                        chords: 'D^7',
                        harmony: [{root: 'D', quality: '^7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: ']'
                    }
                ]
            },
            {
                name: 'B',
                data: [
                    {
                        open: '[',
                        chords: 'Ah7',
                        harmony: [{root: 'A', quality: 'h7', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'D7b9',
                        harmony: [{root: 'D', quality: '7b9', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'G-6',
                        harmony: [{root: 'G', quality: '-6', numeric: 4}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Gh7',
                        harmony: [{root: 'G', quality: 'h7', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'C7b9',
                        harmony: [{root: 'C', quality: '7b9', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'F^7',
                        harmony: [{root: 'F', quality: '^7', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', numeric: 2},
                            {root: 'A', quality: '7b9', numeric: 5}
                        ],
                        close: ']'
                    }
                ]
            },
            {
                name: 'A',
                data: [
                    {
                        open: '[',
                        chords: 'D-6',
                        harmony: [{root: 'D', quality: '-6', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', numeric: 2},
                            {root: 'A', quality: '7b9', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-6',
                        harmony: [{root: 'D', quality: '-6', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', numeric: 2},
                            {root: 'A', quality: '7b9', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-6 Bh7',
                        harmony: [
                            {root: 'D', quality: '-6', numeric: 1},
                            {root: 'B', quality: 'h7', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb7 A7b9',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '7', numeric: 6},
                            {root: 'A', quality: '7b9', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-6',
                        harmony: [{root: 'D', quality: '-6', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', numeric: 2},
                            {root: 'A', quality: '7b9', numeric: 5}
                        ],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('should handle Ana Maria with 2 bar repeat at the end of segment', () => {
        const props = {
            title: 'Ana Maria',
            key: 'G',
            chordString: '*A[T44G^7 |Eb^7/G |G7sus |Eb^7/G |Db^7/F |Gb^7#11 |Ab-7 |Bb/Ab |G-7 |C7sus |D/C |C7sus |Ab/C Bb/C|Ab/C {G7b9sus |Eb^7/G }*B[G^7 |G7sus |Eb/F E7alt|Eb7sus |D^7 F7#5|Bb-7 |Ab-7 |Bb/Ab |G-7 |C7sus |Bb^7 A-7|F-7 |Bb7sus|x|Db7sus|x *C[B-7|x|Eb-7|x|D^7 F7#5|Bb-7 |Ab-7|Bb/Ab|G-7|C7sus|Bb^7 A-7|F-7 E-7 {G7b9sus |Eb^7/G }'
        } as IIRealProChartModelProps;
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Ana Maria');
        expect(model.errors).toEqual([]);
        expect(model.chordString.length).toBe(314);

        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '[',
                        chords: 'G^7',
                        harmony: [{root: 'G', quality: '^7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb^7/G',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '^7',
                                inversion: '/G',
                                numeric: 6
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7sus',
                        harmony: [{root: 'G', quality: '7sus', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb^7/G',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '^7',
                                inversion: '/G',
                                numeric: 6
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Db^7/F',
                        harmony: [
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '^7',
                                inversion: '/F',
                                numeric: 5
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Gb^7#11',
                        harmony: [{root: 'G', shift: 'b', quality: '^7#11', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [{root: 'A', shift: 'b', quality: '-7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'Bb/Ab',
                        harmony: [{root: 'B', shift: 'b', inversion: '/Ab', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'C7sus',
                        harmony: [{root: 'C', quality: '7sus', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'D/C',
                        harmony: [{root: 'D', inversion: '/C', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'C7sus',
                        harmony: [{root: 'C', quality: '7sus', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Ab/C Bb/C',
                        harmony: [
                            {root: 'A', shift: 'b', inversion: '/C', numeric: 2},
                            {root: 'B', shift: 'b', inversion: '/C', numeric: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab/C',
                        harmony: [{root: 'A', shift: 'b', inversion: '/C', numeric: 2}]
                    },
                    {
                        open: '{',
                        chords: 'G7b9sus',
                        harmony: [{root: 'G', quality: '7b9sus', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb^7/G',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '^7',
                                inversion: '/G',
                                numeric: 6
                            }
                        ],
                        close: '}'
                    }
                ]
            },
            {
                name: 'B',
                data: [
                    {
                        open: '[',
                        chords: 'G^7',
                        harmony: [{root: 'G', quality: '^7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'G7sus',
                        harmony: [{root: 'G', quality: '7sus', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb/F E7alt',
                        harmony: [
                            {root: 'E', shift: 'b', inversion: '/F', numeric: 6},
                            {root: 'E', quality: '7alt', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb7sus',
                        harmony: [{root: 'E', shift: 'b', quality: '7sus', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'D^7 F7#5',
                        harmony: [
                            {root: 'D', quality: '^7', numeric: 5},
                            {root: 'F', quality: '7#5', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7',
                        harmony: [{root: 'B', shift: 'b', quality: '-7', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [{root: 'A', shift: 'b', quality: '-7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'Bb/Ab',
                        harmony: [{root: 'B', shift: 'b', inversion: '/Ab', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'C7sus',
                        harmony: [{root: 'C', quality: '7sus', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Bb^7 A-7',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '^7', numeric: 3},
                            {root: 'A', quality: '-7', numeric: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F-7',
                        harmony: [{root: 'F', quality: '-7', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Bb7sus',
                        harmony: [{root: 'B', shift: 'b', quality: '7sus', numeric: 3}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Db7sus',
                        harmony: [{root: 'D', shift: 'b', quality: '7sus', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: ']'
                    }
                ]
            },
            {
                name: 'C',
                data: [
                    {
                        open: '[',
                        chords: 'B-7',
                        harmony: [{root: 'B', quality: '-7', numeric: 3}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Eb-7',
                        harmony: [{root: 'E', shift: 'b', quality: '-7', numeric: 6}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'D^7 F7#5',
                        harmony: [
                            {root: 'D', quality: '^7', numeric: 5},
                            {root: 'F', quality: '7#5', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7',
                        harmony: [{root: 'B', shift: 'b', quality: '-7', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [{root: 'A', shift: 'b', quality: '-7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'Bb/Ab',
                        harmony: [{root: 'B', shift: 'b', inversion: '/Ab', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'C7sus',
                        harmony: [{root: 'C', quality: '7sus', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Bb^7 A-7',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '^7', numeric: 3},
                            {root: 'A', quality: '-7', numeric: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F-7 E-7',
                        harmony: [
                            {root: 'F', quality: '-7', numeric: 7},
                            {root: 'E', quality: '-7', numeric: 6}
                        ]
                    },
                    {
                        open: '{',
                        chords: 'G7b9sus',
                        harmony: [{root: 'G', quality: '7b9sus', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb^7/G',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '^7',
                                inversion: '/G',
                                numeric: 6
                            }
                        ],
                        close: '}'
                    }
                ]
            }
        ]);
    });
    it('should handle Armando\'s Rhumba where segment name is inside and has a left whitespace', () => {
        const props = {
            title: 'Armando\'s Rhumba',
            key: 'C-',
            chordString: '*A[T44 C-7 |D7b9 |G7b13 |C-7 |C-7 |D7b9 |G7b13 |C-7 ]*B[  C7b9 |F-7 |D7b9/F# |G-7 |Abo7 |D7b9/A |Bb7sus |x |Bb7b9sus |x (E7#9)|Eb6 (E) (F) (F#)|G7b13 Z'
        } as IIRealProChartModelProps;
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Armando\'s Rhumba');
        expect(model.errors).toEqual([]);
        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '[',
                        chords: 'C-7',
                        harmony: [{root: 'C', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'D7b9',
                        harmony: [{root: 'D', quality: '7b9', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'G7b13',
                        harmony: [{root: 'G', quality: '7b13', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'C-7',
                        harmony: [{root: 'C', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'C-7',
                        harmony: [{root: 'C', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'D7b9',
                        harmony: [{root: 'D', quality: '7b9', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'G7b13',
                        harmony: [{root: 'G', quality: '7b13', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'C-7',
                        harmony: [{root: 'C', quality: '-7', numeric: 1}],
                        close: ']'
                    }
                ]
            },
            {
                name: 'B',
                data: [
                    {
                        open: '[',
                        chords: 'C7b9',
                        harmony: [{root: 'C', quality: '7b9', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'F-7',
                        harmony: [{root: 'F', quality: '-7', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'D7b9/F#',
                        harmony: [{root: 'D', quality: '7b9', inversion: '/F#', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'Abo7',
                        harmony: [{root: 'A', shift: 'b', quality: 'o7', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'D7b9/A',
                        harmony: [{root: 'D', quality: '7b9', inversion: '/A', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'Bb7sus',
                        harmony: [{root: 'B', shift: 'b', quality: '7sus', numeric: 7}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Bb7b9sus',
                        harmony: [{root: 'B', shift: 'b', quality: '7b9sus', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'x (E7#9)',
                        harmony: [{root: 'x'}],
                        alt: [{root: 'E', quality: '7#9', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Eb6 (E) (F) (F#)',
                        harmony: [{root: 'E', shift: 'b', quality: '6', numeric: 3}],
                        alt: [
                            {root: 'E', numeric: 3},
                            {root: 'F', numeric: 4},
                            {root: 'F', shift: '#', numeric: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7b13',
                        harmony: [{root: 'G', quality: '7b13', numeric: 5}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('should handle Alone Too Long with double pause (pp)', () => {
        const props = {
            title: 'Alone Too Long',
            key: 'G',
            chordString: '*A{T44G6 |p p G#o7|A-7 D7|x |A-7 |D7 |N1G6 E-7|A-7 D7 } |N2G6 |F#h7 B7b9 ]*B[E- E-/D|E-/C# p C7 B7 |E-6 |x |E- E-/D|A7 |A-11 |D7 ]*A[G6 |p p G#o7|A-7 D7|x |A-7 |D7 |G6 E-7|A-7 D7 Z'
        } as IIRealProChartModelProps;
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Alone Too Long');
        expect(model.errors).toEqual([]);
        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '{',
                        chords: 'G6',
                        harmony: [{root: 'G', quality: '6', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'p p G#o7',
                        harmony: [
                            {root: 'p'},
                            {root: 'p'},
                            {root: 'G', shift: '#', quality: 'o7', numeric: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A-7 D7',
                        harmony: [
                            {root: 'A', quality: '-7', numeric: 2},
                            {root: 'D', quality: '7', numeric: 5}
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'D7',
                        harmony: [{root: 'D', quality: '7', numeric: 5}]
                    },
                    {
                        ending: 'N1',
                        open: '|',
                        chords: 'G6 E-7',
                        harmony: [
                            {root: 'G', quality: '6', numeric: 1},
                            {root: 'E', quality: '-7', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A-7 D7',
                        harmony: [
                            {root: 'A', quality: '-7', numeric: 2},
                            {root: 'D', quality: '7', numeric: 5}
                        ],
                        close: '}'
                    },
                    {
                        ending: 'N2',
                        open: '|',
                        chords: 'G6',
                        harmony: [{root: 'G', quality: '6', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'F#h7 B7b9',
                        harmony: [
                            {root: 'F', shift: '#', quality: 'h7', numeric: 7},
                            {root: 'B', quality: '7b9', numeric: 3}
                        ],
                        close: ']'
                    }
                ]
            },
            {
                name: 'B',
                data: [
                    {
                        open: '[',
                        chords: 'E- E-/D',
                        harmony: [
                            {root: 'E', quality: '-', numeric: 6},
                            {root: 'E', quality: '-', inversion: '/D', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-/C# p C7 B7',
                        harmony: [
                            {root: 'E', quality: '-', inversion: '/C#', numeric: 6},
                            {root: 'p'},
                            {root: 'C', quality: '7', numeric: 4},
                            {root: 'B', quality: '7', numeric: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-6',
                        harmony: [{root: 'E', quality: '-6', numeric: 6}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'E- E-/D',
                        harmony: [
                            {root: 'E', quality: '-', numeric: 6},
                            {root: 'E', quality: '-', inversion: '/D', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A7',
                        harmony: [{root: 'A', quality: '7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'A-11',
                        harmony: [{root: 'A', quality: '-11', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'D7',
                        harmony: [{root: 'D', quality: '7', numeric: 5}],
                        close: ']'
                    }
                ]
            },
            {
                name: 'A',
                data: [
                    {
                        open: '[',
                        chords: 'G6',
                        harmony: [{root: 'G', quality: '6', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'p p G#o7',
                        harmony: [
                            {root: 'p'},
                            {root: 'p'},
                            {root: 'G', shift: '#', quality: 'o7', numeric: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A-7 D7',
                        harmony: [
                            {root: 'A', quality: '-7', numeric: 2},
                            {root: 'D', quality: '7', numeric: 5}
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'D7',
                        harmony: [{root: 'D', quality: '7', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'G6 E-7',
                        harmony: [
                            {root: 'G', quality: '6', numeric: 1},
                            {root: 'E', quality: '-7', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A-7 D7',
                        harmony: [
                            {root: 'A', quality: '-7', numeric: 2},
                            {root: 'D', quality: '7', numeric: 5}
                        ],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('should handle Crosscurrent', () => {
        const props = {
            title: 'Crosscurrent',
            author: 'Lennie Tristano',
            style: 'Up Tempo Swing',
            key: 'F',
            chordString: '*A[T44F^7 D7#5|G-7 C7|A-7 D7b9|G-7 C7|F^7 F7|Bb^7 Bo7|C7sus C7|F^7 C7#11 ]*B[F^7 Ab7|G-7 C7|F6 D7b9|G-7 C7|F^7 F7|C7#11(Bb^7) (Bo7)|(C7) x (C7)|F^7#11 ]*C[Bb-7 |A^7#11 |Ab-7 |G^7#11 |Gb^7 |B7 D7|G-7 |C7#11 ]*A[F^7 D7b9|G-7 C7|A-7 D7b9|G-7 C7|F^7 F7|C7#11(Bb^7) (Bo7)|(C7sus) x (C7)|F^7#11 C7#5 ]'
        };
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Crosscurrent');
        expect(model.errors).toEqual([]);
        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '[',
                        chords: 'F^7 D7#5',
                        harmony: [
                            {root: 'F', quality: '^7', numeric: 1},
                            {root: 'D', quality: '7#5', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7 C7',
                        harmony: [
                            {root: 'G', quality: '-7', numeric: 2},
                            {root: 'C', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A-7 D7b9',
                        harmony: [
                            {root: 'A', quality: '-7', numeric: 3},
                            {root: 'D', quality: '7b9', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7 C7',
                        harmony: [
                            {root: 'G', quality: '-7', numeric: 2},
                            {root: 'C', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^7 F7',
                        harmony: [
                            {root: 'F', quality: '^7', numeric: 1},
                            {root: 'F', quality: '7', numeric: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb^7 Bo7',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '^7', numeric: 4},
                            {root: 'B', quality: 'o7', numeric: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C7sus C7',
                        harmony: [
                            {root: 'C', quality: '7sus', numeric: 5},
                            {root: 'C', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^7 C7#11',
                        harmony: [
                            {root: 'F', quality: '^7', numeric: 1},
                            {root: 'C', quality: '7#11', numeric: 5}
                        ],
                        close: ']'
                    }
                ]
            },
            {
                name: 'B',
                data: [
                    {
                        open: '[',
                        chords: 'F^7 Ab7',
                        harmony: [
                            {root: 'F', quality: '^7', numeric: 1},
                            {root: 'A', shift: 'b', quality: '7', numeric: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7 C7',
                        harmony: [
                            {root: 'G', quality: '-7', numeric: 2},
                            {root: 'C', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F6 D7b9',
                        harmony: [
                            {root: 'F', quality: '6', numeric: 1},
                            {root: 'D', quality: '7b9', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7 C7',
                        harmony: [
                            {root: 'G', quality: '-7', numeric: 2},
                            {root: 'C', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^7 F7',
                        harmony: [
                            {root: 'F', quality: '^7', numeric: 1},
                            {root: 'F', quality: '7', numeric: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C7#11(Bb^7) (Bo7)',
                        harmony: [{root: 'C', quality: '7#11', numeric: 5}],
                        alt: [
                            {root: 'B', shift: 'b', quality: '^7', numeric: 4},
                            {root: 'B', quality: 'o7', numeric: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: '(C7) x (C7)',
                        harmony: [{root: 'x'}],
                        alt: [
                            {root: 'C', quality: '7', numeric: 5},
                            {root: 'C', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^7#11',
                        harmony: [{root: 'F', quality: '^7#11', numeric: 1}],
                        close: ']'
                    }
                ]
            },
            {
                name: 'C',
                data: [
                    {
                        open: '[',
                        chords: 'Bb-7',
                        harmony: [{root: 'B', shift: 'b', quality: '-7', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'A^7#11',
                        harmony: [{root: 'A', quality: '^7#11', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [{root: 'A', shift: 'b', quality: '-7', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'G^7#11',
                        harmony: [{root: 'G', quality: '^7#11', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'Gb^7',
                        harmony: [{root: 'G', shift: 'b', quality: '^7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'B7 D7',
                        harmony: [
                            {root: 'B', quality: '7', numeric: 4},
                            {root: 'D', quality: '7', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'C7#11',
                        harmony: [{root: 'C', quality: '7#11', numeric: 5}],
                        close: ']'
                    }
                ]
            },
            {
                name: 'A',
                data: [
                    {
                        open: '[',
                        chords: 'F^7 D7b9',
                        harmony: [
                            {root: 'F', quality: '^7', numeric: 1},
                            {root: 'D', quality: '7b9', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7 C7',
                        harmony: [
                            {root: 'G', quality: '-7', numeric: 2},
                            {root: 'C', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A-7 D7b9',
                        harmony: [
                            {root: 'A', quality: '-7', numeric: 3},
                            {root: 'D', quality: '7b9', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7 C7',
                        harmony: [
                            {root: 'G', quality: '-7', numeric: 2},
                            {root: 'C', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^7 F7',
                        harmony: [
                            {root: 'F', quality: '^7', numeric: 1},
                            {root: 'F', quality: '7', numeric: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C7#11(Bb^7) (Bo7)',
                        harmony: [{root: 'C', quality: '7#11', numeric: 5}],
                        alt: [
                            {root: 'B', shift: 'b', quality: '^7', numeric: 4},
                            {root: 'B', quality: 'o7', numeric: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: '(C7sus) x (C7)',
                        harmony: [{root: 'x'}],
                        alt: [
                            {root: 'C', quality: '7sus', numeric: 5},
                            {root: 'C', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^7#11 C7#5',
                        harmony: [
                            {root: 'F', quality: '^7#11', numeric: 1},
                            {root: 'C', quality: '7#5', numeric: 5}
                        ],
                        close: ']'
                    }
                ]
            }
        ]);
    });
    it('should handle Killer Joe', () => {
        const props = {
            title: 'Killer Joe',
            key: 'C',
            chordString: '*A{T44C9 |Bb9#11 |r|r|r|}*B[Eh7 |A7b9 |Eb-7 |Ab7 |A7 |Ab7 |E-7 |A7 ]*A[C9 |Bb9#11 |r|r|r|Z'
        } as IIRealProChartModelProps;
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Killer Joe');
        expect(model.errors).toEqual([]);
        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '{',
                        chords: 'C9',
                        harmony: [{root: 'C', quality: '9', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb9#11',
                        harmony: [{root: 'B', shift: 'b', quality: '9#11', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'C9',
                        harmony: [{root: 'C', quality: '9', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb9#11',
                        harmony: [{root: 'B', shift: 'b', quality: '9#11', numeric: 7}],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'C9',
                        harmony: [{root: 'C', quality: '9', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb9#11',
                        harmony: [{root: 'B', shift: 'b', quality: '9#11', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'C9',
                        harmony: [{root: 'C', quality: '9', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb9#11',
                        harmony: [{root: 'B', shift: 'b', quality: '9#11', numeric: 7}],
                        close: '}'
                    }
                ]
            },
            {
                name: 'B',
                data: [
                    {
                        open: '[',
                        chords: 'Eh7',
                        harmony: [{root: 'E', quality: 'h7', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'A7b9',
                        harmony: [{root: 'A', quality: '7b9', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-7',
                        harmony: [{root: 'E', shift: 'b', quality: '-7', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Ab7',
                        harmony: [{root: 'A', shift: 'b', quality: '7', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'A7',
                        harmony: [{root: 'A', quality: '7', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'Ab7',
                        harmony: [{root: 'A', shift: 'b', quality: '7', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'A7',
                        harmony: [{root: 'A', quality: '7', numeric: 6}],
                        close: ']'
                    }
                ]
            },
            {
                name: 'A',
                data: [
                    {
                        open: '[',
                        chords: 'C9',
                        harmony: [{root: 'C', quality: '9', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb9#11',
                        harmony: [{root: 'B', shift: 'b', quality: '9#11', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'C9',
                        harmony: [{root: 'C', quality: '9', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb9#11',
                        harmony: [{root: 'B', shift: 'b', quality: '9#11', numeric: 7}],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'C9',
                        harmony: [{root: 'C', quality: '9', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb9#11',
                        harmony: [{root: 'B', shift: 'b', quality: '9#11', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'C9',
                        harmony: [{root: 'C', quality: '9', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb9#11',
                        harmony: [{root: 'B', shift: 'b', quality: '9#11', numeric: 7}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('should handle Moanin\'', () => {
        const props = {
            title: 'Moanin\'',
            key: 'F-',
            chordString: '*A{T44n Bb|F n |r|r|r| }*B[Bb-7 Ab9|G7b9 C7#9|F-7 |F7b9 B7|Bb-7 Ab9|G7b9 |Gh7 |C7b9 ]Y*A{SF-7 Ab7|G7 C7b9|r|r|r| }*B[Bb-7 Ab9|G7b9 C7#9|F-7 |F7b9 B7|Bb-7 Ab9|G7b9 |Gh7 |C7b9 ]'
        } as IIRealProChartModelProps;
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Moanin\'');
        expect(model.errors).toEqual([]);
        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '{',
                        chords: 'n Bb',
                        harmony: [{root: 'n'}, {root: 'B', shift: 'b', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'F n',
                        harmony: [{root: 'F', numeric: 1}, {root: 'n'}]
                    },
                    {
                        open: '|',
                        chords: 'n Bb',
                        harmony: [{root: 'n'}, {root: 'B', shift: 'b', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'F n',
                        harmony: [{root: 'F', numeric: 1}, {root: 'n'}],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'n Bb',
                        harmony: [{root: 'n'}, {root: 'B', shift: 'b', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'F n',
                        harmony: [{root: 'F', numeric: 1}, {root: 'n'}]
                    },
                    {
                        open: '|',
                        chords: 'n Bb',
                        harmony: [{root: 'n'}, {root: 'B', shift: 'b', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'F n',
                        harmony: [{root: 'F', numeric: 1}, {root: 'n'}],
                        close: '}'
                    }
                ]
            },
            {
                name: 'B',
                data: [
                    {
                        open: '[',
                        chords: 'Bb-7 Ab9',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '-7', numeric: 4},
                            {root: 'A', shift: 'b', quality: '9', numeric: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7b9 C7#9',
                        harmony: [
                            {root: 'G', quality: '7b9', numeric: 2},
                            {root: 'C', quality: '7#9', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F-7',
                        harmony: [{root: 'F', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'F7b9 B7',
                        harmony: [
                            {root: 'F', quality: '7b9', numeric: 1},
                            {root: 'B', quality: '7', numeric: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7 Ab9',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '-7', numeric: 4},
                            {root: 'A', shift: 'b', quality: '9', numeric: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7b9',
                        harmony: [{root: 'G', quality: '7b9', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'Gh7',
                        harmony: [{root: 'G', quality: 'h7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'C7b9',
                        harmony: [{root: 'C', quality: '7b9', numeric: 5}],
                        close: ']'
                    },
                    {divider: 'Y', close: ']'}
                ]
            },
            {
                name: 'A',
                data: [
                    {
                        segno: true,
                        open: '{',
                        chords: 'F-7 Ab7',
                        harmony: [
                            {root: 'F', quality: '-7', numeric: 1},
                            {root: 'A', shift: 'b', quality: '7', numeric: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7 C7b9',
                        harmony: [
                            {root: 'G', quality: '7', numeric: 2},
                            {root: 'C', quality: '7b9', numeric: 5}
                        ]
                    },
                    {
                        segno: true,
                        open: '|',
                        chords: 'F-7 Ab7',
                        harmony: [
                            {root: 'F', quality: '-7', numeric: 1},
                            {root: 'A', shift: 'b', quality: '7', numeric: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7 C7b9',
                        harmony: [
                            {root: 'G', quality: '7', numeric: 2},
                            {root: 'C', quality: '7b9', numeric: 5}
                        ],
                        close: '|'
                    },
                    {
                        segno: true,
                        open: '|',
                        chords: 'F-7 Ab7',
                        harmony: [
                            {root: 'F', quality: '-7', numeric: 1},
                            {root: 'A', shift: 'b', quality: '7', numeric: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7 C7b9',
                        harmony: [
                            {root: 'G', quality: '7', numeric: 2},
                            {root: 'C', quality: '7b9', numeric: 5}
                        ]
                    },
                    {
                        segno: true,
                        open: '|',
                        chords: 'F-7 Ab7',
                        harmony: [
                            {root: 'F', quality: '-7', numeric: 1},
                            {root: 'A', shift: 'b', quality: '7', numeric: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7 C7b9',
                        harmony: [
                            {root: 'G', quality: '7', numeric: 2},
                            {root: 'C', quality: '7b9', numeric: 5}
                        ],
                        close: '}'
                    }
                ]
            },
            {
                name: 'B',
                data: [
                    {
                        open: '[',
                        chords: 'Bb-7 Ab9',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '-7', numeric: 4},
                            {root: 'A', shift: 'b', quality: '9', numeric: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7b9 C7#9',
                        harmony: [
                            {root: 'G', quality: '7b9', numeric: 2},
                            {root: 'C', quality: '7#9', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F-7',
                        harmony: [{root: 'F', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'F7b9 B7',
                        harmony: [
                            {root: 'F', quality: '7b9', numeric: 1},
                            {root: 'B', quality: '7', numeric: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7 Ab9',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '-7', numeric: 4},
                            {root: 'A', shift: 'b', quality: '9', numeric: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7b9',
                        harmony: [{root: 'G', quality: '7b9', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'Gh7',
                        harmony: [{root: 'G', quality: 'h7', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'C7b9',
                        harmony: [{root: 'C', quality: '7b9', numeric: 5}],
                        close: ']'
                    }
                ]
            }
        ]);
    });
    it('should handle Brazilian Suite', () => {
        const props = {
            title: 'Brazilian Suite',
            key: 'B-',
            chordString: '*i{T44Ab-7 |Eb-7 |Ab-7 |Eb-7 }*A{Ab-7 |Ab-7/Gb |E^7#11 |Eb-7 |Db-7 |Eb7b9 |D7b5 |Db7 |C^7#5 |B7 |Bb7b9 |Eb7#9 |Ab-7 |Eb7b9 ]Ab-7 |B7/F# |Fh7 |Bb7 |E-7 |A7 |D^7 |Eb-7 Ab7|Db^7 |Bb-7 |Eb-7 |Ab7 |Db^7 |Bb-7 |Eb^7#11 |Eb7 |Ab-7 |Ab-7/Gb |Eb^7#11 |Eb-7 |Db-7 |Eb7b9 ]{Ab-7|Eb-7|Ab-7|Eb-7 }|QDb^7|Db^7 Z'
        } as IIRealProChartModelProps;
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Brazilian Suite');
        expect(model.errors).toEqual([]);
        expect(model.segments).toEqual([
            {
                name: 'i',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '{',
                        chords: 'Ab-7',
                        harmony: [{root: 'A', shift: 'b', quality: '-7', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-7',
                        harmony: [{root: 'E', shift: 'b', quality: '-7', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [{root: 'A', shift: 'b', quality: '-7', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-7',
                        harmony: [{root: 'E', shift: 'b', quality: '-7', numeric: 4}],
                        close: '}'
                    }
                ]
            },
            {
                name: 'A',
                data: [
                    {
                        open: '{',
                        chords: 'Ab-7',
                        harmony: [{root: 'A', shift: 'b', quality: '-7', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7/Gb',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                inversion: '/Gb',
                                numeric: 7
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E^7#11',
                        harmony: [{root: 'E', quality: '^7#11', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-7',
                        harmony: [{root: 'E', shift: 'b', quality: '-7', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Db-7',
                        harmony: [{root: 'D', shift: 'b', quality: '-7', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Eb7b9',
                        harmony: [{root: 'E', shift: 'b', quality: '7b9', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'D7b5',
                        harmony: [{root: 'D', quality: '7b5', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Db7',
                        harmony: [{root: 'D', shift: 'b', quality: '7', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'C^7#5',
                        harmony: [{root: 'C', quality: '^7#5', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'B7',
                        harmony: [{root: 'B', quality: '7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb7b9',
                        harmony: [{root: 'B', shift: 'b', quality: '7b9', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb7#9',
                        harmony: [{root: 'E', shift: 'b', quality: '7#9', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [{root: 'A', shift: 'b', quality: '-7', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Eb7b9',
                        harmony: [{root: 'E', shift: 'b', quality: '7b9', numeric: 4}],
                        close: ']'
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [{root: 'A', shift: 'b', quality: '-7', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'B7/F#',
                        harmony: [{root: 'B', quality: '7', inversion: '/F#', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Fh7',
                        harmony: [{root: 'F', quality: 'h7', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'Bb7',
                        harmony: [{root: 'B', shift: 'b', quality: '7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'A7',
                        harmony: [{root: 'A', quality: '7', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'D^7',
                        harmony: [{root: 'D', quality: '^7', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-7 Ab7',
                        harmony: [
                            {root: 'E', shift: 'b', quality: '-7', numeric: 4},
                            {root: 'A', shift: 'b', quality: '7', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Db^7',
                        harmony: [{root: 'D', shift: 'b', quality: '^7', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7',
                        harmony: [{root: 'B', shift: 'b', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-7',
                        harmony: [{root: 'E', shift: 'b', quality: '-7', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Ab7',
                        harmony: [{root: 'A', shift: 'b', quality: '7', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Db^7',
                        harmony: [{root: 'D', shift: 'b', quality: '^7', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7',
                        harmony: [{root: 'B', shift: 'b', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb^7#11',
                        harmony: [{root: 'E', shift: 'b', quality: '^7#11', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Eb7',
                        harmony: [{root: 'E', shift: 'b', quality: '7', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [{root: 'A', shift: 'b', quality: '-7', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7/Gb',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                inversion: '/Gb',
                                numeric: 7
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb^7#11',
                        harmony: [{root: 'E', shift: 'b', quality: '^7#11', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-7',
                        harmony: [{root: 'E', shift: 'b', quality: '-7', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Db-7',
                        harmony: [{root: 'D', shift: 'b', quality: '-7', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Eb7b9',
                        harmony: [{root: 'E', shift: 'b', quality: '7b9', numeric: 4}],
                        close: ']'
                    },
                    {
                        open: '{',
                        chords: 'Ab-7',
                        harmony: [{root: 'A', shift: 'b', quality: '-7', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-7',
                        harmony: [{root: 'E', shift: 'b', quality: '-7', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [{root: 'A', shift: 'b', quality: '-7', numeric: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-7',
                        harmony: [{root: 'E', shift: 'b', quality: '-7', numeric: 4}],
                        close: '}'
                    },
                    {
                        coda: true,
                        open: '|',
                        chords: 'Db^7',
                        harmony: [{root: 'D', shift: 'b', quality: '^7', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Db^7',
                        harmony: [{root: 'D', shift: 'b', quality: '^7', numeric: 3}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('should handle Butterfly', () => {
        const props = {
            title: 'Butterfly',
            key: 'F-',
            chordString: '*i{T44F-7 |p A-7 |F-7 |p A-7 }*A{SF-11 |p A-11 |F-11 |p D-11 }*B[n Bb7|n |n |n A7#9#5 |Ab^7/Bb |Ab^7#5/Bb |Ab^7/Bb |Bb13 |Eb13sus |x |Eb7#9#5 |x |Ab13sus |p p W/C QC7/E |n F-7|p A-7 |{F-7 |p A-7  } Y{QF-11  |x |x |x }{Bb13 |x |x |x }fA^7#11 Z'
        } as IIRealProChartModelProps;
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Butterfly');
        expect(model.errors).toEqual([]);
        expect(model.segments).toEqual([
            {
                name: 'i',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '{',
                        chords: 'F-7',
                        harmony: [{root: 'F', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'p A-7',
                        harmony: [{root: 'p'}, {root: 'A', quality: '-7', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'F-7',
                        harmony: [{root: 'F', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'p A-7',
                        harmony: [{root: 'p'}, {root: 'A', quality: '-7', numeric: 3}],
                        close: '}'
                    }
                ]
            },
            {
                name: 'A',
                data: [
                    {
                        segno: true,
                        open: '{',
                        chords: 'F-11',
                        harmony: [{root: 'F', quality: '-11', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'p A-11',
                        harmony: [{root: 'p'}, {root: 'A', quality: '-11', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'F-11',
                        harmony: [{root: 'F', quality: '-11', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'p D-11',
                        harmony: [{root: 'p'}, {root: 'D', quality: '-11', numeric: 6}],
                        close: '}'
                    }
                ]
            },
            {
                name: 'B',
                data: [
                    {
                        open: '[',
                        chords: 'n Bb7',
                        harmony: [
                            {root: 'n'},
                            {root: 'B', shift: 'b', quality: '7', numeric: 4}
                        ]
                    },
                    {open: '|', chords: 'n', harmony: [{root: 'n'}]},
                    {open: '|', chords: 'n', harmony: [{root: 'n'}]},
                    {
                        open: '|',
                        chords: 'n A7#9#5',
                        harmony: [{root: 'n'}, {root: 'A', quality: '7#9#5', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Ab^7/Bb',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '^7',
                                inversion: '/Bb',
                                numeric: 3
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab^7#5/Bb',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '^7#5',
                                inversion: '/Bb',
                                numeric: 3
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab^7/Bb',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '^7',
                                inversion: '/Bb',
                                numeric: 3
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb13',
                        harmony: [{root: 'B', shift: 'b', quality: '13', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Eb13sus',
                        harmony: [{root: 'E', shift: 'b', quality: '13sus', numeric: 7}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Eb7#9#5',
                        harmony: [{root: 'E', shift: 'b', quality: '7#9#5', numeric: 7}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Ab13sus',
                        harmony: [{root: 'A', shift: 'b', quality: '13sus', numeric: 3}]
                    },
                    {
                        coda: true,
                        open: '|',
                        chords: 'p p W/C C7/E',
                        harmony: [
                            {root: 'p'},
                            {root: 'p'},
                            {root: 'W', inversion: '/C'},
                            {root: 'C', quality: '7', inversion: '/E', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'n F-7',
                        harmony: [{root: 'n'}, {root: 'F', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'p A-7',
                        harmony: [{root: 'p'}, {root: 'A', quality: '-7', numeric: 3}],
                        close: '|'
                    },
                    {
                        open: '{',
                        chords: 'F-7',
                        harmony: [{root: 'F', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'p A-7',
                        harmony: [{root: 'p'}, {root: 'A', quality: '-7', numeric: 3}],
                        close: '}'
                    },
                    {divider: 'Y'},
                    {
                        coda: true,
                        open: '{',
                        chords: 'F-11',
                        harmony: [{root: 'F', quality: '-11', numeric: 1}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: '}'
                    },
                    {
                        open: '{',
                        chords: 'Bb13',
                        harmony: [{root: 'B', shift: 'b', quality: '13', numeric: 4}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: '}'
                    },
                    {
                        fermata: true,
                        open: '|',
                        chords: 'A^7#11',
                        harmony: [{root: 'A', quality: '^7#11', numeric: 3}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('should handle A. Beleza é Você, Menina with special symbols and uneven lines', () => {
        const props = {
            title: 'A. Beleza é Você, Menina',
            author: 'Bebeto',
            style: 'Samba-Funk',
            key: 'A-',
            chordString: '*i[T44E-7 |A-7 |B-7 |A-7 |E-7 ]Y{A-7 |B-7 |A-7 |E-9 }Y*A{A-7 |B-7 |A-7 |E-7 }[C^9 |B-7 |A-7 |E-7 |A-7 |B-7 |A-7 ] Y*B{C^9 |B-7 |A-7 |E-7 }Y*A{C^9(A-7) |B-7 |A-7 |E-7 }Y*B{C^9 |B-7 |N1A-7 |E-7 } |N2A-7  Z'
        } as IIRealProChartModelProps;
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('A. Beleza é Você, Menina');
        expect(model.errors).toEqual([]);

        expect(model.segments).toEqual([
            {
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
            },
            {
                name: 'A',
                data: [
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
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', numeric: 5}],
                        close: '}'
                    },
                    {
                        open: '[',
                        chords: 'C^9',
                        harmony: [{root: 'C', quality: '^9', numeric: 3}]
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
                        close: ']'
                    },
                    {divider: 'Y', close: ']'}
                ]
            },
            {
                name: 'B',
                data: [
                    {
                        open: '{',
                        chords: 'C^9',
                        harmony: [{root: 'C', quality: '^9', numeric: 3}]
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
                        close: '}'
                    },
                    {divider: 'Y', close: ']'}
                ]
            },
            {
                name: 'A',
                data: [
                    {
                        open: '{',
                        chords: 'C^9(A-7)',
                        harmony: [{root: 'C', quality: '^9', numeric: 3}],
                        alt: [{root: 'A', quality: '-7', numeric: 1}]
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
                        close: '}'
                    },
                    {divider: 'Y', close: ']'}
                ]
            },
            {
                name: 'B',
                data: [
                    {
                        open: '{',
                        chords: 'C^9',
                        harmony: [{root: 'C', quality: '^9', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'B-7',
                        harmony: [{root: 'B', quality: '-7', numeric: 2}]
                    },
                    {
                        ending: 'N1',
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', numeric: 5}],
                        close: '}'
                    },
                    {
                        ending: 'N2',
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', numeric: 1}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('should handle A.Epopéia de Zumbi - In ABC ABC with special symbols and uneven lines', () => {
        const props = {
            title: 'A.Epopéia de Zumbi - In ABC ABC',
            author: 'Nei Lopes',
            style: 'Samba',
            key: 'E-',
            chordString: '*i[T44E- E-^7 |E-7 E-6|C7 B7 |E- B7 |E- nB7 ]Y*A{ E- |x |D7 |x(D7/F#) |C7 |x(C7/Bb) |B7 |x }Y{A- |D7 |G |C |F#h |B7 |N1E7 |x } |N2E- B7 ] Y*B[E |x |x |x C#7|F#- F#-^7|F#- |B7 |x |E B7 Y{E Fo|F#- |B7 |E B7 } |N0E- ]Y*C[F#h B7|E- |r|r|r|B7 |E- n B7 Z'
        } as IIRealProChartModelProps;
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('A.Epopéia de Zumbi - In ABC ABC');
        expect(model.errors).toEqual([]);
        expect(model.segments).toEqual([
            {
                name: 'i',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '[',
                        chords: 'E- E-^7',
                        harmony: [
                            {root: 'E', quality: '-', numeric: 1},
                            {root: 'E', quality: '-^7', numeric: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-7 E-6',
                        harmony: [
                            {root: 'E', quality: '-7', numeric: 1},
                            {root: 'E', quality: '-6', numeric: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C7 B7',
                        harmony: [
                            {root: 'C', quality: '7', numeric: 6},
                            {root: 'B', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E- B7',
                        harmony: [
                            {root: 'E', quality: '-', numeric: 1},
                            {root: 'B', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E- nB7',
                        harmony: [{root: 'E', quality: '-', numeric: 1}, {root: 'n'}],
                        close: ']'
                    },
                    {divider: 'Y', close: ']'}
                ]
            },
            {
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
            },
            {
                name: 'B',
                data: [
                    {
                        open: '[',
                        chords: 'E',
                        harmony: [{root: 'E', numeric: 1}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'x C#7',
                        harmony: [
                            {root: 'x'},
                            {root: 'C', shift: '#', quality: '7', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F#- F#-^7',
                        harmony: [
                            {root: 'F', shift: '#', quality: '-', numeric: 2},
                            {root: 'F', shift: '#', quality: '-^7', numeric: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F#-',
                        harmony: [{root: 'F', shift: '#', quality: '-', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'B7',
                        harmony: [{root: 'B', quality: '7', numeric: 5}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'E B7',
                        harmony: [
                            {root: 'E', numeric: 1},
                            {root: 'B', quality: '7', numeric: 5}
                        ]
                    },
                    {divider: 'Y'},
                    {
                        open: '{',
                        chords: 'E Fo',
                        harmony: [
                            {root: 'E', numeric: 1},
                            {root: 'F', quality: 'o', numeric: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F#-',
                        harmony: [{root: 'F', shift: '#', quality: '-', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'B7',
                        harmony: [{root: 'B', quality: '7', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'E B7',
                        harmony: [
                            {root: 'E', numeric: 1},
                            {root: 'B', quality: '7', numeric: 5}
                        ],
                        close: '}'
                    },
                    {
                        ending: 'N0',
                        open: '|',
                        chords: 'E-',
                        harmony: [{root: 'E', quality: '-', numeric: 1}],
                        close: ']'
                    },
                    {divider: 'Y', close: ']'}
                ]
            },
            {
                name: 'C',
                data: [
                    {
                        open: '[',
                        chords: 'F#h B7',
                        harmony: [
                            {root: 'F', shift: '#', quality: 'h', numeric: 2},
                            {root: 'B', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-',
                        harmony: [{root: 'E', quality: '-', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'F#h B7',
                        harmony: [
                            {root: 'F', shift: '#', quality: 'h', numeric: 2},
                            {root: 'B', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-',
                        harmony: [{root: 'E', quality: '-', numeric: 1}],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'F#h B7',
                        harmony: [
                            {root: 'F', shift: '#', quality: 'h', numeric: 2},
                            {root: 'B', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-',
                        harmony: [{root: 'E', quality: '-', numeric: 1}]
                    },
                    {
                        open: '|',
                        chords: 'F#h B7',
                        harmony: [
                            {root: 'F', shift: '#', quality: 'h', numeric: 2},
                            {root: 'B', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-',
                        harmony: [{root: 'E', quality: '-', numeric: 1}],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'B7',
                        harmony: [{root: 'B', quality: '7', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'E- n B7',
                        harmony: [
                            {root: 'E', quality: '-', numeric: 1},
                            {root: 'n'},
                            {root: 'B', quality: '7', numeric: 5}
                        ],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('should handle Alguém me Avisou, it has extra chords in double bar repeat and double repeat at the start of the segment', () => {
        // TODO find out how to handle chords put inside double bar repeats
        const props = {
            title: 'Alguém me Avisou',
            author: 'Dona Ivone Lara',
            style: 'Samba',
            key: 'D',
            chordString: '*A[T44D G7|D A7|r|D E-|F#- G^(E-)|r|(F#h) B7(B7)|E- A7|D D#o|r|]Y*B[ r|r|F#h B7|r|r|A7 Z'
        } as IIRealProChartModelProps;
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Alguém me Avisou');
        expect(model.errors).toEqual([
            'Repeating empty bars [ r'
        ]);
        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '[',
                        chords: 'D G7',
                        harmony: [
                            {root: 'D', numeric: 1},
                            {root: 'G', quality: '7', numeric: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D A7',
                        harmony: [
                            {root: 'D', numeric: 1},
                            {root: 'A', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D G7',
                        harmony: [
                            {root: 'D', numeric: 1},
                            {root: 'G', quality: '7', numeric: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D A7',
                        harmony: [
                            {root: 'D', numeric: 1},
                            {root: 'A', quality: '7', numeric: 5}
                        ],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'D E-',
                        harmony: [
                            {root: 'D', numeric: 1},
                            {root: 'E', quality: '-', numeric: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F#- G^(E-)',
                        harmony: [
                            {root: 'F', shift: '#', quality: '-', numeric: 3},
                            {root: 'G', quality: '^', numeric: 4}
                        ],
                        alt: [{root: 'E', quality: '-', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'D E-',
                        harmony: [
                            {root: 'D', numeric: 1},
                            {root: 'E', quality: '-', numeric: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F#- G^(E-)',
                        harmony: [
                            {root: 'F', shift: '#', quality: '-', numeric: 3},
                            {root: 'G', quality: '^', numeric: 4}
                        ],
                        alt: [{root: 'E', quality: '-', numeric: 2}],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: '(F#h) B7(B7)',
                        harmony: [{root: 'B', quality: '7', numeric: 6}],
                        alt: [
                            {root: 'F', shift: '#', quality: 'h', numeric: 3},
                            {root: 'B', quality: '7', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E- A7',
                        harmony: [
                            {root: 'E', quality: '-', numeric: 2},
                            {root: 'A', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D D#o',
                        harmony: [
                            {root: 'D', numeric: 1},
                            {root: 'D', shift: '#', quality: 'o', numeric: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E- A7',
                        harmony: [
                            {root: 'E', quality: '-', numeric: 2},
                            {root: 'A', quality: '7', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D D#o',
                        harmony: [
                            {root: 'D', numeric: 1},
                            {root: 'D', shift: '#', quality: 'o', numeric: 1}
                        ],
                        close: ']'
                    },
                    {divider: 'Y', close: ']'}
                ]
            },
            {
                name: 'B',
                data: [
                    {
                        open: '[',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        error: 'Repeating empty bars'
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        error: 'Repeating empty bars',
                        close: '|'
                    },
                    {
                        open: '[',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        error: 'Repeating empty bars'
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        error: 'Repeating empty bars',
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        error: 'Repeating empty bars'
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        error: 'Repeating empty bars',
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'F#h B7',
                        harmony: [
                            {root: 'F', shift: '#', quality: 'h', numeric: 3},
                            {root: 'B', quality: '7', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        error: 'Repeating empty bars',
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'F#h B7',
                        harmony: [
                            {root: 'F', shift: '#', quality: 'h', numeric: 3},
                            {root: 'B', quality: '7', numeric: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        error: 'Repeating empty bars',
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'F#h B7',
                        harmony: [
                            {root: 'F', shift: '#', quality: 'h', numeric: 3},
                            {root: 'B', quality: '7', numeric: 6}
                        ],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'A7',
                        harmony: [{root: 'A', quality: '7', numeric: 5}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('should handle Amor e Festança, no chords, only bar separators', () => {
        const props = {
            title: 'Amor e Festança',
            author: 'Adalto Magalha e Toninho Geraes',
            style: 'Samba',
            key: 'C',
            chordString: '*A[T44 ||||]*B[ ||||Z'
        } as IIRealProChartModelProps;
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Amor e Festança');
        expect(model.errors).toEqual([
            'Closing bar as a first part: [ ||||Z.'
        ]);

        expect(model.segments).toEqual([
            {name: 'A', data: [{timeSignature: '4 / 4', close: ']'}]},
            {
                name: 'B',
                data: [
                    {
                        empty: true,
                        error: 'Bar has no content',
                        open: '[',
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('should handle Jogral, with strange closing bar override', () => {
        const props = {
            title: 'Jogral',
            author: 'Djavan-Neto-Filo',
            style: 'Samba',
            key: 'Bb',
            chordString: '*A[T44G^9 |Eb-9 Eb-6|D-9 |G7#9#5 |C-9 |F13b9 |Bb^9 A-7|G-9 G-7/F|E-9 |A7b9b5 |Eb-9 Ab9|Db-9 Gb9|C-9 F7b9|Bb^9 |N1D9sus }|N2B7#9 ]*B[E-9 |A13sus A13|D^9 |D9sus D7#9#5|G-9 |C13sus C13|F^9 |D9sus ]*C[G^9 |Eb-9 Eb-6|D-9 |G7#9#5 |C-9 |F13b9 |Bb^9 A-7|G-9 G-7/F|E-9 |A7b9b5 |Eb-9 Ab9|Db-9 Gb9|C-9 F7b9|Bb^9 |n ] *D{ D13#11 n|n D13 |p n |n }{D13|x|r| }D13#11|x|x|D9sus Z'
        } as IIRealProChartModelProps;
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Jogral');
        expect(model.errors).toEqual([]);

        expect(model.segments).toEqual([
            {
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
            },
            {
                name: 'B',
                data: [
                    {
                        open: '[',
                        chords: 'E-9',
                        harmony: [{root: 'E', quality: '-9', numeric: 4}]
                    },
                    {
                        open: '|',
                        chords: 'A13sus A13',
                        harmony: [
                            {root: 'A', quality: '13sus', numeric: 7},
                            {root: 'A', quality: '13', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D^9',
                        harmony: [{root: 'D', quality: '^9', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'D9sus D7#9#5',
                        harmony: [
                            {root: 'D', quality: '9sus', numeric: 3},
                            {root: 'D', quality: '7#9#5', numeric: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-9',
                        harmony: [{root: 'G', quality: '-9', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'C13sus C13',
                        harmony: [
                            {root: 'C', quality: '13sus', numeric: 2},
                            {root: 'C', quality: '13', numeric: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^9',
                        harmony: [{root: 'F', quality: '^9', numeric: 5}]
                    },
                    {
                        open: '|',
                        chords: 'D9sus',
                        harmony: [{root: 'D', quality: '9sus', numeric: 3}],
                        close: ']'
                    }
                ]
            },
            {
                name: 'C',
                data: [
                    {
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
                        open: '|',
                        chords: 'n',
                        harmony: [{root: 'n'}],
                        close: ']'
                    }
                ]
            },
            {
                name: 'D',
                data: [
                    {
                        open: '{',
                        chords: 'D13#11 n',
                        harmony: [{root: 'D', quality: '13#11', numeric: 3}, {root: 'n'}]
                    },
                    {
                        open: '|',
                        chords: 'n D13',
                        harmony: [{root: 'n'}, {root: 'D', quality: '13', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'p n',
                        harmony: [{root: 'p'}, {root: 'n'}]
                    },
                    {
                        open: '|',
                        chords: 'n',
                        harmony: [{root: 'n'}],
                        close: '}'
                    },
                    {
                        open: '{',
                        chords: 'D13',
                        harmony: [{root: 'D', quality: '13', numeric: 3}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'D13',
                        harmony: [{root: 'D', quality: '13', numeric: 3}]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: '}'
                    },
                    {
                        open: '|',
                        chords: 'D13#11',
                        harmony: [{root: 'D', quality: '13#11', numeric: 3}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'D9sus',
                        harmony: [{root: 'D', quality: '9sus', numeric: 3}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('should handle The Bat, with unnamed segment along with named', () => {
        const props = {
            title: 'Bat, The',
            author: 'Pat Metheny',
            style: 'Ballad',
            key: 'G',
            chordString: '{T44G D/F# E- A7|D p A-7 D7|Y|G D/F# E- A7|T34D p A-|Db/Cb p Bb13b9 ]Y*B[T44Eb-7 p C#-7 F#7|Ch7 p Cb^7 Db/Cb|Y|Gb/Bb Eb-7 D13 Db13|C13b9 F-|T24Fh7 Bb7#5 ]Y*C[T44Eb^7 p Bb/D p |Ab/C p Ab-/Cb p |Y|Eb/Bb p p p Q|Ab/Bb p Ah7 D7 }Y[QAb/Bb |Eb/Bb |Ab/Bb |Eb/Bb |Ab/Bb|fEb Z'
        } as IIRealProChartModelProps;
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Bat, The');
        expect(model.errors).toEqual([]);

        expect(model.segments).toEqual([
            {
                name: '',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '{',
                        chords: 'G D/F# E- A7',
                        harmony: [
                            {root: 'G', numeric: 1},
                            {root: 'D', inversion: '/F#', numeric: 5},
                            {root: 'E', quality: '-', numeric: 6},
                            {root: 'A', quality: '7', numeric: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D p A-7 D7',
                        harmony: [
                            {root: 'D', numeric: 5},
                            {root: 'p'},
                            {root: 'A', quality: '-7', numeric: 2},
                            {root: 'D', quality: '7', numeric: 5}
                        ],
                        close: '|'
                    },
                    {divider: 'Y'},
                    {
                        open: '|',
                        chords: 'G D/F# E- A7',
                        harmony: [
                            {root: 'G', numeric: 1},
                            {root: 'D', inversion: '/F#', numeric: 5},
                            {root: 'E', quality: '-', numeric: 6},
                            {root: 'A', quality: '7', numeric: 2}
                        ]
                    },
                    {
                        timeSignature: '3 / 4',
                        open: '|',
                        chords: 'D p A-',
                        harmony: [
                            {root: 'D', numeric: 5},
                            {root: 'p'},
                            {root: 'A', quality: '-', numeric: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Db/Cb p Bb13b9',
                        harmony: [
                            {root: 'D', shift: 'b', inversion: '/Cb', numeric: 5},
                            {root: 'p'},
                            {root: 'B', shift: 'b', quality: '13b9', numeric: 3}
                        ],
                        close: ']'
                    },
                    {divider: 'Y', close: ']'}
                ]
            },
            {
                name: 'B',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '[',
                        chords: 'Eb-7 p C#-7 F#7',
                        harmony: [
                            {root: 'E', shift: 'b', quality: '-7', numeric: 6},
                            {root: 'p'},
                            {root: 'C', shift: '#', quality: '-7', numeric: 4},
                            {root: 'F', shift: '#', quality: '7', numeric: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ch7 p Cb^7 Db/Cb',
                        harmony: [
                            {root: 'C', quality: 'h7', numeric: 4},
                            {root: 'p'},
                            {root: 'C', shift: 'b', quality: '^7', numeric: 4},
                            {root: 'D', shift: 'b', inversion: '/Cb', numeric: 5}
                        ],
                        close: '|'
                    },
                    {divider: 'Y'},
                    {
                        open: '|',
                        chords: 'Gb/Bb Eb-7 D13 Db13',
                        harmony: [
                            {root: 'G', shift: 'b', inversion: '/Bb', numeric: 1},
                            {root: 'E', shift: 'b', quality: '-7', numeric: 6},
                            {root: 'D', quality: '13', numeric: 5},
                            {root: 'D', shift: 'b', quality: '13', numeric: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C13b9 F-',
                        harmony: [
                            {root: 'C', quality: '13b9', numeric: 4},
                            {root: 'F', quality: '-', numeric: 7}
                        ]
                    },
                    {
                        timeSignature: '2 / 4',
                        open: '|',
                        chords: 'Fh7 Bb7#5',
                        harmony: [
                            {root: 'F', quality: 'h7', numeric: 7},
                            {root: 'B', shift: 'b', quality: '7#5', numeric: 3}
                        ],
                        close: ']'
                    },
                    {divider: 'Y', close: ']'}
                ]
            },
            {
                name: 'C',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '[',
                        chords: 'Eb^7 p Bb/D p',
                        harmony: [
                            {root: 'E', shift: 'b', quality: '^7', numeric: 6},
                            {root: 'p'},
                            {root: 'B', shift: 'b', inversion: '/D', numeric: 3},
                            {root: 'p'}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab/C p Ab-/Cb p',
                        harmony: [
                            {root: 'A', shift: 'b', inversion: '/C', numeric: 2},
                            {root: 'p'},
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-',
                                inversion: '/Cb',
                                numeric: 2
                            },
                            {root: 'p'}
                        ],
                        close: '|'
                    },
                    {divider: 'Y'},
                    {
                        coda: true,
                        open: '|',
                        chords: 'Eb/Bb p p p',
                        harmony: [
                            {root: 'E', shift: 'b', inversion: '/Bb', numeric: 6},
                            {root: 'p'},
                            {root: 'p'},
                            {root: 'p'}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab/Bb p Ah7 D7',
                        harmony: [
                            {root: 'A', shift: 'b', inversion: '/Bb', numeric: 2},
                            {root: 'p'},
                            {root: 'A', quality: 'h7', numeric: 2},
                            {root: 'D', quality: '7', numeric: 5}
                        ],
                        close: '}'
                    },
                    {divider: 'Y'},
                    {
                        coda: true,
                        open: '[',
                        chords: 'Ab/Bb',
                        harmony: [{root: 'A', shift: 'b', inversion: '/Bb', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'Eb/Bb',
                        harmony: [{root: 'E', shift: 'b', inversion: '/Bb', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'Ab/Bb',
                        harmony: [{root: 'A', shift: 'b', inversion: '/Bb', numeric: 2}]
                    },
                    {
                        open: '|',
                        chords: 'Eb/Bb',
                        harmony: [{root: 'E', shift: 'b', inversion: '/Bb', numeric: 6}]
                    },
                    {
                        open: '|',
                        chords: 'Ab/Bb',
                        harmony: [{root: 'A', shift: 'b', inversion: '/Bb', numeric: 2}]
                    },
                    {
                        fermata: true,
                        open: '|',
                        chords: 'Eb',
                        harmony: [{root: 'E', shift: 'b', numeric: 6}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });

    it.skip('// TODO Alvarà Jorge Aragão also errored', () => {
    });
    it.skip('//TODO should properly recognize and handle chords inside double repeat bvvars', () => {
    });
    describe('parseSegment', () => {
        it('should handle multiple repeats (r)', () => {
            const segmentString = '[T44C6 |x |r|r|r|]';

            expect(IRealProChartModel.prototype.parseSegment(segmentString)).toEqual([
                {
                    timeSignature: '4 / 4',
                    open: '[',
                    chords: 'C6',
                    harmony: [{root: 'C', quality: '6', numeric: 1}]
                },
                {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                {
                    open: '|',
                    chords: 'C6',
                    harmony: [{root: 'C', quality: '6', numeric: 1}]
                },
                {open: '|', chords: 'x', harmony: [{root: 'x'}], close: '|'},
                {
                    open: '|',
                    chords: 'C6',
                    harmony: [{root: 'C', quality: '6', numeric: 1}]
                },
                {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                {
                    open: '|',
                    chords: 'C6',
                    harmony: [{root: 'C', quality: '6', numeric: 1}]
                },
                {open: '|', chords: 'x', harmony: [{root: 'x'}], close: ']'}
            ]);
        });
    });
    describe('parseHarmony', () => {
        it('should parse add9 quality', () => {
            const harmonyString = 'Dbadd9 Ab';

            expect(IRealProChartModel.prototype.parseHarmony(harmonyString)).toEqual([
                [
                    {root: 'D', shift: 'b', quality: 'add9', numeric: 2},
                    {root: 'A', shift: 'b', numeric: 6}
                ],
                []
            ]);
        });
    });
    describe('parseBar', () => {
        it('should handle simple bar with Alternate Chords', () => {
            const barString = '|C^7(C#-7) (F#7)';

            expect(IRealProChartModel.prototype.parseBar(barString)).toEqual({
                open: '|',
                chords: 'C^7(C#-7) (F#7)',
                harmony: [{root: 'C', quality: '^7', numeric: 1}],
                alt: [
                    {root: 'C', shift: '#', quality: '-7', numeric: 1},
                    {root: 'F', shift: '#', quality: '7', numeric: 4}
                ]
            });
        });
        it('should handle Segno sign', () => {
            const barString = '{SC C/E';

            expect(IRealProChartModel.prototype.parseBar(barString)).toEqual({
                segno: true,
                open: '{',
                chords: 'C C/E',
                harmony: [
                    {root: 'C', numeric: 1},
                    {root: 'C', inversion: '/E', numeric: 1}
                ]
            });
        });
    });
});
