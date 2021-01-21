import {prepareData} from '../data';

describe('prepareData', () => {
    it('should correctly flatten song segments', () => {
        const preparedData = prepareData();

        expect(preparedData.length).toBe(1350);
        expect(preparedData[0].title).toBe('26-2');
        expect(preparedData[0].key).toBe('F');
        expect(preparedData[0].progression.length).toBe(4);
        expect(preparedData[0].progression[0].length).toBe(16);
        expect(preparedData[0].progression[1].length).toBe(15);
        expect(preparedData[0].progression[2].length).toBe(12);
        expect(preparedData[0].progression[3].length).toBe(15);

        expect(preparedData[0].progression).toEqual([
            [
                {root: 'F', quality: '^7', numeric: 1},
                {root: 'A', shift: 'b', quality: '7', numeric: 3},
                {root: 'D', shift: 'b', quality: '^7', numeric: 6},
                {root: 'E', quality: '7', numeric: 7},
                {root: 'A', quality: '^7', numeric: 3},
                {root: 'C', quality: '7', numeric: 5},
                {root: 'C', quality: '-7', numeric: 5},
                {root: 'F', quality: '7', numeric: 1},
                {root: 'B', shift: 'b', quality: '^7', numeric: 4},
                {root: 'D', shift: 'b', quality: '7', numeric: 6},
                {root: 'G', shift: 'b', quality: '^7', numeric: 2},
                {root: 'A', quality: '7', numeric: 3},
                {root: 'D', quality: '-7', numeric: 6},
                {root: 'G', quality: '7', numeric: 2},
                {root: 'G', quality: '-7', numeric: 2},
                {root: 'C', quality: '7', numeric: 5}
            ],
            [
                {root: 'F', quality: '^7', numeric: 1},
                {root: 'A', shift: 'b', quality: '7', numeric: 3},
                {root: 'D', shift: 'b', quality: '^7', numeric: 6},
                {root: 'E', quality: '7', numeric: 7},
                {root: 'A', quality: '^7', numeric: 3},
                {root: 'C', quality: '7', numeric: 5},
                {root: 'C', quality: '-7', numeric: 5},
                {root: 'F', quality: '7', numeric: 1},
                {root: 'B', shift: 'b', quality: '^7', numeric: 4},
                {root: 'A', shift: 'b', quality: '7', numeric: 3},
                {root: 'D', shift: 'b', quality: '^7', numeric: 6},
                {root: 'E', quality: '7', numeric: 7},
                {root: 'A', quality: '^7', numeric: 3},
                {root: 'C', quality: '7', numeric: 5},
                {root: 'F', quality: '^7', numeric: 1}
            ],
            [
                {root: 'C', quality: '-7', numeric: 5},
                {root: 'F', quality: '7', numeric: 1},
                {root: 'E', quality: '-7', numeric: 7},
                {root: 'A', quality: '7', numeric: 3},
                {root: 'D', quality: '^7', numeric: 6},
                {root: 'F', quality: '7', numeric: 1},
                {root: 'B', shift: 'b', quality: '^7', numeric: 4},
                {root: 'E', shift: 'b', quality: '-7', numeric: 7},
                {root: 'A', shift: 'b', quality: '7', numeric: 3},
                {root: 'D', shift: 'b', quality: '^7', numeric: 6},
                {root: 'G', quality: '-7', numeric: 2},
                {root: 'C', quality: '7', numeric: 5}
            ],
            [
                {root: 'F', quality: '^7', numeric: 1},
                {root: 'A', shift: 'b', quality: '7', numeric: 3},
                {root: 'D', shift: 'b', quality: '^7', numeric: 6},
                {root: 'E', quality: '7', numeric: 7},
                {root: 'A', quality: '^7', numeric: 3},
                {root: 'C', quality: '7', numeric: 5},
                {root: 'C', quality: '-7', numeric: 5},
                {root: 'F', quality: '7', numeric: 1},
                {root: 'B', shift: 'b', quality: '^7', numeric: 4},
                {root: 'A', shift: 'b', quality: '7', numeric: 3},
                {root: 'D', shift: 'b', quality: '^7', numeric: 6},
                {root: 'E', quality: '7', numeric: 7},
                {root: 'A', quality: '^7', numeric: 3},
                {root: 'C', quality: '7', numeric: 5},
                {root: 'F', quality: '^7', numeric: 1}
            ]
        ]);
    });
});
