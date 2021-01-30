/* eslint max-len: 0 */
/* eslint max-statements: 0 */

import IRealProChartModel from '../IRealProChartModel';
import {IIRealProChartModelProps} from '../types';
import {varDump} from '../../../../server/utils';

const emptyRealProChartProps: IIRealProChartModelProps = {
    title: '',
    author: '',
    style: '',
    key: '',
    chordString: ''
};

function restoreIRealProChartModelPrototype() {
    IRealProChartModel.prototype.key = '';
    IRealProChartModel.prototype.tuneKeyRootBase = null;
    IRealProChartModel.prototype.tuneKeyRelativeToCShift = null;
    IRealProChartModel.prototype.tuneKeyIntervalRelativeToC = null;
    IRealProChartModel.prototype.tuneAdjective = null;
}

function setDefaultIRealProChartModelPrototype() {
    IRealProChartModel.prototype.key = 'C';
    IRealProChartModel.prototype.tuneKeyRootBase = 'C';
    IRealProChartModel.prototype.tuneKeyRelativeToCShift = 0;
    IRealProChartModel.prototype.tuneKeyIntervalRelativeToC = 0;
    IRealProChartModel.prototype.tuneAdjective = 'major';
}

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
        expect(model.tuneKeyRootBase).toBe('C');
        expect(model.tuneKeyRelativeToCShift).toBe(0);
        expect(model.tuneKeyIntervalRelativeToC).toBe(0);
        expect(model.tuneAdjective).toBe('major');

        expect(model.chordString.length).toBe(191);
        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '{',
                        chords: 'C^7',
                        harmony: [{root: 'C', quality: '^7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'C-7 F7',
                        harmony: [
                            {root: 'C', quality: '-7', degree: 1},
                            {root: 'F', quality: '7', degree: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb^7',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '^7',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7 Eb7',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '-7',
                                degree: 7,
                                degreeShift: -1
                            },
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '7',
                                degree: 3,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab^7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '^7',
                                degree: 6,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-7 G7#9',
                        harmony: [
                            {root: 'D', quality: '-7', degree: 2},
                            {root: 'G', quality: '7#9', degree: 5}
                        ]
                    },
                    {
                        ending: 'N1',
                        open: '|',
                        chords: 'C^7',
                        harmony: [{root: 'C', quality: '^7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'D-7 G7',
                        harmony: [
                            {root: 'D', quality: '-7', degree: 2},
                            {root: 'G', quality: '7', degree: 5}
                        ],
                        close: '}'
                    },
                    {
                        ending: 'N2',
                        open: '|',
                        chords: 'C^7',
                        harmony: [{root: 'C', quality: '^7', degree: 1}]
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
                        harmony: [{root: 'D', quality: '-7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'G7',
                        harmony: [{root: 'G', quality: '7', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'C^7/E',
                        harmony: [{root: 'C', quality: '^7', inversion: '/E', degree: 1, inversionDegree: 3}]
                    },
                    {
                        open: '|',
                        chords: 'A7',
                        harmony: [{root: 'A', quality: '7', degree: 6}],
                        close: '|'
                    },
                    {divider: 'Y'},
                    {
                        open: '|',
                        chords: 'D-7',
                        harmony: [{root: 'D', quality: '-7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'G7',
                        harmony: [{root: 'G', quality: '7', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'C^7(C#-7) (F#7)',
                        harmony: [{root: 'C', quality: '^7', degree: 1}],
                        alt: [
                            {
                                root: 'C',
                                shift: '#',
                                quality: '-7',
                                degree: 1,
                                degreeShift: 1
                            },
                            {
                                root: 'F',
                                shift: '#',
                                quality: '7',
                                degree: 4,
                                degreeShift: 1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-7 G7',
                        harmony: [
                            {root: 'D', quality: '-7', degree: 2},
                            {root: 'G', quality: '7', degree: 5}
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
                        harmony: [{root: 'C', quality: '^7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'C-7 F7',
                        harmony: [
                            {root: 'C', quality: '-7', degree: 1},
                            {root: 'F', quality: '7', degree: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb^7',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '^7',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7 Eb7',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '-7',
                                degree: 7,
                                degreeShift: -1
                            },
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '7',
                                degree: 3,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab^7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '^7',
                                degree: 6,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-7 G7#9',
                        harmony: [
                            {root: 'D', quality: '-7', degree: 2},
                            {root: 'G', quality: '7#9', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C^7',
                        harmony: [{root: 'C', quality: '^7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'D-7 G7',
                        harmony: [
                            {root: 'D', quality: '-7', degree: 2},
                            {root: 'G', quality: '7', degree: 5}
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
        expect(model.tuneKeyRootBase).toBe('E');
        expect(model.tuneKeyRelativeToCShift).toBe(2);
        expect(model.tuneKeyIntervalRelativeToC).toBe(4);
        expect(model.tuneAdjective).toBe('minor');

        expect(model.chordString.length).toBe(104);
        expect(model.segments).toEqual([
            {
                name: '',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '[',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', degree: 1}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', degree: 3}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Bb^7',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '^7',
                                degree: 5,
                                degreeShift: -1
                            }
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Bh7',
                        harmony: [{root: 'B', quality: 'h7', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'E7#9',
                        harmony: [{root: 'E', quality: '7#9', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 4}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'F#h7',
                        harmony: [{root: 'F', shift: '#', quality: 'h7', degree: 2}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'F-7',
                        harmony: [{root: 'F', quality: '-7', degree: 2, degreeShift: -1}]
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
                        harmony: [{root: 'C', quality: '-7', degree: 6}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'B7#9',
                        harmony: [{root: 'B', quality: '7#9', degree: 5}]
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
                        harmony: [{root: 'C', quality: '-7', degree: 6}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Ab^7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '^7',
                                degree: 4,
                                degreeShift: -1
                            }
                        ]
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
    it('handles string with segment name inside and outside the bar lines, A Night In Tunisia', () => {
        const propsWithSegmentsInsideBars = {
            title: 'A Night In Tunisia',
            key: 'D-',
            chordString: '*A{T44Eb7 |D- |Eb7 |D- |Eb7 |D- |Eh7 A7b9|D- }*B[Ah7 |D7b9 |G-7 |x |Gh7 |C7b9 |F^7 |Eh7 A7b9 ]*A[Eb7 |D- |Eb7 |D- |Eb7 |D- |Eh7 A7b9|D- Q ZY[QEh7 |x |Eb7#11 |x |D-7 |x |G7#11 |x |G-^7 |G-7 |Gb7#9 |x |F^7 |x |Eh7 |A7b9 Z'
        } as IIRealProChartModelProps;

        const model = new IRealProChartModel(propsWithSegmentsInsideBars);

        expect(model.chordString.length).toBe(219);

        expect(model.key).toBe('D-');
        expect(model.tuneKeyRootBase).toBe('D');
        expect(model.tuneKeyRelativeToCShift).toBe(1);
        expect(model.tuneKeyIntervalRelativeToC).toBe(2);
        expect(model.tuneAdjective).toBe('minor');

        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '{',
                        chords: 'Eb7',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '7',
                                degree: 2,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-',
                        harmony: [{root: 'D', quality: '-', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb7',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '7',
                                degree: 2,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-',
                        harmony: [{root: 'D', quality: '-', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb7',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '7',
                                degree: 2,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-',
                        harmony: [{root: 'D', quality: '-', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', degree: 2},
                            {root: 'A', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-',
                        harmony: [{root: 'D', quality: '-', degree: 1}],
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
                        harmony: [{root: 'A', quality: 'h7', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'D7b9',
                        harmony: [{root: 'D', quality: '7b9', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', degree: 4}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Gh7',
                        harmony: [{root: 'G', quality: 'h7', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'C7b9',
                        harmony: [{root: 'C', quality: '7b9', degree: 7}]
                    },
                    {
                        open: '|',
                        chords: 'F^7',
                        harmony: [{root: 'F', quality: '^7', degree: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', degree: 2},
                            {root: 'A', quality: '7b9', degree: 5}
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
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '7',
                                degree: 2,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-',
                        harmony: [{root: 'D', quality: '-', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb7',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '7',
                                degree: 2,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-',
                        harmony: [{root: 'D', quality: '-', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb7',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '7',
                                degree: 2,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-',
                        harmony: [{root: 'D', quality: '-', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', degree: 2},
                            {root: 'A', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        coda: true,
                        open: '|',
                        chords: 'D-',
                        harmony: [{root: 'D', quality: '-', degree: 1}],
                        close: 'Z'
                    },
                    {divider: 'Y'},
                    {
                        coda: true,
                        open: '[',
                        chords: 'Eh7',
                        harmony: [{root: 'E', quality: 'h7', degree: 2}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Eb7#11',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '7#11',
                                degree: 2,
                                degreeShift: -1
                            }
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'D-7',
                        harmony: [{root: 'D', quality: '-7', degree: 1}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'G7#11',
                        harmony: [{root: 'G', quality: '7#11', degree: 4}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'G-^7',
                        harmony: [{root: 'G', quality: '-^7', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Gb7#9',
                        harmony: [
                            {
                                root: 'G',
                                shift: 'b',
                                quality: '7#9',
                                degree: 4,
                                degreeShift: -1
                            }
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'F^7',
                        harmony: [{root: 'F', quality: '^7', degree: 3}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Eh7',
                        harmony: [{root: 'E', quality: 'h7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'A7b9',
                        harmony: [{root: 'A', quality: '7b9', degree: 5}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('handles 2 bars repeats (r) like in The African Queen', () => {
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
                            {root: 'C', quality: '-9', degree: 1},
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '9',
                                degree: 2,
                                degreeShift: -1
                            }
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'C-9 Db9',
                        harmony: [
                            {root: 'C', quality: '-9', degree: 1},
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '9',
                                degree: 2,
                                degreeShift: -1
                            }
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
                            {root: 'C', quality: '-9', degree: 1},
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '9',
                                degree: 2,
                                degreeShift: -1
                            }
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'C-9 Db9',
                        harmony: [
                            {root: 'C', quality: '-9', degree: 1},
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '9',
                                degree: 2,
                                degreeShift: -1
                            }
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
                            {root: 'C', quality: '-9', degree: 1},
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '9',
                                degree: 2,
                                degreeShift: -1
                            }
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'C-9 Db9',
                        harmony: [
                            {root: 'C', quality: '-9', degree: 1},
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '9',
                                degree: 2,
                                degreeShift: -1
                            }
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
                            {root: 'C', quality: '-9', degree: 1},
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '9',
                                degree: 2,
                                degreeShift: -1
                            }
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'C-9 Db9',
                        harmony: [
                            {root: 'C', quality: '-9', degree: 1},
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '9',
                                degree: 2,
                                degreeShift: -1
                            }
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
                            {root: 'B', shift: 'b', quality: '7', degree: 7},
                            {root: 'A', quality: '7', degree: 6, degreeShift: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab7 G7',
                        harmony: [
                            {root: 'A', shift: 'b', quality: '7', degree: 6},
                            {root: 'G', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C-9 Db9',
                        harmony: [
                            {root: 'C', quality: '-9', degree: 1},
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '9',
                                degree: 2,
                                degreeShift: -1
                            }
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'C-9 Db9',
                        harmony: [
                            {root: 'C', quality: '-9', degree: 1},
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '9',
                                degree: 2,
                                degreeShift: -1
                            }
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
    it('handles unclosed section like in Ahmid-6', () => {
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
                        harmony: [{root: 'D', quality: '-7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'C#-7',
                        harmony: [
                            {
                                root: 'C',
                                shift: '#',
                                quality: '-7',
                                degree: 1,
                                degreeShift: 1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-7',
                        harmony: [{root: 'D', quality: '-7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'C#-7',
                        harmony: [
                            {
                                root: 'C',
                                shift: '#',
                                quality: '-7',
                                degree: 1,
                                degreeShift: 1
                            }
                        ],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'F#-7 B7',
                        harmony: [
                            {
                                root: 'F',
                                shift: '#',
                                quality: '-7',
                                degree: 4,
                                degreeShift: 1
                            },
                            {root: 'B', quality: '7', degree: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-7 A7',
                        harmony: [
                            {root: 'E', quality: '-7', degree: 3},
                            {root: 'A', quality: '7', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G F',
                        harmony: [{root: 'G', degree: 5}, {root: 'F', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'E- D-7',
                        harmony: [
                            {root: 'E', quality: '-', degree: 3},
                            {root: 'D', quality: '-7', degree: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C^7',
                        harmony: [{root: 'C', quality: '^7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'B7',
                        harmony: [{root: 'B', quality: '7', degree: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Bb^7#11',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '^7#11',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ah7 D7b9',
                        harmony: [
                            {root: 'A', quality: 'h7', degree: 6},
                            {root: 'D', quality: '7b9', degree: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F#h7 B7b9',
                        harmony: [
                            {
                                root: 'F',
                                shift: '#',
                                quality: 'h7',
                                degree: 4,
                                degreeShift: 1
                            },
                            {root: 'B', quality: '7b9', degree: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', degree: 3},
                            {root: 'A', quality: '7b9', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-7 E-7',
                        harmony: [
                            {root: 'D', quality: '-7', degree: 2},
                            {root: 'E', quality: '-7', degree: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F-7 Bb7',
                        harmony: [
                            {root: 'F', quality: '-7', degree: 4},
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '7',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb9sus',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '9sus',
                                degree: 3,
                                degreeShift: -1
                            }
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Ab^9',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '^9',
                                degree: 6,
                                degreeShift: -1
                            }
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Ab7sus',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '7sus',
                                degree: 6,
                                degreeShift: -1
                            }
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Db^13',
                        harmony: [
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '^13',
                                degree: 2,
                                degreeShift: -1
                            }
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Dh7 G7b9',
                        harmony: [
                            {root: 'D', quality: 'h7', degree: 2},
                            {root: 'G', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C-7 F7',
                        harmony: [
                            {root: 'C', quality: '-7', degree: 1},
                            {root: 'F', quality: '7', degree: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F-7 Bb7',
                        harmony: [
                            {root: 'F', quality: '-7', degree: 4},
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '7',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Gh7 C7#9',
                        harmony: [
                            {root: 'G', quality: 'h7', degree: 5},
                            {root: 'C', quality: '7#9', degree: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F-7 F#-7',
                        harmony: [
                            {root: 'F', quality: '-7', degree: 4},
                            {
                                root: 'F',
                                shift: '#',
                                quality: '-7',
                                degree: 4,
                                degreeShift: 1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7 C-7',
                        harmony: [
                            {root: 'G', quality: '-7', degree: 5},
                            {root: 'C', quality: '-7', degree: 1}
                        ]
                    },
                    {
                        timeSignature: '3 / 4',
                        open: '|',
                        chords: 'F#-7 B7',
                        harmony: [
                            {
                                root: 'F',
                                shift: '#',
                                quality: '-7',
                                degree: 4,
                                degreeShift: 1
                            },
                            {root: 'B', quality: '7', degree: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-7 A7sus',
                        harmony: [
                            {root: 'E', quality: '-7', degree: 3},
                            {root: 'A', quality: '7sus', degree: 6}
                        ]
                    },
                    {
                        timeSignature: '2 / 4',
                        open: '|',
                        chords: 'A7sus',
                        harmony: [{root: 'A', quality: '7sus', degree: 6}]
                    },
                    {
                        timeSignature: '4 / 4',
                        open: '|',
                        chords: 'A7sus',
                        harmony: [{root: 'A', quality: '7sus', degree: 6}]
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
                        harmony: [{root: 'D', quality: '-7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'C#-7',
                        harmony: [
                            {
                                root: 'C',
                                shift: '#',
                                quality: '-7',
                                degree: 1,
                                degreeShift: 1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-7',
                        harmony: [{root: 'D', quality: '-7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'C#-7',
                        harmony: [
                            {
                                root: 'C',
                                shift: '#',
                                quality: '-7',
                                degree: 1,
                                degreeShift: 1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F#-7 B7',
                        harmony: [
                            {
                                root: 'F',
                                shift: '#',
                                quality: '-7',
                                degree: 4,
                                degreeShift: 1
                            },
                            {root: 'B', quality: '7', degree: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-7 A7',
                        harmony: [
                            {root: 'E', quality: '-7', degree: 3},
                            {root: 'A', quality: '7', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 6}]
                    },
                    {
                        open: '|',
                        chords: 'p p D7',
                        harmony: [
                            {root: 'p'},
                            {root: 'p'},
                            {root: 'D', quality: '7', degree: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G^7 Bb7',
                        harmony: [
                            {root: 'G', quality: '^7', degree: 5},
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '7',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb^7 B7',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '^7',
                                degree: 3,
                                degreeShift: -1
                            },
                            {root: 'B', quality: '7', degree: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E^7 G7',
                        harmony: [
                            {root: 'E', quality: '^7', degree: 3},
                            {root: 'G', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C^7 Ab7',
                        harmony: [
                            {root: 'C', quality: '^7', degree: 1},
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '7',
                                degree: 6,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Db^7 E7',
                        harmony: [
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '^7',
                                degree: 2,
                                degreeShift: -1
                            },
                            {root: 'E', quality: '7', degree: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A^7 C7',
                        harmony: [
                            {root: 'A', quality: '^7', degree: 6},
                            {root: 'C', quality: '7', degree: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^7',
                        harmony: [{root: 'F', quality: '^7', degree: 4}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', degree: 3}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'F^7',
                        harmony: [{root: 'F', quality: '^7', degree: 4}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', degree: 3}]
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
    it('handles Airmail Special with Segno symbol (s) and 4 double repeats', () => {
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
                        harmony: [{root: 'C', quality: '6', degree: 1}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'C6',
                        harmony: [{root: 'C', quality: '6', degree: 1}]
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
                        harmony: [{root: 'C', quality: '6', degree: 1}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'C6',
                        harmony: [{root: 'C', quality: '6', degree: 1}]
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
                        harmony: [{root: 'C', quality: 'o7', degree: 1}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Co7',
                        harmony: [{root: 'C', quality: 'o7', degree: 1}]
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
                            {root: 'C', quality: 'o7', degree: 1},
                            {root: 'B', quality: 'o7', degree: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bbo7',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: 'o7',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '7',
                                degree: 6,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7',
                        harmony: [{root: 'G', quality: '7', degree: 5}],
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
                            {root: 'C', degree: 1},
                            {root: 'C', degree: 1, inversion: '/E', inversionDegree: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F G',
                        harmony: [{root: 'F', degree: 4}, {root: 'G', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'C C/E',
                        harmony: [
                            {root: 'C', degree: 1},
                            {root: 'C', degree: 1, inversion: '/E', inversionDegree: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F G',
                        harmony: [{root: 'F', degree: 4}, {root: 'G', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'C C7',
                        harmony: [
                            {root: 'C', degree: 1},
                            {root: 'C', quality: '7', degree: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F F#o7',
                        harmony: [
                            {root: 'F', degree: 4},
                            {
                                root: 'F',
                                shift: '#',
                                quality: 'o7',
                                degree: 4,
                                degreeShift: 1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C/G',
                        harmony: [
                            {root: 'C', degree: 1, inversion: '/G', inversionDegree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C',
                        harmony: [{root: 'C', degree: 1}],
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
                        harmony: [{root: 'C', quality: 'o7', degree: 1}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Co7',
                        harmony: [{root: 'C', quality: 'o7', degree: 1}]
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
                            {root: 'C', quality: 'o7', degree: 1},
                            {root: 'B', quality: 'o7', degree: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bbo7',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: 'o7',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '7',
                                degree: 6,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7',
                        harmony: [{root: 'G', quality: '7', degree: 5}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('handles Alone Together with two endings on one line', () => {
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
                        harmony: [{root: 'D', quality: '-6', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', degree: 2},
                            {root: 'A', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-6',
                        harmony: [{root: 'D', quality: '-6', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', degree: 2},
                            {root: 'A', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-6',
                        harmony: [{root: 'D', quality: '-6', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Ah7 D7b9',
                        harmony: [
                            {root: 'A', quality: 'h7', degree: 5},
                            {root: 'D', quality: '7b9', degree: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', degree: 4}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'B-7 E7',
                        harmony: [
                            {root: 'B', quality: '-7', degree: 6, degreeShift: 1},
                            {root: 'E', quality: '7', degree: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7 C7',
                        harmony: [
                            {root: 'G', quality: '-7', degree: 4},
                            {root: 'C', quality: '7', degree: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^7',
                        harmony: [{root: 'F', quality: '^7', degree: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', degree: 2},
                            {root: 'A', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        ending: 'N1',
                        open: '|',
                        chords: 'D^7',
                        harmony: [{root: 'D', quality: '^7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: '(Eh7) x (A7b9)',
                        harmony: [{root: 'x'}],
                        alt: [
                            {root: 'E', quality: 'h7', degree: 2},
                            {root: 'A', quality: '7b9', degree: 5}
                        ],
                        close: '}'
                    },
                    {
                        ending: 'N2',
                        open: '|',
                        chords: 'D^7',
                        harmony: [{root: 'D', quality: '^7', degree: 1}]
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
                        harmony: [{root: 'A', quality: 'h7', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'D7b9',
                        harmony: [{root: 'D', quality: '7b9', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'G-6',
                        harmony: [{root: 'G', quality: '-6', degree: 4}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Gh7',
                        harmony: [{root: 'G', quality: 'h7', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'C7b9',
                        harmony: [{root: 'C', quality: '7b9', degree: 7}]
                    },
                    {
                        open: '|',
                        chords: 'F^7',
                        harmony: [{root: 'F', quality: '^7', degree: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', degree: 2},
                            {root: 'A', quality: '7b9', degree: 5}
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
                        harmony: [{root: 'D', quality: '-6', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', degree: 2},
                            {root: 'A', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-6',
                        harmony: [{root: 'D', quality: '-6', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', degree: 2},
                            {root: 'A', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-6 Bh7',
                        harmony: [
                            {root: 'D', quality: '-6', degree: 1},
                            {root: 'B', quality: 'h7', degree: 6, degreeShift: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb7 A7b9',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '7', degree: 6},
                            {root: 'A', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-6',
                        harmony: [{root: 'D', quality: '-6', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eh7 A7b9',
                        harmony: [
                            {root: 'E', quality: 'h7', degree: 2},
                            {root: 'A', quality: '7b9', degree: 5}
                        ],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('handles Ana Maria with 2 bar repeat at the end of segment', () => {
        const props = {
            title: 'Ana Maria',
            key: 'G',
            chordString: '*A[T44G^7 |Eb^7/G |G7sus |Eb^7/G |Db^7/F |Gb^7#11 |Ab-7 |Bb/Ab |G-7 |C7sus |D/C |C7sus |Ab/C Bb/C|Ab/C {G7b9sus |Eb^7/G }*B[G^7 |G7sus |Eb/F E7alt|Eb7sus |D^7 F7#5|Bb-7 |Ab-7 |Bb/Ab |G-7 |C7sus |Bb^7 A-7|F-7 |Bb7sus|x|Db7sus|x *C[B-7|x|Eb-7|x|D^7 F7#5|Bb-7 |Ab-7|Bb/Ab|G-7|C7sus|Bb^7 A-7|F-7 E-7 {G7b9sus |Eb^7/G }'
        } as IIRealProChartModelProps;
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Ana Maria');
        expect(model.errors).toEqual([]);
        expect(model.chordString.length).toBe(314);

        expect(model.key).toBe('G');
        expect(model.tuneKeyRootBase).toBe('G');
        expect(model.tuneKeyRelativeToCShift).toBe(4);
        expect(model.tuneKeyIntervalRelativeToC).toBe(7);
        expect(model.tuneAdjective).toBe('major');

        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '[',
                        chords: 'G^7',
                        harmony: [{root: 'G', quality: '^7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb^7/G',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '^7',
                                degree: 6,
                                degreeShift: -1,
                                inversion: '/G',
                                inversionDegree: 1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7sus',
                        harmony: [{root: 'G', quality: '7sus', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb^7/G',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '^7',
                                degree: 6,
                                degreeShift: -1,
                                inversion: '/G',
                                inversionDegree: 1
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
                                degree: 5,
                                degreeShift: -1,
                                inversion: '/F',
                                inversionDegree: 7,
                                inversionDegreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Gb^7#11',
                        harmony: [
                            {
                                root: 'G',
                                shift: 'b',
                                quality: '^7#11',
                                degree: 1,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                degree: 2,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb/Ab',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                degree: 3,
                                degreeShift: -1,
                                inversion: '/Ab',
                                inversionDegree: 2,
                                inversionDegreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'C7sus',
                        harmony: [{root: 'C', quality: '7sus', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'D/C',
                        harmony: [
                            {root: 'D', degree: 5, inversion: '/C', inversionDegree: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C7sus',
                        harmony: [{root: 'C', quality: '7sus', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Ab/C Bb/C',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                degree: 2,
                                degreeShift: -1,
                                inversion: '/C',
                                inversionDegree: 4
                            },
                            {
                                root: 'B',
                                shift: 'b',
                                degree: 3,
                                degreeShift: -1,
                                inversion: '/C',
                                inversionDegree: 4
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab/C',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                degree: 2,
                                degreeShift: -1,
                                inversion: '/C',
                                inversionDegree: 4
                            }
                        ]
                    },
                    {
                        open: '{',
                        chords: 'G7b9sus',
                        harmony: [{root: 'G', quality: '7b9sus', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb^7/G',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '^7',
                                degree: 6,
                                degreeShift: -1,
                                inversion: '/G',
                                inversionDegree: 1
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
                        harmony: [{root: 'G', quality: '^7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'G7sus',
                        harmony: [{root: 'G', quality: '7sus', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb/F E7alt',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                degree: 6,
                                degreeShift: -1,
                                inversion: '/F',
                                inversionDegree: 7,
                                inversionDegreeShift: -1
                            },
                            {root: 'E', quality: '7alt', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb7sus',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '7sus',
                                degree: 6,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D^7 F7#5',
                        harmony: [
                            {root: 'D', quality: '^7', degree: 5},
                            {root: 'F', quality: '7#5', degree: 7, degreeShift: -1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '-7',
                                degree: 3,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                degree: 2,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb/Ab',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                degree: 3,
                                degreeShift: -1,
                                inversion: '/Ab',
                                inversionDegree: 2,
                                inversionDegreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'C7sus',
                        harmony: [{root: 'C', quality: '7sus', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Bb^7 A-7',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '^7',
                                degree: 3,
                                degreeShift: -1
                            },
                            {root: 'A', quality: '-7', degree: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F-7',
                        harmony: [{root: 'F', quality: '-7', degree: 7, degreeShift: -1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb7sus',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '7sus',
                                degree: 3,
                                degreeShift: -1
                            }
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Db7sus',
                        harmony: [
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '7sus',
                                degree: 5,
                                degreeShift: -1
                            }
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
                name: 'C',
                data: [
                    {
                        open: '[',
                        chords: 'B-7',
                        harmony: [{root: 'B', quality: '-7', degree: 3}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Eb-7',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '-7',
                                degree: 6,
                                degreeShift: -1
                            }
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'D^7 F7#5',
                        harmony: [
                            {root: 'D', quality: '^7', degree: 5},
                            {root: 'F', quality: '7#5', degree: 7, degreeShift: -1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '-7',
                                degree: 3,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                degree: 2,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb/Ab',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                degree: 3,
                                degreeShift: -1,
                                inversion: '/Ab',
                                inversionDegree: 2,
                                inversionDegreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'C7sus',
                        harmony: [{root: 'C', quality: '7sus', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Bb^7 A-7',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '^7',
                                degree: 3,
                                degreeShift: -1
                            },
                            {root: 'A', quality: '-7', degree: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F-7 E-7',
                        harmony: [
                            {root: 'F', quality: '-7', degree: 7, degreeShift: -1},
                            {root: 'E', quality: '-7', degree: 6}
                        ]
                    },
                    {
                        open: '{',
                        chords: 'G7b9sus',
                        harmony: [{root: 'G', quality: '7b9sus', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb^7/G',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '^7',
                                degree: 6,
                                degreeShift: -1,
                                inversion: '/G',
                                inversionDegree: 1
                            }
                        ],
                        close: '}'
                    }
                ]
            }
        ]);
    });
    it('handles Armando\'s Rhumba where segment name is inside and has a left whitespace', () => {
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
                        harmony: [{root: 'C', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'D7b9',
                        harmony: [{root: 'D', quality: '7b9', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'G7b13',
                        harmony: [{root: 'G', quality: '7b13', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'C-7',
                        harmony: [{root: 'C', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'C-7',
                        harmony: [{root: 'C', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'D7b9',
                        harmony: [{root: 'D', quality: '7b9', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'G7b13',
                        harmony: [{root: 'G', quality: '7b13', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'C-7',
                        harmony: [{root: 'C', quality: '-7', degree: 1}],
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
                        harmony: [{root: 'C', quality: '7b9', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'F-7',
                        harmony: [{root: 'F', quality: '-7', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'D7b9/F#',
                        harmony: [
                            {
                                root: 'D',
                                quality: '7b9',
                                degree: 2,
                                inversion: '/F#',
                                inversionDegree: 4,
                                inversionDegreeShift: 1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'Abo7',
                        harmony: [{root: 'A', shift: 'b', quality: 'o7', degree: 6}]
                    },
                    {
                        open: '|',
                        chords: 'D7b9/A',
                        harmony: [
                            {
                                root: 'D',
                                quality: '7b9',
                                degree: 2,
                                inversion: '/A',
                                inversionDegree: 6,
                                inversionDegreeShift: 1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb7sus',
                        harmony: [{root: 'B', shift: 'b', quality: '7sus', degree: 7}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Bb7b9sus',
                        harmony: [{root: 'B', shift: 'b', quality: '7b9sus', degree: 7}]
                    },
                    {
                        open: '|',
                        chords: 'x (E7#9)',
                        harmony: [{root: 'x'}],
                        alt: [{root: 'E', quality: '7#9', degree: 3, degreeShift: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb6 (E) (F) (F#)',
                        harmony: [{root: 'E', shift: 'b', quality: '6', degree: 3}],
                        alt: [
                            {root: 'E', degree: 3, degreeShift: 1},
                            {root: 'F', degree: 4},
                            {root: 'F', shift: '#', degree: 4, degreeShift: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7b13',
                        harmony: [{root: 'G', quality: '7b13', degree: 5}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('handles Alone Too Long with double pause (pp)', () => {
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
                        harmony: [{root: 'G', quality: '6', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'p p G#o7',
                        harmony: [
                            {root: 'p'},
                            {root: 'p'},
                            {
                                root: 'G',
                                shift: '#',
                                quality: 'o7',
                                degree: 1,
                                degreeShift: 1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A-7 D7',
                        harmony: [
                            {root: 'A', quality: '-7', degree: 2},
                            {root: 'D', quality: '7', degree: 5}
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'D7',
                        harmony: [{root: 'D', quality: '7', degree: 5}]
                    },
                    {
                        ending: 'N1',
                        open: '|',
                        chords: 'G6 E-7',
                        harmony: [
                            {root: 'G', quality: '6', degree: 1},
                            {root: 'E', quality: '-7', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A-7 D7',
                        harmony: [
                            {root: 'A', quality: '-7', degree: 2},
                            {root: 'D', quality: '7', degree: 5}
                        ],
                        close: '}'
                    },
                    {
                        ending: 'N2',
                        open: '|',
                        chords: 'G6',
                        harmony: [{root: 'G', quality: '6', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'F#h7 B7b9',
                        harmony: [
                            {root: 'F', shift: '#', quality: 'h7', degree: 7},
                            {root: 'B', quality: '7b9', degree: 3}
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
                            {root: 'E', quality: '-', degree: 6},
                            {
                                root: 'E',
                                quality: '-',
                                inversion: '/D',
                                degree: 6,
                                inversionDegree: 5
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-/C# p C7 B7',
                        harmony: [
                            {
                                root: 'E',
                                quality: '-',
                                inversion: '/C#',
                                degree: 6,
                                inversionDegree: 4,
                                inversionDegreeShift: 1
                            },
                            {root: 'p'},
                            {root: 'C', quality: '7', degree: 4},
                            {root: 'B', quality: '7', degree: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-6',
                        harmony: [{root: 'E', quality: '-6', degree: 6}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'E- E-/D',
                        harmony: [
                            {root: 'E', quality: '-', degree: 6},
                            {
                                root: 'E',
                                quality: '-',
                                inversion: '/D',
                                degree: 6,
                                inversionDegree: 5
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A7',
                        harmony: [{root: 'A', quality: '7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'A-11',
                        harmony: [{root: 'A', quality: '-11', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'D7',
                        harmony: [{root: 'D', quality: '7', degree: 5}],
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
                        harmony: [{root: 'G', quality: '6', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'p p G#o7',
                        harmony: [
                            {root: 'p'},
                            {root: 'p'},
                            {
                                root: 'G',
                                shift: '#',
                                quality: 'o7',
                                degree: 1,
                                degreeShift: 1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A-7 D7',
                        harmony: [
                            {root: 'A', quality: '-7', degree: 2},
                            {root: 'D', quality: '7', degree: 5}
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'D7',
                        harmony: [{root: 'D', quality: '7', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'G6 E-7',
                        harmony: [
                            {root: 'G', quality: '6', degree: 1},
                            {root: 'E', quality: '-7', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A-7 D7',
                        harmony: [
                            {root: 'A', quality: '-7', degree: 2},
                            {root: 'D', quality: '7', degree: 5}
                        ],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('handles Crosscurrent', () => {
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
                            {root: 'F', quality: '^7', degree: 1},
                            {root: 'D', quality: '7#5', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7 C7',
                        harmony: [
                            {root: 'G', quality: '-7', degree: 2},
                            {root: 'C', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A-7 D7b9',
                        harmony: [
                            {root: 'A', quality: '-7', degree: 3},
                            {root: 'D', quality: '7b9', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7 C7',
                        harmony: [
                            {root: 'G', quality: '-7', degree: 2},
                            {root: 'C', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^7 F7',
                        harmony: [
                            {root: 'F', quality: '^7', degree: 1},
                            {root: 'F', quality: '7', degree: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb^7 Bo7',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '^7', degree: 4},
                            {root: 'B', quality: 'o7', degree: 4, degreeShift: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C7sus C7',
                        harmony: [
                            {root: 'C', quality: '7sus', degree: 5},
                            {root: 'C', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^7 C7#11',
                        harmony: [
                            {root: 'F', quality: '^7', degree: 1},
                            {root: 'C', quality: '7#11', degree: 5}
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
                            {root: 'F', quality: '^7', degree: 1},
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '7',
                                degree: 3,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7 C7',
                        harmony: [
                            {root: 'G', quality: '-7', degree: 2},
                            {root: 'C', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F6 D7b9',
                        harmony: [
                            {root: 'F', quality: '6', degree: 1},
                            {root: 'D', quality: '7b9', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7 C7',
                        harmony: [
                            {root: 'G', quality: '-7', degree: 2},
                            {root: 'C', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^7 F7',
                        harmony: [
                            {root: 'F', quality: '^7', degree: 1},
                            {root: 'F', quality: '7', degree: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C7#11(Bb^7) (Bo7)',
                        harmony: [{root: 'C', quality: '7#11', degree: 5}],
                        alt: [
                            {root: 'B', shift: 'b', quality: '^7', degree: 4},
                            {root: 'B', quality: 'o7', degree: 4, degreeShift: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: '(C7) x (C7)',
                        harmony: [{root: 'x'}],
                        alt: [
                            {root: 'C', quality: '7', degree: 5},
                            {root: 'C', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^7#11',
                        harmony: [{root: 'F', quality: '^7#11', degree: 1}],
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
                        harmony: [{root: 'B', shift: 'b', quality: '-7', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'A^7#11',
                        harmony: [{root: 'A', quality: '^7#11', degree: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                degree: 3,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G^7#11',
                        harmony: [{root: 'G', quality: '^7#11', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'Gb^7',
                        harmony: [
                            {
                                root: 'G',
                                shift: 'b',
                                quality: '^7',
                                degree: 2,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'B7 D7',
                        harmony: [
                            {root: 'B', quality: '7', degree: 4, degreeShift: 1},
                            {root: 'D', quality: '7', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'C7#11',
                        harmony: [{root: 'C', quality: '7#11', degree: 5}],
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
                            {root: 'F', quality: '^7', degree: 1},
                            {root: 'D', quality: '7b9', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7 C7',
                        harmony: [
                            {root: 'G', quality: '-7', degree: 2},
                            {root: 'C', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A-7 D7b9',
                        harmony: [
                            {root: 'A', quality: '-7', degree: 3},
                            {root: 'D', quality: '7b9', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7 C7',
                        harmony: [
                            {root: 'G', quality: '-7', degree: 2},
                            {root: 'C', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^7 F7',
                        harmony: [
                            {root: 'F', quality: '^7', degree: 1},
                            {root: 'F', quality: '7', degree: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C7#11(Bb^7) (Bo7)',
                        harmony: [{root: 'C', quality: '7#11', degree: 5}],
                        alt: [
                            {root: 'B', shift: 'b', quality: '^7', degree: 4},
                            {root: 'B', quality: 'o7', degree: 4, degreeShift: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: '(C7sus) x (C7)',
                        harmony: [{root: 'x'}],
                        alt: [
                            {root: 'C', quality: '7sus', degree: 5},
                            {root: 'C', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^7#11 C7#5',
                        harmony: [
                            {root: 'F', quality: '^7#11', degree: 1},
                            {root: 'C', quality: '7#5', degree: 5}
                        ],
                        close: ']'
                    }
                ]
            }
        ]);
    });
    it('handles Killer Joe', () => {
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
                        harmony: [{root: 'C', quality: '9', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb9#11',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '9#11',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C9',
                        harmony: [{root: 'C', quality: '9', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb9#11',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '9#11',
                                degree: 7,
                                degreeShift: -1
                            }
                        ],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'C9',
                        harmony: [{root: 'C', quality: '9', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb9#11',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '9#11',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C9',
                        harmony: [{root: 'C', quality: '9', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb9#11',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '9#11',
                                degree: 7,
                                degreeShift: -1
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
                        chords: 'Eh7',
                        harmony: [{root: 'E', quality: 'h7', degree: 3}]
                    },
                    {
                        open: '|',
                        chords: 'A7b9',
                        harmony: [{root: 'A', quality: '7b9', degree: 6}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-7',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '-7',
                                degree: 3,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '7',
                                degree: 6,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A7',
                        harmony: [{root: 'A', quality: '7', degree: 6}]
                    },
                    {
                        open: '|',
                        chords: 'Ab7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '7',
                                degree: 6,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', degree: 3}]
                    },
                    {
                        open: '|',
                        chords: 'A7',
                        harmony: [{root: 'A', quality: '7', degree: 6}],
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
                        harmony: [{root: 'C', quality: '9', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb9#11',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '9#11',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C9',
                        harmony: [{root: 'C', quality: '9', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb9#11',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '9#11',
                                degree: 7,
                                degreeShift: -1
                            }
                        ],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'C9',
                        harmony: [{root: 'C', quality: '9', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb9#11',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '9#11',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C9',
                        harmony: [{root: 'C', quality: '9', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb9#11',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '9#11',
                                degree: 7,
                                degreeShift: -1
                            }
                        ],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('handles Moanin\'', () => {
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
                        harmony: [{root: 'n'}, {root: 'B', shift: 'b', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'F n',
                        harmony: [{root: 'F', degree: 1}, {root: 'n'}]
                    },
                    {
                        open: '|',
                        chords: 'n Bb',
                        harmony: [{root: 'n'}, {root: 'B', shift: 'b', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'F n',
                        harmony: [{root: 'F', degree: 1}, {root: 'n'}],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'n Bb',
                        harmony: [{root: 'n'}, {root: 'B', shift: 'b', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'F n',
                        harmony: [{root: 'F', degree: 1}, {root: 'n'}]
                    },
                    {
                        open: '|',
                        chords: 'n Bb',
                        harmony: [{root: 'n'}, {root: 'B', shift: 'b', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'F n',
                        harmony: [{root: 'F', degree: 1}, {root: 'n'}],
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
                            {root: 'B', shift: 'b', quality: '-7', degree: 4},
                            {root: 'A', shift: 'b', quality: '9', degree: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7b9 C7#9',
                        harmony: [
                            {root: 'G', quality: '7b9', degree: 2},
                            {root: 'C', quality: '7#9', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F-7',
                        harmony: [{root: 'F', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'F7b9 B7',
                        harmony: [
                            {root: 'F', quality: '7b9', degree: 1},
                            {root: 'B', quality: '7', degree: 4, degreeShift: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7 Ab9',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '-7', degree: 4},
                            {root: 'A', shift: 'b', quality: '9', degree: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7b9',
                        harmony: [{root: 'G', quality: '7b9', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'Gh7',
                        harmony: [{root: 'G', quality: 'h7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'C7b9',
                        harmony: [{root: 'C', quality: '7b9', degree: 5}],
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
                            {root: 'F', quality: '-7', degree: 1},
                            {root: 'A', shift: 'b', quality: '7', degree: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7 C7b9',
                        harmony: [
                            {root: 'G', quality: '7', degree: 2},
                            {root: 'C', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        segno: true,
                        open: '|',
                        chords: 'F-7 Ab7',
                        harmony: [
                            {root: 'F', quality: '-7', degree: 1},
                            {root: 'A', shift: 'b', quality: '7', degree: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7 C7b9',
                        harmony: [
                            {root: 'G', quality: '7', degree: 2},
                            {root: 'C', quality: '7b9', degree: 5}
                        ],
                        close: '|'
                    },
                    {
                        segno: true,
                        open: '|',
                        chords: 'F-7 Ab7',
                        harmony: [
                            {root: 'F', quality: '-7', degree: 1},
                            {root: 'A', shift: 'b', quality: '7', degree: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7 C7b9',
                        harmony: [
                            {root: 'G', quality: '7', degree: 2},
                            {root: 'C', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        segno: true,
                        open: '|',
                        chords: 'F-7 Ab7',
                        harmony: [
                            {root: 'F', quality: '-7', degree: 1},
                            {root: 'A', shift: 'b', quality: '7', degree: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7 C7b9',
                        harmony: [
                            {root: 'G', quality: '7', degree: 2},
                            {root: 'C', quality: '7b9', degree: 5}
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
                            {root: 'B', shift: 'b', quality: '-7', degree: 4},
                            {root: 'A', shift: 'b', quality: '9', degree: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7b9 C7#9',
                        harmony: [
                            {root: 'G', quality: '7b9', degree: 2},
                            {root: 'C', quality: '7#9', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F-7',
                        harmony: [{root: 'F', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'F7b9 B7',
                        harmony: [
                            {root: 'F', quality: '7b9', degree: 1},
                            {root: 'B', quality: '7', degree: 4, degreeShift: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7 Ab9',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '-7', degree: 4},
                            {root: 'A', shift: 'b', quality: '9', degree: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G7b9',
                        harmony: [{root: 'G', quality: '7b9', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'Gh7',
                        harmony: [{root: 'G', quality: 'h7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'C7b9',
                        harmony: [{root: 'C', quality: '7b9', degree: 5}],
                        close: ']'
                    }
                ]
            }
        ]);
    });
    it('handles Brazilian Suite', () => {
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
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb-7',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '-7',
                                degree: 4,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb-7',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '-7',
                                degree: 4,
                                degreeShift: -1
                            }
                        ],
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
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7/Gb',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                degree: 7,
                                degreeShift: -1,
                                inversion: '/Gb',
                                inversionDegree: 6,
                                inversionDegreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E^7#11',
                        harmony: [{root: 'E', quality: '^7#11', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-7',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '-7',
                                degree: 4,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Db-7',
                        harmony: [
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '-7',
                                degree: 3,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb7b9',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '7b9',
                                degree: 4,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D7b5',
                        harmony: [{root: 'D', quality: '7b5', degree: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Db7',
                        harmony: [
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '7',
                                degree: 3,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C^7#5',
                        harmony: [{root: 'C', quality: '^7#5', degree: 2, degreeShift: -1}]
                    },
                    {
                        open: '|',
                        chords: 'B7',
                        harmony: [{root: 'B', quality: '7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb7b9',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '7b9',
                                degree: 1,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb7#9',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '7#9',
                                degree: 4,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb7b9',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '7b9',
                                degree: 4,
                                degreeShift: -1
                            }
                        ],
                        close: ']'
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'B7/F#',
                        harmony: [
                            {
                                root: 'B',
                                quality: '7',
                                degree: 1,
                                inversion: '/F#',
                                inversionDegree: 5
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Fh7',
                        harmony: [{root: 'F', quality: 'h7', degree: 5, degreeShift: -1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb7',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '7',
                                degree: 1,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'A7',
                        harmony: [{root: 'A', quality: '7', degree: 7}]
                    },
                    {
                        open: '|',
                        chords: 'D^7',
                        harmony: [{root: 'D', quality: '^7', degree: 3}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-7 Ab7',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '-7',
                                degree: 4,
                                degreeShift: -1
                            },
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '7',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Db^7',
                        harmony: [
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '^7',
                                degree: 3,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '-7',
                                degree: 1,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb-7',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '-7',
                                degree: 4,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '7',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Db^7',
                        harmony: [
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '^7',
                                degree: 3,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '-7',
                                degree: 1,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb^7#11',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '^7#11',
                                degree: 4,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb7',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '7',
                                degree: 4,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7/Gb',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                degree: 7,
                                degreeShift: -1,
                                inversion: '/Gb',
                                inversionDegree: 6,
                                inversionDegreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb^7#11',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '^7#11',
                                degree: 4,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb-7',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '-7',
                                degree: 4,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Db-7',
                        harmony: [
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '-7',
                                degree: 3,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb7b9',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '7b9',
                                degree: 4,
                                degreeShift: -1
                            }
                        ],
                        close: ']'
                    },
                    {
                        open: '{',
                        chords: 'Ab-7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb-7',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '-7',
                                degree: 4,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb-7',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '-7',
                                degree: 4,
                                degreeShift: -1
                            }
                        ],
                        close: '}'
                    },
                    {
                        coda: true,
                        open: '|',
                        chords: 'Db^7',
                        harmony: [
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '^7',
                                degree: 3,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Db^7',
                        harmony: [
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '^7',
                                degree: 3,
                                degreeShift: -1
                            }
                        ],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('handles Butterfly with empty chord W/C', () => {
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
                        harmony: [{root: 'F', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'p A-7',
                        harmony: [
                            {root: 'p'},
                            {root: 'A', quality: '-7', degree: 3, degreeShift: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F-7',
                        harmony: [{root: 'F', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'p A-7',
                        harmony: [
                            {root: 'p'},
                            {root: 'A', quality: '-7', degree: 3, degreeShift: 1}
                        ],
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
                        harmony: [{root: 'F', quality: '-11', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'p A-11',
                        harmony: [
                            {root: 'p'},
                            {root: 'A', quality: '-11', degree: 3, degreeShift: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F-11',
                        harmony: [{root: 'F', quality: '-11', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'p D-11',
                        harmony: [
                            {root: 'p'},
                            {root: 'D', quality: '-11', degree: 6, degreeShift: 1}
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
                        chords: 'n Bb7',
                        harmony: [
                            {root: 'n'},
                            {root: 'B', shift: 'b', quality: '7', degree: 4}
                        ]
                    },
                    {open: '|', chords: 'n', harmony: [{root: 'n'}]},
                    {open: '|', chords: 'n', harmony: [{root: 'n'}]},
                    {
                        open: '|',
                        chords: 'n A7#9#5',
                        harmony: [
                            {root: 'n'},
                            {root: 'A', quality: '7#9#5', degree: 3, degreeShift: 1}
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
                                degree: 3,
                                inversion: '/Bb',
                                inversionDegree: 4
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
                                degree: 3,
                                inversion: '/Bb',
                                inversionDegree: 4
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
                                degree: 3,
                                inversion: '/Bb',
                                inversionDegree: 4
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb13',
                        harmony: [{root: 'B', shift: 'b', quality: '13', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'Eb13sus',
                        harmony: [{root: 'E', shift: 'b', quality: '13sus', degree: 7}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Eb7#9#5',
                        harmony: [{root: 'E', shift: 'b', quality: '7#9#5', degree: 7}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Ab13sus',
                        harmony: [{root: 'A', shift: 'b', quality: '13sus', degree: 3}]
                    },
                    {
                        coda: true,
                        open: '|',
                        chords: 'p p W/C C7/E',
                        harmony: [
                            {root: 'p'},
                            {root: 'p'},
                            {root: 'W', inversion: '/C', inversionDegree: 5},
                            {
                                root: 'C',
                                quality: '7',
                                degree: 5,
                                inversion: '/E',
                                inversionDegree: 7,
                                inversionDegreeShift: 1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'n F-7',
                        harmony: [{root: 'n'}, {root: 'F', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'p A-7',
                        harmony: [
                            {root: 'p'},
                            {root: 'A', quality: '-7', degree: 3, degreeShift: 1}
                        ],
                        close: '|'
                    },
                    {
                        open: '{',
                        chords: 'F-7',
                        harmony: [{root: 'F', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'p A-7',
                        harmony: [
                            {root: 'p'},
                            {root: 'A', quality: '-7', degree: 3, degreeShift: 1}
                        ],
                        close: '}'
                    },
                    {divider: 'Y'},
                    {
                        coda: true,
                        open: '{',
                        chords: 'F-11',
                        harmony: [{root: 'F', quality: '-11', degree: 1}]
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
                        harmony: [{root: 'B', shift: 'b', quality: '13', degree: 4}]
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
                        harmony: [{root: 'A', quality: '^7#11', degree: 3, degreeShift: 1}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('handles A. Beleza é Você, Menina with special symbols and uneven lines', () => {
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
                        harmony: [{root: 'E', quality: '-7', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'B-7',
                        harmony: [{root: 'B', quality: '-7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', degree: 5}],
                        close: ']'
                    },
                    {divider: 'Y'},
                    {
                        open: '{',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'B-7',
                        harmony: [{root: 'B', quality: '-7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'E-9',
                        harmony: [{root: 'E', quality: '-9', degree: 5}],
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
                        harmony: [{root: 'A', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'B-7',
                        harmony: [{root: 'B', quality: '-7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', degree: 5}],
                        close: '}'
                    },
                    {
                        open: '[',
                        chords: 'C^9',
                        harmony: [{root: 'C', quality: '^9', degree: 3}]
                    },
                    {
                        open: '|',
                        chords: 'B-7',
                        harmony: [{root: 'B', quality: '-7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'B-7',
                        harmony: [{root: 'B', quality: '-7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 1}],
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
                        harmony: [{root: 'C', quality: '^9', degree: 3}]
                    },
                    {
                        open: '|',
                        chords: 'B-7',
                        harmony: [{root: 'B', quality: '-7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', degree: 5}],
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
                        harmony: [{root: 'C', quality: '^9', degree: 3}],
                        alt: [{root: 'A', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'B-7',
                        harmony: [{root: 'B', quality: '-7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', degree: 5}],
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
                        harmony: [{root: 'C', quality: '^9', degree: 3}]
                    },
                    {
                        open: '|',
                        chords: 'B-7',
                        harmony: [{root: 'B', quality: '-7', degree: 2}]
                    },
                    {
                        ending: 'N1',
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', degree: 5}],
                        close: '}'
                    },
                    {
                        ending: 'N2',
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 1}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('handles A.Epopéia de Zumbi - In ABC ABC with special symbols and uneven lines', () => {
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
                            {root: 'E', quality: '-', degree: 1},
                            {root: 'E', quality: '-^7', degree: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-7 E-6',
                        harmony: [
                            {root: 'E', quality: '-7', degree: 1},
                            {root: 'E', quality: '-6', degree: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C7 B7',
                        harmony: [
                            {root: 'C', quality: '7', degree: 6},
                            {root: 'B', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E- B7',
                        harmony: [
                            {root: 'E', quality: '-', degree: 1},
                            {root: 'B', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E- nB7',
                        harmony: [{root: 'E', quality: '-', degree: 1}, {root: 'n'}],
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
                        harmony: [{root: 'E', quality: '-', degree: 1}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'D7',
                        harmony: [{root: 'D', quality: '7', degree: 7}]
                    },
                    {
                        open: '|',
                        chords: 'x(D7/F#)',
                        harmony: [{root: 'x'}],
                        alt: [
                            {
                                root: 'D',
                                quality: '7',
                                degree: 7,
                                inversion: '/F#',
                                inversionDegree: 2
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C7',
                        harmony: [{root: 'C', quality: '7', degree: 6}]
                    },
                    {
                        open: '|',
                        chords: 'x(C7/Bb)',
                        harmony: [{root: 'x'}],
                        alt: [
                            {
                                root: 'C',
                                quality: '7',
                                degree: 6,
                                inversion: '/Bb',
                                inversionDegree: 5,
                                inversionDegreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'B7',
                        harmony: [{root: 'B', quality: '7', degree: 5}]
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
                        harmony: [{root: 'A', quality: '-', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'D7',
                        harmony: [{root: 'D', quality: '7', degree: 7}]
                    },
                    {open: '|', chords: 'G', harmony: [{root: 'G', degree: 3}]},
                    {open: '|', chords: 'C', harmony: [{root: 'C', degree: 6}]},
                    {
                        open: '|',
                        chords: 'F#h',
                        harmony: [{root: 'F', shift: '#', quality: 'h', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'B7',
                        harmony: [{root: 'B', quality: '7', degree: 5}]
                    },
                    {
                        ending: 'N1',
                        open: '|',
                        chords: 'E7',
                        harmony: [{root: 'E', quality: '7', degree: 1}]
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
                            {root: 'E', quality: '-', degree: 1},
                            {root: 'B', quality: '7', degree: 5}
                        ],
                        close: ']'
                    },
                    {divider: 'Y', close: ']'}
                ]
            },
            {
                name: 'B',
                data: [
                    {open: '[', chords: 'E', harmony: [{root: 'E', degree: 1}]},
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'x C#7',
                        harmony: [
                            {root: 'x'},
                            {
                                root: 'C',
                                shift: '#',
                                quality: '7',
                                degree: 6,
                                degreeShift: 1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F#- F#-^7',
                        harmony: [
                            {root: 'F', shift: '#', quality: '-', degree: 2},
                            {root: 'F', shift: '#', quality: '-^7', degree: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F#-',
                        harmony: [{root: 'F', shift: '#', quality: '-', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'B7',
                        harmony: [{root: 'B', quality: '7', degree: 5}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'E B7',
                        harmony: [
                            {root: 'E', degree: 1},
                            {root: 'B', quality: '7', degree: 5}
                        ]
                    },
                    {divider: 'Y'},
                    {
                        open: '{',
                        chords: 'E Fo',
                        harmony: [
                            {root: 'E', degree: 1},
                            {root: 'F', quality: 'o', degree: 2, degreeShift: -1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F#-',
                        harmony: [{root: 'F', shift: '#', quality: '-', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'B7',
                        harmony: [{root: 'B', quality: '7', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'E B7',
                        harmony: [
                            {root: 'E', degree: 1},
                            {root: 'B', quality: '7', degree: 5}
                        ],
                        close: '}'
                    },
                    {
                        ending: 'N0',
                        open: '|',
                        chords: 'E-',
                        harmony: [{root: 'E', quality: '-', degree: 1}],
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
                            {root: 'F', shift: '#', quality: 'h', degree: 2},
                            {root: 'B', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-',
                        harmony: [{root: 'E', quality: '-', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'F#h B7',
                        harmony: [
                            {root: 'F', shift: '#', quality: 'h', degree: 2},
                            {root: 'B', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-',
                        harmony: [{root: 'E', quality: '-', degree: 1}],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'F#h B7',
                        harmony: [
                            {root: 'F', shift: '#', quality: 'h', degree: 2},
                            {root: 'B', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-',
                        harmony: [{root: 'E', quality: '-', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'F#h B7',
                        harmony: [
                            {root: 'F', shift: '#', quality: 'h', degree: 2},
                            {root: 'B', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-',
                        harmony: [{root: 'E', quality: '-', degree: 1}],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'B7',
                        harmony: [{root: 'B', quality: '7', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'E- n B7',
                        harmony: [
                            {root: 'E', quality: '-', degree: 1},
                            {root: 'n'},
                            {root: 'B', quality: '7', degree: 5}
                        ],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('handles Alguém me Avisou, it has extra chords in double bar repeat and double repeat at the start of the segment', () => {
        // TODO find out how to handle chords put inside double bar repeats, maybe treat them as alt chords
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
                            {root: 'D', degree: 1},
                            {root: 'G', quality: '7', degree: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D A7',
                        harmony: [
                            {root: 'D', degree: 1},
                            {root: 'A', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D G7',
                        harmony: [
                            {root: 'D', degree: 1},
                            {root: 'G', quality: '7', degree: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D A7',
                        harmony: [
                            {root: 'D', degree: 1},
                            {root: 'A', quality: '7', degree: 5}
                        ],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'D E-',
                        harmony: [
                            {root: 'D', degree: 1},
                            {root: 'E', quality: '-', degree: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F#- G^(E-)',
                        harmony: [
                            {root: 'F', shift: '#', quality: '-', degree: 3},
                            {root: 'G', quality: '^', degree: 4}
                        ],
                        alt: [{root: 'E', quality: '-', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'D E-',
                        harmony: [
                            {root: 'D', degree: 1},
                            {root: 'E', quality: '-', degree: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F#- G^(E-)',
                        harmony: [
                            {root: 'F', shift: '#', quality: '-', degree: 3},
                            {root: 'G', quality: '^', degree: 4}
                        ],
                        alt: [{root: 'E', quality: '-', degree: 2}],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: '(F#h) B7(B7)',
                        harmony: [{root: 'B', quality: '7', degree: 6}],
                        alt: [
                            {root: 'F', shift: '#', quality: 'h', degree: 3},
                            {root: 'B', quality: '7', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E- A7',
                        harmony: [
                            {root: 'E', quality: '-', degree: 2},
                            {root: 'A', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D D#o',
                        harmony: [
                            {root: 'D', degree: 1},
                            {
                                root: 'D',
                                shift: '#',
                                quality: 'o',
                                degree: 1,
                                degreeShift: 1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E- A7',
                        harmony: [
                            {root: 'E', quality: '-', degree: 2},
                            {root: 'A', quality: '7', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D D#o',
                        harmony: [
                            {root: 'D', degree: 1},
                            {
                                root: 'D',
                                shift: '#',
                                quality: 'o',
                                degree: 1,
                                degreeShift: 1
                            }
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
                            {root: 'F', shift: '#', quality: 'h', degree: 3},
                            {root: 'B', quality: '7', degree: 6}
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
                            {root: 'F', shift: '#', quality: 'h', degree: 3},
                            {root: 'B', quality: '7', degree: 6}
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
                            {root: 'F', shift: '#', quality: 'h', degree: 3},
                            {root: 'B', quality: '7', degree: 6}
                        ],
                        close: '|'
                    },
                    {
                        open: '|',
                        chords: 'A7',
                        harmony: [{root: 'A', quality: '7', degree: 5}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('handles Amor e Festança, no chords, only bar separators', () => {
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
    it('handles Jogral, with strange closing bar override', () => {
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
                        harmony: [{root: 'G', quality: '^9', degree: 6}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-9 Eb-6',
                        harmony: [
                            {root: 'E', shift: 'b', quality: '-9', degree: 4},
                            {root: 'E', shift: 'b', quality: '-6', degree: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-9',
                        harmony: [{root: 'D', quality: '-9', degree: 3}]
                    },
                    {
                        open: '|',
                        chords: 'G7#9#5',
                        harmony: [{root: 'G', quality: '7#9#5', degree: 6}]
                    },
                    {
                        open: '|',
                        chords: 'C-9',
                        harmony: [{root: 'C', quality: '-9', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'F13b9',
                        harmony: [{root: 'F', quality: '13b9', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'Bb^9 A-7',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '^9', degree: 1},
                            {root: 'A', quality: '-7', degree: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-9 G-7/F',
                        harmony: [
                            {root: 'G', quality: '-9', degree: 6},
                            {
                                root: 'G',
                                quality: '-7',
                                degree: 6,
                                inversion: '/F',
                                inversionDegree: 5
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-9',
                        harmony: [{root: 'E', quality: '-9', degree: 4, degreeShift: 1}]
                    },
                    {
                        open: '|',
                        chords: 'A7b9b5',
                        harmony: [{root: 'A', quality: '7b9b5', degree: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-9 Ab9',
                        harmony: [
                            {root: 'E', shift: 'b', quality: '-9', degree: 4},
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '9',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Db-9 Gb9',
                        harmony: [
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '-9',
                                degree: 3,
                                degreeShift: -1
                            },
                            {
                                root: 'G',
                                shift: 'b',
                                quality: '9',
                                degree: 6,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C-9 F7b9',
                        harmony: [
                            {root: 'C', quality: '-9', degree: 2},
                            {root: 'F', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb^9',
                        harmony: [{root: 'B', shift: 'b', quality: '^9', degree: 1}]
                    },
                    {
                        ending: 'N1',
                        open: '|',
                        chords: 'D9sus',
                        harmony: [{root: 'D', quality: '9sus', degree: 3}],
                        close: '}'
                    },
                    {
                        ending: 'N2',
                        open: '|',
                        chords: 'B7#9',
                        harmony: [{root: 'B', quality: '7#9', degree: 1, degreeShift: 1}],
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
                        harmony: [{root: 'E', quality: '-9', degree: 4, degreeShift: 1}]
                    },
                    {
                        open: '|',
                        chords: 'A13sus A13',
                        harmony: [
                            {root: 'A', quality: '13sus', degree: 7},
                            {root: 'A', quality: '13', degree: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D^9',
                        harmony: [{root: 'D', quality: '^9', degree: 3}]
                    },
                    {
                        open: '|',
                        chords: 'D9sus D7#9#5',
                        harmony: [
                            {root: 'D', quality: '9sus', degree: 3},
                            {root: 'D', quality: '7#9#5', degree: 3}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-9',
                        harmony: [{root: 'G', quality: '-9', degree: 6}]
                    },
                    {
                        open: '|',
                        chords: 'C13sus C13',
                        harmony: [
                            {root: 'C', quality: '13sus', degree: 2},
                            {root: 'C', quality: '13', degree: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^9',
                        harmony: [{root: 'F', quality: '^9', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'D9sus',
                        harmony: [{root: 'D', quality: '9sus', degree: 3}],
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
                        harmony: [{root: 'G', quality: '^9', degree: 6}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-9 Eb-6',
                        harmony: [
                            {root: 'E', shift: 'b', quality: '-9', degree: 4},
                            {root: 'E', shift: 'b', quality: '-6', degree: 4}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-9',
                        harmony: [{root: 'D', quality: '-9', degree: 3}]
                    },
                    {
                        open: '|',
                        chords: 'G7#9#5',
                        harmony: [{root: 'G', quality: '7#9#5', degree: 6}]
                    },
                    {
                        open: '|',
                        chords: 'C-9',
                        harmony: [{root: 'C', quality: '-9', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'F13b9',
                        harmony: [{root: 'F', quality: '13b9', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'Bb^9 A-7',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '^9', degree: 1},
                            {root: 'A', quality: '-7', degree: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-9 G-7/F',
                        harmony: [
                            {root: 'G', quality: '-9', degree: 6},
                            {
                                root: 'G',
                                quality: '-7',
                                degree: 6,
                                inversion: '/F',
                                inversionDegree: 5
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-9',
                        harmony: [{root: 'E', quality: '-9', degree: 4, degreeShift: 1}]
                    },
                    {
                        open: '|',
                        chords: 'A7b9b5',
                        harmony: [{root: 'A', quality: '7b9b5', degree: 7}]
                    },
                    {
                        open: '|',
                        chords: 'Eb-9 Ab9',
                        harmony: [
                            {root: 'E', shift: 'b', quality: '-9', degree: 4},
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '9',
                                degree: 7,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Db-9 Gb9',
                        harmony: [
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '-9',
                                degree: 3,
                                degreeShift: -1
                            },
                            {
                                root: 'G',
                                shift: 'b',
                                quality: '9',
                                degree: 6,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C-9 F7b9',
                        harmony: [
                            {root: 'C', quality: '-9', degree: 2},
                            {root: 'F', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb^9',
                        harmony: [{root: 'B', shift: 'b', quality: '^9', degree: 1}]
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
                        harmony: [{root: 'D', quality: '13#11', degree: 3}, {root: 'n'}]
                    },
                    {
                        open: '|',
                        chords: 'n D13',
                        harmony: [{root: 'n'}, {root: 'D', quality: '13', degree: 3}]
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
                        harmony: [{root: 'D', quality: '13', degree: 3}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'D13',
                        harmony: [{root: 'D', quality: '13', degree: 3}]
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
                        harmony: [{root: 'D', quality: '13#11', degree: 3}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'D9sus',
                        harmony: [{root: 'D', quality: '9sus', degree: 3}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('handles The Bat, with unnamed segment along with named', () => {
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
                            {root: 'G', degree: 1},
                            {
                                root: 'D',
                                degree: 5,
                                inversion: '/F#',
                                inversionDegree: 7
                            },
                            {root: 'E', quality: '-', degree: 6},
                            {root: 'A', quality: '7', degree: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D p A-7 D7',
                        harmony: [
                            {root: 'D', degree: 5},
                            {root: 'p'},
                            {root: 'A', quality: '-7', degree: 2},
                            {root: 'D', quality: '7', degree: 5}
                        ],
                        close: '|'
                    },
                    {divider: 'Y'},
                    {
                        open: '|',
                        chords: 'G D/F# E- A7',
                        harmony: [
                            {root: 'G', degree: 1},
                            {
                                root: 'D',
                                degree: 5,
                                inversion: '/F#',
                                inversionDegree: 7
                            },
                            {root: 'E', quality: '-', degree: 6},
                            {root: 'A', quality: '7', degree: 2}
                        ]
                    },
                    {
                        timeSignature: '3 / 4',
                        open: '|',
                        chords: 'D p A-',
                        harmony: [
                            {root: 'D', degree: 5},
                            {root: 'p'},
                            {root: 'A', quality: '-', degree: 2}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Db/Cb p Bb13b9',
                        harmony: [
                            {
                                root: 'D',
                                shift: 'b',
                                degree: 5,
                                degreeShift: -1,
                                inversion: '/Cb',
                                inversionDegree: 4,
                                inversionDegreeShift: -1
                            },
                            {root: 'p'},
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '13b9',
                                degree: 3,
                                degreeShift: -1
                            }
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
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '-7',
                                degree: 6,
                                degreeShift: -1
                            },
                            {root: 'p'},
                            {
                                root: 'C',
                                shift: '#',
                                quality: '-7',
                                degree: 4,
                                degreeShift: 1
                            },
                            {root: 'F', shift: '#', quality: '7', degree: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ch7 p Cb^7 Db/Cb',
                        harmony: [
                            {root: 'C', quality: 'h7', degree: 4},
                            {root: 'p'},
                            {
                                root: 'C',
                                shift: 'b',
                                quality: '^7',
                                degree: 4,
                                degreeShift: -1
                            },
                            {
                                root: 'D',
                                shift: 'b',
                                degree: 5,
                                degreeShift: -1,
                                inversion: '/Cb',
                                inversionDegree: 4,
                                inversionDegreeShift: -1
                            }
                        ],
                        close: '|'
                    },
                    {divider: 'Y'},
                    {
                        open: '|',
                        chords: 'Gb/Bb Eb-7 D13 Db13',
                        harmony: [
                            {
                                root: 'G',
                                shift: 'b',
                                degree: 1,
                                degreeShift: -1,
                                inversion: '/Bb',
                                inversionDegree: 3,
                                inversionDegreeShift: -1
                            },
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '-7',
                                degree: 6,
                                degreeShift: -1
                            },
                            {root: 'D', quality: '13', degree: 5},
                            {
                                root: 'D',
                                shift: 'b',
                                quality: '13',
                                degree: 5,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C13b9 F-',
                        harmony: [
                            {root: 'C', quality: '13b9', degree: 4},
                            {root: 'F', quality: '-', degree: 7, degreeShift: -1}
                        ]
                    },
                    {
                        timeSignature: '2 / 4',
                        open: '|',
                        chords: 'Fh7 Bb7#5',
                        harmony: [
                            {root: 'F', quality: 'h7', degree: 7, degreeShift: -1},
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '7#5',
                                degree: 3,
                                degreeShift: -1
                            }
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
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '^7',
                                degree: 6,
                                degreeShift: -1
                            },
                            {root: 'p'},
                            {
                                root: 'B',
                                shift: 'b',
                                degree: 3,
                                degreeShift: -1,
                                inversion: '/D',
                                inversionDegree: 5
                            },
                            {root: 'p'}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab/C p Ab-/Cb p',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                degree: 2,
                                degreeShift: -1,
                                inversion: '/C',
                                inversionDegree: 4
                            },
                            {root: 'p'},
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-',
                                degree: 2,
                                degreeShift: -1,
                                inversion: '/Cb',
                                inversionDegree: 4,
                                inversionDegreeShift: -1
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
                            {
                                root: 'E',
                                shift: 'b',
                                degree: 6,
                                degreeShift: -1,
                                inversion: '/Bb',
                                inversionDegree: 3,
                                inversionDegreeShift: -1
                            },
                            {root: 'p'},
                            {root: 'p'},
                            {root: 'p'}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab/Bb p Ah7 D7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                degree: 2,
                                degreeShift: -1,
                                inversion: '/Bb',
                                inversionDegree: 3,
                                inversionDegreeShift: -1
                            },
                            {root: 'p'},
                            {root: 'A', quality: 'h7', degree: 2},
                            {root: 'D', quality: '7', degree: 5}
                        ],
                        close: '}'
                    },
                    {divider: 'Y'},
                    {
                        coda: true,
                        open: '[',
                        chords: 'Ab/Bb',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                degree: 2,
                                degreeShift: -1,
                                inversion: '/Bb',
                                inversionDegree: 3,
                                inversionDegreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb/Bb',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                degree: 6,
                                degreeShift: -1,
                                inversion: '/Bb',
                                inversionDegree: 3,
                                inversionDegreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab/Bb',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                degree: 2,
                                degreeShift: -1,
                                inversion: '/Bb',
                                inversionDegree: 3,
                                inversionDegreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb/Bb',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                degree: 6,
                                degreeShift: -1,
                                inversion: '/Bb',
                                inversionDegree: 3,
                                inversionDegreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab/Bb',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                degree: 2,
                                degreeShift: -1,
                                inversion: '/Bb',
                                inversionDegree: 3,
                                inversionDegreeShift: -1
                            }
                        ]
                    },
                    {
                        fermata: true,
                        open: '|',
                        chords: 'Eb',
                        harmony: [{root: 'E', shift: 'b', degree: 6, degreeShift: -1}],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('handles Alfie\'s Theme with shifted degree values 6 and 6#', () => {
        const props = {
            title: "Alfie's Theme",
            author: 'Sonny Rollins',
            style: 'Medium Swing',
            key: 'Bb-',
            chordString: '*A{T44Bb-7 Bb-7/Ab|Gh7 Gb^7|Bb-7/F Gh7|Ch7 F7b9|Bb-7 Bb-7/Ab|Gh7 Gb^7|Bb-7/F Gh7|Ch F7 Bb-7 }*B[ Bb-7 Ab7|Gb7 F7b9|Bb-7 Ab7|Gb7 F7b9|Bb-7 Ab7|Gb7 F7b9|Bb-7 Ab7|Gb7 F7b9 ]*A[Bb-7 Bb-7/Ab|Gh7 Gb^7|Bb-7/F Gh7|Ch7 F7b9|Bb-7 Bb-7/Ab|Gh7 Gb^7|Bb-7/F Gh7|Ch F7 Bb-7 Z'
        } as IIRealProChartModelProps;
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Alfie\'s Theme');
        expect(model.errors).toEqual([]);

        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '{',
                        chords: 'Bb-7 Bb-7/Ab',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '-7', degree: 1},
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '-7',
                                degree: 1,
                                inversion: '/Ab',
                                inversionDegree: 7
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Gh7 Gb^7',
                        harmony: [
                            {root: 'G', quality: 'h7', degree: 6, degreeShift: 1},
                            {root: 'G', shift: 'b', quality: '^7', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7/F Gh7',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '-7',
                                degree: 1,
                                inversion: '/F',
                                inversionDegree: 5
                            },
                            {root: 'G', quality: 'h7', degree: 6, degreeShift: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ch7 F7b9',
                        harmony: [
                            {root: 'C', quality: 'h7', degree: 2},
                            {root: 'F', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7 Bb-7/Ab',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '-7', degree: 1},
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '-7',
                                degree: 1,
                                inversion: '/Ab',
                                inversionDegree: 7
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Gh7 Gb^7',
                        harmony: [
                            {root: 'G', quality: 'h7', degree: 6, degreeShift: 1},
                            {root: 'G', shift: 'b', quality: '^7', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7/F Gh7',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '-7',
                                degree: 1,
                                inversion: '/F',
                                inversionDegree: 5
                            },
                            {root: 'G', quality: 'h7', degree: 6, degreeShift: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ch F7 Bb-7',
                        harmony: [
                            {root: 'C', quality: 'h', degree: 2},
                            {root: 'F', quality: '7', degree: 5},
                            {root: 'B', shift: 'b', quality: '-7', degree: 1}
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
                        chords: 'Bb-7 Ab7',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '-7', degree: 1},
                            {root: 'A', shift: 'b', quality: '7', degree: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Gb7 F7b9',
                        harmony: [
                            {root: 'G', shift: 'b', quality: '7', degree: 6},
                            {root: 'F', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7 Ab7',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '-7', degree: 1},
                            {root: 'A', shift: 'b', quality: '7', degree: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Gb7 F7b9',
                        harmony: [
                            {root: 'G', shift: 'b', quality: '7', degree: 6},
                            {root: 'F', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7 Ab7',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '-7', degree: 1},
                            {root: 'A', shift: 'b', quality: '7', degree: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Gb7 F7b9',
                        harmony: [
                            {root: 'G', shift: 'b', quality: '7', degree: 6},
                            {root: 'F', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7 Ab7',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '-7', degree: 1},
                            {root: 'A', shift: 'b', quality: '7', degree: 7}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Gb7 F7b9',
                        harmony: [
                            {root: 'G', shift: 'b', quality: '7', degree: 6},
                            {root: 'F', quality: '7b9', degree: 5}
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
                        chords: 'Bb-7 Bb-7/Ab',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '-7', degree: 1},
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '-7',
                                degree: 1,
                                inversion: '/Ab',
                                inversionDegree: 7
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Gh7 Gb^7',
                        harmony: [
                            {root: 'G', quality: 'h7', degree: 6, degreeShift: 1},
                            {root: 'G', shift: 'b', quality: '^7', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7/F Gh7',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '-7',
                                degree: 1,
                                inversion: '/F',
                                inversionDegree: 5
                            },
                            {root: 'G', quality: 'h7', degree: 6, degreeShift: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ch7 F7b9',
                        harmony: [
                            {root: 'C', quality: 'h7', degree: 2},
                            {root: 'F', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7 Bb-7/Ab',
                        harmony: [
                            {root: 'B', shift: 'b', quality: '-7', degree: 1},
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '-7',
                                degree: 1,
                                inversion: '/Ab',
                                inversionDegree: 7
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Gh7 Gb^7',
                        harmony: [
                            {root: 'G', quality: 'h7', degree: 6, degreeShift: 1},
                            {root: 'G', shift: 'b', quality: '^7', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7/F Gh7',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '-7',
                                degree: 1,
                                inversion: '/F',
                                inversionDegree: 5
                            },
                            {root: 'G', quality: 'h7', degree: 6, degreeShift: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ch F7 Bb-7',
                        harmony: [
                            {root: 'C', quality: 'h', degree: 2},
                            {root: 'F', quality: '7', degree: 5},
                            {root: 'B', shift: 'b', quality: '-7', degree: 1}
                        ],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('handles Black Narcissus with bb2', () => {
        const props = {
            title: 'Black Narcissus',
            author: 'Joe Henderson',
            style: 'Waltz',
            key: 'G#-',
            chordString: '[T34Ab-7 |Bb-7/Ab |Ab-7 |Bb-7/Ab |Ab-7 |Bb-7/Ab |Ab-7 |Cb^7#11 ][F#-7 |G#-7/F# |F#-7 |G#-7/F# |F#-7 |G#-7/F# |F#-7 |A^7#11/F# ][Eb^7#11 |F^7#11 |Bb^7#11 |C^7#11 |Eb^7#11 |F^7#11 Bb^7#11|G^7#11 Ab^7#11|Bb^ C^7#11 Z'
        } as IIRealProChartModelProps;
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Black Narcissus');
        expect(model.errors).toEqual([]);

        expect(model.key).toBe('G#-');
        expect(model.tuneKeyRootBase).toBe('G');
        expect(model.tuneKeyRelativeToCShift).toBe(4);
        expect(model.tuneKeyIntervalRelativeToC).toBe(20);
        expect(model.tuneAdjective).toBe('minor');

        expect(model.segments).toEqual([
            {
                name: '',
                data: [
                    {
                        timeSignature: '3 / 4',
                        open: '[',
                        chords: 'Ab-7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                degree: 2,
                                degreeShift: -2
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7/Ab',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '-7',
                                degree: 3,
                                degreeShift: -1,
                                inversion: '/Ab',
                                inversionDegree: 2,
                                inversionDegreeShift: -2
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                degree: 2,
                                degreeShift: -2
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7/Ab',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '-7',
                                degree: 3,
                                degreeShift: -1,
                                inversion: '/Ab',
                                inversionDegree: 2,
                                inversionDegreeShift: -2
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                degree: 2,
                                degreeShift: -2
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb-7/Ab',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '-7',
                                degree: 3,
                                degreeShift: -1,
                                inversion: '/Ab',
                                inversionDegree: 2,
                                inversionDegreeShift: -2
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Ab-7',
                        harmony: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                degree: 2,
                                degreeShift: -2
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Cb^7#11',
                        harmony: [
                            {
                                root: 'C',
                                shift: 'b',
                                quality: '^7#11',
                                degree: 4,
                                degreeShift: -2
                            }
                        ],
                        close: ']'
                    },
                    {
                        open: '[',
                        chords: 'F#-7',
                        harmony: [{root: 'F', shift: '#', quality: '-7', degree: 7}]
                    },
                    {
                        open: '|',
                        chords: 'G#-7/F#',
                        harmony: [
                            {
                                root: 'G',
                                shift: '#',
                                quality: '-7',
                                degree: 1,
                                inversion: '/F#',
                                inversionDegree: 7
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F#-7',
                        harmony: [{root: 'F', shift: '#', quality: '-7', degree: 7}]
                    },
                    {
                        open: '|',
                        chords: 'G#-7/F#',
                        harmony: [
                            {
                                root: 'G',
                                shift: '#',
                                quality: '-7',
                                degree: 1,
                                inversion: '/F#',
                                inversionDegree: 7
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F#-7',
                        harmony: [{root: 'F', shift: '#', quality: '-7', degree: 7}]
                    },
                    {
                        open: '|',
                        chords: 'G#-7/F#',
                        harmony: [
                            {
                                root: 'G',
                                shift: '#',
                                quality: '-7',
                                degree: 1,
                                inversion: '/F#',
                                inversionDegree: 7
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F#-7',
                        harmony: [{root: 'F', shift: '#', quality: '-7', degree: 7}]
                    },
                    {
                        open: '|',
                        chords: 'A^7#11/F#',
                        harmony: [
                            {
                                root: 'A',
                                quality: '^7#11',
                                degree: 2,
                                degreeShift: -1,
                                inversion: '/F#',
                                inversionDegree: 7
                            }
                        ],
                        close: ']'
                    },
                    {
                        open: '[',
                        chords: 'Eb^7#11',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '^7#11',
                                degree: 6,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^7#11',
                        harmony: [{root: 'F', quality: '^7#11', degree: 7, degreeShift: -1}]
                    },
                    {
                        open: '|',
                        chords: 'Bb^7#11',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '^7#11',
                                degree: 3,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C^7#11',
                        harmony: [{root: 'C', quality: '^7#11', degree: 4, degreeShift: -1}]
                    },
                    {
                        open: '|',
                        chords: 'Eb^7#11',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '^7#11',
                                degree: 6,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F^7#11 Bb^7#11',
                        harmony: [
                            {root: 'F', quality: '^7#11', degree: 7, degreeShift: -1},
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '^7#11',
                                degree: 3,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G^7#11 Ab^7#11',
                        harmony: [
                            {root: 'G', quality: '^7#11', degree: 1, degreeShift: -1},
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '^7#11',
                                degree: 2,
                                degreeShift: -2
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Bb^ C^7#11',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '^',
                                degree: 3,
                                degreeShift: -1
                            },
                            {root: 'C', quality: '^7#11', degree: 4, degreeShift: -1}
                        ],
                        close: 'Z'
                    }
                ]
            }
        ]);
    });
    it('handles A Felicidade with alt chords', () => {
        const props = {
            title: 'A Felicidade',
            author: 'Antonio-Carlos Jobim',
            style: 'Bossa Nova',
            key: 'A-',
            chordString: '*A{T44A-7(C^7) |x |C^7 |x |E-7 |B7b9 |E-7 A7|D-7 G7 }*B[C^7 |x |Bh7 |E7b9 |A-7 |x (Ab-7)|G-7 |C7 |F^7 |D-7 |A-7 |D7 |A-7 |Bh7 E7b9|A-7 |G7 ]*C[C^7|F7|C^7|x|G-7|C7|F^7|x|D-7|G7|C^7|x|F#h7|B7b9|E-7 A7 |D-7 G7 ]*D[ A-7 |A-7/G |D7/F# |D-7/F |A-7 |Bh7 E7b9|A-7 |x Z'
        } as IIRealProChartModelProps;
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('A Felicidade');
        expect(model.errors).toEqual([]);

        expect(model.key).toBe('A-');
        expect(model.tuneKeyRootBase).toBe('A');
        expect(model.tuneKeyRelativeToCShift).toBe(5);
        expect(model.tuneKeyIntervalRelativeToC).toBe(9);
        expect(model.tuneAdjective).toBe('minor');

        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '{',
                        chords: 'A-7(C^7)',
                        harmony: [{root: 'A', quality: '-7', degree: 1}],
                        alt: [{root: 'C', quality: '^7', degree: 3}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'C^7',
                        harmony: [{root: 'C', quality: '^7', degree: 3}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'E-7',
                        harmony: [{root: 'E', quality: '-7', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'B7b9',
                        harmony: [{root: 'B', quality: '7b9', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'E-7 A7',
                        harmony: [
                            {root: 'E', quality: '-7', degree: 5},
                            {root: 'A', quality: '7', degree: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-7 G7',
                        harmony: [
                            {root: 'D', quality: '-7', degree: 4},
                            {root: 'G', quality: '7', degree: 7}
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
                        chords: 'C^7',
                        harmony: [{root: 'C', quality: '^7', degree: 3}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'Bh7',
                        harmony: [{root: 'B', quality: 'h7', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'E7b9',
                        harmony: [{root: 'E', quality: '7b9', degree: 5}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'x (Ab-7)',
                        harmony: [{root: 'x'}],
                        alt: [
                            {
                                root: 'A',
                                shift: 'b',
                                quality: '-7',
                                degree: 1,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', degree: 7}]
                    },
                    {
                        open: '|',
                        chords: 'C7',
                        harmony: [{root: 'C', quality: '7', degree: 3}]
                    },
                    {
                        open: '|',
                        chords: 'F^7',
                        harmony: [{root: 'F', quality: '^7', degree: 6}]
                    },
                    {
                        open: '|',
                        chords: 'D-7',
                        harmony: [{root: 'D', quality: '-7', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'D7',
                        harmony: [{root: 'D', quality: '7', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bh7 E7b9',
                        harmony: [
                            {root: 'B', quality: 'h7', degree: 2},
                            {root: 'E', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'G7',
                        harmony: [{root: 'G', quality: '7', degree: 7}],
                        close: ']'
                    }
                ]
            },
            {
                name: 'C',
                data: [
                    {
                        open: '[',
                        chords: 'C^7',
                        harmony: [{root: 'C', quality: '^7', degree: 3}]
                    },
                    {
                        open: '|',
                        chords: 'F7',
                        harmony: [{root: 'F', quality: '7', degree: 6}]
                    },
                    {
                        open: '|',
                        chords: 'C^7',
                        harmony: [{root: 'C', quality: '^7', degree: 3}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'G-7',
                        harmony: [{root: 'G', quality: '-7', degree: 7}]
                    },
                    {
                        open: '|',
                        chords: 'C7',
                        harmony: [{root: 'C', quality: '7', degree: 3}]
                    },
                    {
                        open: '|',
                        chords: 'F^7',
                        harmony: [{root: 'F', quality: '^7', degree: 6}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'D-7',
                        harmony: [{root: 'D', quality: '-7', degree: 4}]
                    },
                    {
                        open: '|',
                        chords: 'G7',
                        harmony: [{root: 'G', quality: '7', degree: 7}]
                    },
                    {
                        open: '|',
                        chords: 'C^7',
                        harmony: [{root: 'C', quality: '^7', degree: 3}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'F#h7',
                        harmony: [
                            {
                                root: 'F',
                                shift: '#',
                                quality: 'h7',
                                degree: 6,
                                degreeShift: 1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'B7b9',
                        harmony: [{root: 'B', quality: '7b9', degree: 2}]
                    },
                    {
                        open: '|',
                        chords: 'E-7 A7',
                        harmony: [
                            {root: 'E', quality: '-7', degree: 5},
                            {root: 'A', quality: '7', degree: 1}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-7 G7',
                        harmony: [
                            {root: 'D', quality: '-7', degree: 4},
                            {root: 'G', quality: '7', degree: 7}
                        ],
                        close: ']'
                    }
                ]
            },
            {
                name: 'D',
                data: [
                    {
                        open: '[',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'A-7/G',
                        harmony: [
                            {
                                root: 'A',
                                quality: '-7',
                                degree: 1,
                                inversion: '/G',
                                inversionDegree: 7
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D7/F#',
                        harmony: [
                            {
                                root: 'D',
                                quality: '7',
                                degree: 4,
                                inversion: '/F#',
                                inversionDegree: 6,
                                inversionDegreeShift: 1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D-7/F',
                        harmony: [
                            {
                                root: 'D',
                                quality: '-7',
                                degree: 4,
                                inversion: '/F',
                                inversionDegree: 6
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 1}]
                    },
                    {
                        open: '|',
                        chords: 'Bh7 E7b9',
                        harmony: [
                            {root: 'B', quality: 'h7', degree: 2},
                            {root: 'E', quality: '7b9', degree: 5}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A-7',
                        harmony: [{root: 'A', quality: '-7', degree: 1}]
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
    it('handles Affirmation - alt.version with bb2', () => {
        const props = {
            title: 'Affirmation - alt.version',
            author: 'Jose Feliciano',
            style: 'Medium Funk',
            key: 'D',
            chordString: '*A{T44 E-9(G^9/E) |x |B-7(A6/B) (B-7)|(A6/B) x (B-7)|E-9(G^9/E) |x |B-7(A6/B) (B-7)|(A6/B) x (B-7)Q|B-7(A6/B) (B-7)|A-7 D7|N1G^9 (G69) |x |E9(Dadd9/E) (C#-/E) (D69/E)|(Dadd9/E) x (C#-/E) (D69/E)|A9sus(Gadd9/A) |x }|N2G^9 (G69/E) |C9 |F#-7(Dadd9/F#) |F9(F13) |E-9(G^9/E) |Eb9(Eb9#11) |D^7(D^13) |x ]*B[Bb^7(Bb^9) |x |x |x ]|Bb^7(Bb^9) |x |A9sus(Gadd9/A) |x ]{QB-7 |x | x |x }'
        } as IIRealProChartModelProps;
        const model = new IRealProChartModel(props);

        expect(model.title).toBe('Affirmation - alt.version');
        expect(model.errors).toEqual([]);

        expect(model.key).toBe('D');
        expect(model.tuneKeyRootBase).toBe('D');
        expect(model.tuneKeyRelativeToCShift).toBe(1);
        expect(model.tuneKeyIntervalRelativeToC).toBe(2);
        expect(model.tuneAdjective).toBe('major');

        expect(model.segments).toEqual([
            {
                name: 'A',
                data: [
                    {
                        timeSignature: '4 / 4',
                        open: '{',
                        chords: 'E-9(G^9/E)',
                        harmony: [{root: 'E', quality: '-9', degree: 2}],
                        alt: [
                            {
                                root: 'G',
                                quality: '^9',
                                degree: 4,
                                inversion: '/E',
                                inversionDegree: 2
                            }
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'B-7(A6/B) (B-7)',
                        harmony: [{root: 'B', quality: '-7', degree: 6}],
                        alt: [
                            {
                                root: 'A',
                                quality: '6',
                                degree: 5,
                                inversion: '/B',
                                inversionDegree: 6
                            },
                            {root: 'B', quality: '-7', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: '(A6/B) x (B-7)',
                        harmony: [{root: 'x'}],
                        alt: [
                            {
                                root: 'A',
                                quality: '6',
                                degree: 5,
                                inversion: '/B',
                                inversionDegree: 6
                            },
                            {root: 'B', quality: '-7', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'E-9(G^9/E)',
                        harmony: [{root: 'E', quality: '-9', degree: 2}],
                        alt: [
                            {
                                root: 'G',
                                quality: '^9',
                                degree: 4,
                                inversion: '/E',
                                inversionDegree: 2
                            }
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'B-7(A6/B) (B-7)',
                        harmony: [{root: 'B', quality: '-7', degree: 6}],
                        alt: [
                            {
                                root: 'A',
                                quality: '6',
                                degree: 5,
                                inversion: '/B',
                                inversionDegree: 6
                            },
                            {root: 'B', quality: '-7', degree: 6}
                        ]
                    },
                    {
                        coda: true,
                        open: '|',
                        chords: '(A6/B) x (B-7)',
                        harmony: [{root: 'x'}],
                        alt: [
                            {
                                root: 'A',
                                quality: '6',
                                degree: 5,
                                inversion: '/B',
                                inversionDegree: 6
                            },
                            {root: 'B', quality: '-7', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'B-7(A6/B) (B-7)',
                        harmony: [{root: 'B', quality: '-7', degree: 6}],
                        alt: [
                            {
                                root: 'A',
                                quality: '6',
                                degree: 5,
                                inversion: '/B',
                                inversionDegree: 6
                            },
                            {root: 'B', quality: '-7', degree: 6}
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A-7 D7',
                        harmony: [
                            {root: 'A', quality: '-7', degree: 5},
                            {root: 'D', quality: '7', degree: 1}
                        ]
                    },
                    {
                        ending: 'N1',
                        open: '|',
                        chords: 'G^9 (G69)',
                        harmony: [{root: 'G', quality: '^9', degree: 4}],
                        alt: [{root: 'G', quality: '69', degree: 4}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'E9(Dadd9/E) (C#-/E) (D69/E)',
                        harmony: [{root: 'E', quality: '9', degree: 2}],
                        alt: [
                            {
                                root: 'D',
                                quality: 'add9',
                                degree: 1,
                                inversion: '/E',
                                inversionDegree: 2
                            },
                            {
                                root: 'C',
                                shift: '#',
                                quality: '-',
                                degree: 7,
                                inversion: '/E',
                                inversionDegree: 2
                            },
                            {
                                root: 'D',
                                quality: '69',
                                degree: 1,
                                inversion: '/E',
                                inversionDegree: 2
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: '(Dadd9/E) x (C#-/E) (D69/E)',
                        harmony: [{root: 'x'}],
                        alt: [
                            {
                                root: 'D',
                                quality: 'add9',
                                degree: 1,
                                inversion: '/E',
                                inversionDegree: 2
                            },
                            {
                                root: 'C',
                                shift: '#',
                                quality: '-',
                                degree: 7,
                                inversion: '/E',
                                inversionDegree: 2
                            },
                            {
                                root: 'D',
                                quality: '69',
                                degree: 1,
                                inversion: '/E',
                                inversionDegree: 2
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'A9sus(Gadd9/A)',
                        harmony: [{root: 'A', quality: '9sus', degree: 5}],
                        alt: [
                            {
                                root: 'G',
                                quality: 'add9',
                                degree: 4,
                                inversion: '/A',
                                inversionDegree: 5
                            }
                        ]
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
                        chords: 'G^9 (G69/E)',
                        harmony: [{root: 'G', quality: '^9', degree: 4}],
                        alt: [
                            {
                                root: 'G',
                                quality: '69',
                                degree: 4,
                                inversion: '/E',
                                inversionDegree: 2
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'C9',
                        harmony: [{root: 'C', quality: '9', degree: 7, degreeShift: -1}]
                    },
                    {
                        open: '|',
                        chords: 'F#-7(Dadd9/F#)',
                        harmony: [{root: 'F', shift: '#', quality: '-7', degree: 3}],
                        alt: [
                            {
                                root: 'D',
                                quality: 'add9',
                                degree: 1,
                                inversion: '/F#',
                                inversionDegree: 3
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'F9(F13)',
                        harmony: [{root: 'F', quality: '9', degree: 3, degreeShift: -1}],
                        alt: [{root: 'F', quality: '13', degree: 3, degreeShift: -1}]
                    },
                    {
                        open: '|',
                        chords: 'E-9(G^9/E)',
                        harmony: [{root: 'E', quality: '-9', degree: 2}],
                        alt: [
                            {
                                root: 'G',
                                quality: '^9',
                                degree: 4,
                                inversion: '/E',
                                inversionDegree: 2
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'Eb9(Eb9#11)',
                        harmony: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '9',
                                degree: 2,
                                degreeShift: -1
                            }
                        ],
                        alt: [
                            {
                                root: 'E',
                                shift: 'b',
                                quality: '9#11',
                                degree: 2,
                                degreeShift: -1
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'D^7(D^13)',
                        harmony: [{root: 'D', quality: '^7', degree: 1}],
                        alt: [{root: 'D', quality: '^13', degree: 1}]
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
                        chords: 'Bb^7(Bb^9)',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '^7',
                                degree: 6,
                                degreeShift: -1
                            }
                        ],
                        alt: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '^9',
                                degree: 6,
                                degreeShift: -1
                            }
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: ']'
                    },
                    {
                        open: '|',
                        chords: 'Bb^7(Bb^9)',
                        harmony: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '^7',
                                degree: 6,
                                degreeShift: -1
                            }
                        ],
                        alt: [
                            {
                                root: 'B',
                                shift: 'b',
                                quality: '^9',
                                degree: 6,
                                degreeShift: -1
                            }
                        ]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {
                        open: '|',
                        chords: 'A9sus(Gadd9/A)',
                        harmony: [{root: 'A', quality: '9sus', degree: 5}],
                        alt: [
                            {
                                root: 'G',
                                quality: 'add9',
                                degree: 4,
                                inversion: '/A',
                                inversionDegree: 5
                            }
                        ]
                    },
                    {
                        open: '|',
                        chords: 'x',
                        harmony: [{root: 'x'}],
                        close: ']'
                    },
                    {
                        coda: true,
                        open: '{',
                        chords: 'B-7',
                        harmony: [{root: 'B', quality: '-7', degree: 6}]
                    },
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                    {open: '|', chords: 'x', harmony: [{root: 'x'}]},
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

    it.skip('// TODO Alvarà Jorge Aragão errored', () => {
    });
    it.skip('// TODO should properly recognize and handle chords inside double repeat bars', () => {
    });

    describe('parseSegment', () => {
        beforeEach(() => setDefaultIRealProChartModelPrototype());
        afterEach(() => restoreIRealProChartModelPrototype());

        it('should handle multiple repeats (r)', () => {
            const segmentString = '[T44C6 |x |r|r|r|]';

            expect(IRealProChartModel.prototype.parseSegment(segmentString)).toEqual([
                {
                    timeSignature: '4 / 4',
                    open: '[',
                    chords: 'C6',
                    harmony: [{root: 'C', quality: '6', degree: 1}]
                },
                {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                {
                    open: '|',
                    chords: 'C6',
                    harmony: [{root: 'C', quality: '6', degree: 1}]
                },
                {open: '|', chords: 'x', harmony: [{root: 'x'}], close: '|'},
                {
                    open: '|',
                    chords: 'C6',
                    harmony: [{root: 'C', quality: '6', degree: 1}]
                },
                {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                {
                    open: '|',
                    chords: 'C6',
                    harmony: [{root: 'C', quality: '6', degree: 1}]
                },
                {open: '|', chords: 'x', harmony: [{root: 'x'}], close: ']'}
            ]);
        });
        it('should handle Y in the segment as in Another Day pop song', () => {
            const segmentString = '{T34 E- |E-7 |C^7 |C^9 |A2/C# |Y |C^7 |E- |N1E-7 }|N2E- n';

            expect(IRealProChartModel.prototype.parseSegment(segmentString)).toEqual([
                {
                    timeSignature: '3 / 4',
                    open: '{',
                    chords: 'E-',
                    harmony: [{root: 'E', quality: '-', degree: 3}]
                },
                {
                    open: '|',
                    chords: 'E-7',
                    harmony: [{root: 'E', quality: '-7', degree: 3}]
                },
                {
                    open: '|',
                    chords: 'C^7',
                    harmony: [{root: 'C', quality: '^7', degree: 1}]
                },
                {
                    open: '|',
                    chords: 'C^9',
                    harmony: [{root: 'C', quality: '^9', degree: 1}]
                },
                {
                    open: '|',
                    close: '|',
                    chords: 'A2/C#',
                    harmony: [{
                        root: 'A',
                        quality: '2',
                        inversion: '/C#',
                        degree: 6,
                        inversionDegree: 1,
                        inversionDegreeShift: 1
                    }]
                },
                {divider: 'Y'},
                {
                    open: '|',
                    chords: 'C^7',
                    harmony: [{root: 'C', quality: '^7', degree: 1}]
                },
                {
                    open: '|',
                    chords: 'E-',
                    harmony: [{root: 'E', quality: '-', degree: 3}]
                },
                {
                    ending: 'N1',
                    open: '|',
                    chords: 'E-7',
                    harmony: [{root: 'E', quality: '-7', degree: 3}],
                    close: '}'
                },
                {
                    ending: 'N2',
                    open: '|',
                    chords: 'E- n',
                    harmony: [{root: 'E', quality: '-', degree: 3}, {root: 'n'}],
                    close: ']'
                }
            ]);
        });
    });
    describe('parseHarmony', () => {
        beforeEach(() => setDefaultIRealProChartModelPrototype());
        afterEach(() => restoreIRealProChartModelPrototype());
        it('should parse add9 quality', () => {
            const harmonyString = 'Dbadd9 Ab';

            expect(IRealProChartModel.prototype.parseHarmony(harmonyString)).toEqual([
                [
                    {root: 'D', shift: 'b', quality: 'add9', degree: 2, degreeShift: -1},
                    {root: 'A', shift: 'b', degree: 6, degreeShift: -1}
                ],
                []
            ]);
        });
    });
    describe('parseBar', () => {
        beforeEach(() => setDefaultIRealProChartModelPrototype());
        afterEach(() => restoreIRealProChartModelPrototype());

        it('should handle simple bar with Alternate Chords', () => {
            const barString = '|C^7(C#-7) (F#7)';

            expect(IRealProChartModel.prototype.parseBar(barString)).toEqual({
                open: '|',
                chords: 'C^7(C#-7) (F#7)',
                harmony: [{root: 'C', quality: '^7', degree: 1}],
                alt: [
                    {root: 'C', shift: '#', quality: '-7', degree: 1, degreeShift: 1},
                    {root: 'F', shift: '#', quality: '7', degree: 4, degreeShift: 1}
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
                    {root: 'C', degree: 1},
                    {root: 'C', inversion: '/E', degree: 1, inversionDegree: 3}
                ]
            });
        });
    });
    describe('fillChord', () => {
        afterEach(() => restoreIRealProChartModelPrototype());
        it('should throw on C^ if tune key is not set', () => {
            expect(() => {
                IRealProChartModel.prototype.fillChord([null, 'C', '', '^'] as RegExpMatchArray);
            }).toThrowError();
        });
        it('should handle C^, Bb, Bb/Ab in C', () => {
            IRealProChartModel.prototype.key = 'C';
            IRealProChartModel.prototype.tuneKeyRootBase = 'C';
            IRealProChartModel.prototype.tuneKeyRelativeToCShift = 0;
            IRealProChartModel.prototype.tuneKeyIntervalRelativeToC = 0;
            IRealProChartModel.prototype.tuneAdjective = 'major';
            expect(IRealProChartModel.prototype.fillChord([null, 'C', '', '^'] as RegExpMatchArray)).toEqual({
                degree: 1,
                root: 'C',
                quality: '^'
            });
            expect(IRealProChartModel.prototype.fillChord([null, 'B', 'b', ''] as RegExpMatchArray)).toEqual({
                degree: 7,
                degreeShift: -1,
                root: 'B',
                shift: 'b'
            });
            expect(IRealProChartModel.prototype.fillChord([null, 'B', 'b', '', '/Ab'] as RegExpMatchArray)).toEqual({
                degree: 7,
                degreeShift: -1,
                root: 'B',
                shift: 'b',
                inversion: '/Ab',
                inversionDegree: 6,
                inversionDegreeShift: -1
            });
        });
        it('should handle C7 in D-', () => {
            IRealProChartModel.prototype.key = 'D-';
            IRealProChartModel.prototype.tuneKeyRootBase = 'D';
            IRealProChartModel.prototype.tuneKeyRelativeToCShift = 1;
            IRealProChartModel.prototype.tuneKeyIntervalRelativeToC = 2;
            IRealProChartModel.prototype.tuneAdjective = 'minor';
            expect(IRealProChartModel.prototype.fillChord([null, 'C', '', '7'] as RegExpMatchArray)).toEqual({
                degree: 7,
                root: 'C',
                quality: '7'
            });
        });
        it('should handle C7 in D', () => {
            IRealProChartModel.prototype.key = 'D';
            IRealProChartModel.prototype.tuneKeyRootBase = 'D';
            IRealProChartModel.prototype.tuneKeyRelativeToCShift = 1;
            IRealProChartModel.prototype.tuneKeyIntervalRelativeToC = 2;
            IRealProChartModel.prototype.tuneAdjective = 'major';
            expect(IRealProChartModel.prototype.fillChord([null, 'C', '', '7'] as RegExpMatchArray)).toEqual({
                degree: 7,
                degreeShift: -1,
                root: 'C',
                quality: '7'
            });
        });
        it('should handle Db in Bb', () => {
            IRealProChartModel.prototype.key = 'Bb';
            IRealProChartModel.prototype.tuneKeyRootBase = 'B';
            IRealProChartModel.prototype.tuneKeyRelativeToCShift = 6;
            IRealProChartModel.prototype.tuneKeyIntervalRelativeToC = 10;
            IRealProChartModel.prototype.tuneAdjective = 'major';
            expect(IRealProChartModel.prototype.fillChord([null, 'D', 'b', ''] as RegExpMatchArray)).toEqual({
                degree: 3,
                degreeShift: -1,
                root: 'D',
                shift: 'b'
            });
        });
        it('should handle Gb, G, Db in Bb-', () => {
            IRealProChartModel.prototype.key = 'Bb-';
            IRealProChartModel.prototype.tuneKeyRootBase = 'B';
            IRealProChartModel.prototype.tuneKeyRelativeToCShift = 6;
            IRealProChartModel.prototype.tuneKeyIntervalRelativeToC = 10;
            IRealProChartModel.prototype.tuneAdjective = 'minor';
            expect(IRealProChartModel.prototype.fillChord([null, 'G', 'b', ''] as RegExpMatchArray)).toEqual({
                degree: 6,
                root: 'G',
                shift: 'b'
            });
            expect(IRealProChartModel.prototype.fillChord([null, 'G', '', ''] as RegExpMatchArray)).toEqual({
                degree: 6,
                degreeShift: 1,
                root: 'G'
            });
            expect(IRealProChartModel.prototype.fillChord([null, 'D', 'b', ''] as RegExpMatchArray)).toEqual({
                degree: 3,
                root: 'D',
                shift: 'b'
            });
        });
        it('should handle B, C#h, A, A#, F, E, E#, B#, B#/Gb in F#', () => {
            IRealProChartModel.prototype.key = 'F#';
            IRealProChartModel.prototype.tuneKeyRootBase = 'F';
            IRealProChartModel.prototype.tuneKeyRelativeToCShift = 3;
            IRealProChartModel.prototype.tuneKeyIntervalRelativeToC = 18;
            IRealProChartModel.prototype.tuneAdjective = 'major';
            expect(IRealProChartModel.prototype.fillChord([null, 'B', '', ''] as RegExpMatchArray)).toEqual({
                degree: 4,
                root: 'B'
            });
            expect(IRealProChartModel.prototype.fillChord([null, 'C', '#', 'h'] as RegExpMatchArray)).toEqual({
                degree: 5,
                root: 'C',
                shift: '#',
                quality: 'h'
            });
            expect(IRealProChartModel.prototype.fillChord([null, 'A', '', ''] as RegExpMatchArray)).toEqual({
                degree: 3,
                degreeShift: -1,
                root: 'A'
            });
            expect(IRealProChartModel.prototype.fillChord([null, 'A', '#', ''] as RegExpMatchArray)).toEqual({
                degree: 3,
                root: 'A',
                shift: '#'
            });
            expect(IRealProChartModel.prototype.fillChord([null, 'F', '', ''] as RegExpMatchArray)).toEqual({
                degree: 1,
                degreeShift: -1,
                root: 'F'
            });
            expect(IRealProChartModel.prototype.fillChord([null, 'E', '', ''] as RegExpMatchArray)).toEqual({
                degree: 7,
                degreeShift: -1,
                root: 'E'
            });
            expect(IRealProChartModel.prototype.fillChord([null, 'E', '#', ''] as RegExpMatchArray)).toEqual({
                degree: 7,
                root: 'E',
                shift: '#'
            });
            expect(IRealProChartModel.prototype.fillChord([null, 'B', '#', ''] as RegExpMatchArray)).toEqual({
                degree: 4,
                degreeShift: 1,
                root: 'B',
                shift: '#'
            });
            expect(IRealProChartModel.prototype.fillChord([null, 'B', '#', '', '/Gb'] as RegExpMatchArray)).toEqual({
                root: 'B',
                shift: '#',
                inversion: '/Gb',
                degree: 4,
                degreeShift: 1,
                inversionDegree: 2,
                inversionDegreeShift: -2
            });
        });
        it('should handle A, A#, F, E, E#, B# in F#-', () => {
            IRealProChartModel.prototype.key = 'F#';
            IRealProChartModel.prototype.tuneKeyRootBase = 'F';
            IRealProChartModel.prototype.tuneKeyRelativeToCShift = 3;
            IRealProChartModel.prototype.tuneKeyIntervalRelativeToC = 18;
            IRealProChartModel.prototype.tuneAdjective = 'minor';
            expect(IRealProChartModel.prototype.fillChord([null, 'A', '', ''] as RegExpMatchArray)).toEqual({
                degree: 3,
                root: 'A'
            });
            expect(IRealProChartModel.prototype.fillChord([null, 'A', '#', ''] as RegExpMatchArray)).toEqual({
                degree: 3,
                degreeShift: 1,
                root: 'A',
                shift: '#'
            });
            expect(IRealProChartModel.prototype.fillChord([null, 'F', '', ''] as RegExpMatchArray)).toEqual({
                degree: 1,
                degreeShift: -1,
                root: 'F'
            });
            expect(IRealProChartModel.prototype.fillChord([null, 'E', '', ''] as RegExpMatchArray)).toEqual({
                degree: 7,
                root: 'E'
            });
            expect(IRealProChartModel.prototype.fillChord([null, 'E', '#', ''] as RegExpMatchArray)).toEqual({
                degree: 7,
                degreeShift: 1,
                root: 'E',
                shift: '#'
            });
            expect(IRealProChartModel.prototype.fillChord([null, 'B', '#', ''] as RegExpMatchArray)).toEqual({
                degree: 4,
                degreeShift: 1,
                root: 'B',
                shift: '#'
            });
            expect(IRealProChartModel.prototype.fillChord([null, 'B', 'b', ''] as RegExpMatchArray)).toEqual({
                degree: 4,
                degreeShift: -1,
                root: 'B',
                shift: 'b'
            });
        });
        it('should handle chord with inversion E-/C# in G', () => {
            IRealProChartModel.prototype.key = 'G';
            IRealProChartModel.prototype.tuneKeyRootBase = 'G';
            IRealProChartModel.prototype.tuneKeyRelativeToCShift = 4;
            IRealProChartModel.prototype.tuneKeyIntervalRelativeToC = 7;
            IRealProChartModel.prototype.tuneAdjective = 'major';
            expect(IRealProChartModel.prototype.fillChord([null, 'E', '', '-', '/C#'] as RegExpMatchArray)).toEqual({
                root: 'E',
                quality: '-',
                degree: 6,
                inversion: '/C#',
                inversionDegree: 4,
                inversionDegreeShift: 1
            });
        });
        it('should handle chord with inversion Cb^7#11 in G#-', () => {
            IRealProChartModel.prototype.key = 'G#-';
            IRealProChartModel.prototype.tuneKeyRootBase = 'G';
            IRealProChartModel.prototype.tuneKeyRelativeToCShift = 4;
            IRealProChartModel.prototype.tuneKeyIntervalRelativeToC = 20;
            IRealProChartModel.prototype.tuneAdjective = 'minor';
            expect(IRealProChartModel.prototype.fillChord([null, 'C', 'b', '^7#11'] as RegExpMatchArray)).toEqual({
                root: 'C',
                shift: 'b',
                quality: '^7#11',
                degree: 4,
                degreeShift: -2
            });
        });
    });

    describe('changeTuneAdjective', () => {
        it('should update chord degrees if adjective set to major for minor tune. Berklee style', () => {
            const props = {
                title: '500 Miles High',
                author: 'Corea Chick',
                style: 'Bossa Nova',
                key: 'E-',
                chordString: '[T44E-7 |x |G-7 |x |Bb^7 |x |Bh7 |E7#9 |A-7 |x |F#h7 |x |F-7 |x Q|C-7 |x |B7#9 |x Z Y{QC-7 |x |Ab^7 |x }'
            };
            const model = new IRealProChartModel(props);
            const harmonyRelativeToMinor = [
                {
                    name: '',
                    data: [
                        {
                            timeSignature: '4 / 4',
                            open: '[',
                            chords: 'E-7',
                            harmony: [{root: 'E', quality: '-7', degree: 1}]
                        },
                        {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                        {
                            open: '|',
                            chords: 'G-7',
                            harmony: [{root: 'G', quality: '-7', degree: 3}]
                        },
                        {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                        {
                            open: '|',
                            chords: 'Bb^7',
                            harmony: [
                                {
                                    root: 'B',
                                    shift: 'b',
                                    quality: '^7',
                                    degree: 5,
                                    degreeShift: -1
                                }
                            ]
                        },
                        {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                        {
                            open: '|',
                            chords: 'Bh7',
                            harmony: [{root: 'B', quality: 'h7', degree: 5}]
                        },
                        {
                            open: '|',
                            chords: 'E7#9',
                            harmony: [{root: 'E', quality: '7#9', degree: 1}]
                        },
                        {
                            open: '|',
                            chords: 'A-7',
                            harmony: [{root: 'A', quality: '-7', degree: 4}]
                        },
                        {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                        {
                            open: '|',
                            chords: 'F#h7',
                            harmony: [{root: 'F', shift: '#', quality: 'h7', degree: 2}]
                        },
                        {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                        {
                            open: '|',
                            chords: 'F-7',
                            harmony: [{root: 'F', quality: '-7', degree: 2, degreeShift: -1}]
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
                            harmony: [{root: 'C', quality: '-7', degree: 6}]
                        },
                        {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                        {
                            open: '|',
                            chords: 'B7#9',
                            harmony: [{root: 'B', quality: '7#9', degree: 5}]
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
                            harmony: [{root: 'C', quality: '-7', degree: 6}]
                        },
                        {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                        {
                            open: '|',
                            chords: 'Ab^7',
                            harmony: [
                                {
                                    root: 'A',
                                    shift: 'b',
                                    quality: '^7',
                                    degree: 4,
                                    degreeShift: -1
                                }
                            ]
                        },
                        {
                            open: '|',
                            chords: 'x',
                            harmony: [{root: 'x'}],
                            close: '}'
                        }
                    ]
                }
            ];
            const harmonyRelativeToMajor = [
                {
                    name: '',
                    data: [
                        {
                            timeSignature: '4 / 4',
                            open: '[',
                            chords: 'E-7',
                            harmony: [{root: 'E', quality: '-7', degree: 1}]
                        },
                        {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                        {
                            open: '|',
                            chords: 'G-7',
                            harmony: [{root: 'G', quality: '-7', degree: 3, degreeShift: -1}]
                        },
                        {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                        {
                            open: '|',
                            chords: 'Bb^7',
                            harmony: [
                                {
                                    root: 'B',
                                    shift: 'b',
                                    quality: '^7',
                                    degree: 5,
                                    degreeShift: -1
                                }
                            ]
                        },
                        {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                        {
                            open: '|',
                            chords: 'Bh7',
                            harmony: [{root: 'B', quality: 'h7', degree: 5}]
                        },
                        {
                            open: '|',
                            chords: 'E7#9',
                            harmony: [{root: 'E', quality: '7#9', degree: 1}]
                        },
                        {
                            open: '|',
                            chords: 'A-7',
                            harmony: [{root: 'A', quality: '-7', degree: 4}]
                        },
                        {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                        {
                            open: '|',
                            chords: 'F#h7',
                            harmony: [{root: 'F', shift: '#', quality: 'h7', degree: 2}]
                        },
                        {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                        {
                            open: '|',
                            chords: 'F-7',
                            harmony: [{root: 'F', quality: '-7', degree: 2, degreeShift: -1}]
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
                            harmony: [{root: 'C', quality: '-7', degree: 6, degreeShift: -1}]
                        },
                        {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                        {
                            open: '|',
                            chords: 'B7#9',
                            harmony: [{root: 'B', quality: '7#9', degree: 5}]
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
                            harmony: [{root: 'C', quality: '-7', degree: 6, degreeShift: -1}]
                        },
                        {open: '|', chords: 'x', harmony: [{root: 'x'}]},
                        {
                            open: '|',
                            chords: 'Ab^7',
                            harmony: [
                                {
                                    root: 'A',
                                    shift: 'b',
                                    quality: '^7',
                                    degree: 4,
                                    degreeShift: -1
                                }
                            ]
                        },
                        {
                            open: '|',
                            chords: 'x',
                            harmony: [{root: 'x'}],
                            close: '}'
                        }
                    ]
                }
            ];

            expect(model.title).toBe('500 Miles High');
            expect(model.errors).toEqual([]);
            expect(model.author).toBe('Corea Chick');
            expect(model.style).toBe('Bossa Nova');

            expect(model.key).toBe('E-');
            expect(model.tuneKeyRootBase).toBe('E');
            expect(model.tuneKeyRelativeToCShift).toBe(2);
            expect(model.tuneKeyIntervalRelativeToC).toBe(4);
            expect(model.tuneAdjective).toBe('minor');

            expect(model.chordString.length).toBe(104);
            expect(model.segments).toEqual(harmonyRelativeToMinor);

            model.changeTuneAdjective('major');
            expect(model.tuneAdjective).toBe('major');

            expect(model.segments).toEqual(harmonyRelativeToMajor);

            model.changeTuneAdjective(null);
            expect(model.tuneAdjective).toBe('minor');

            expect(model.segments).toEqual(harmonyRelativeToMinor);
        });
    });
});
