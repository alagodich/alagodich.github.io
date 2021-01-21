import jazzRawData from '../../../client/components/real-book/playlists/jazz';
import IRealProUrlParser from '../../../client/components/real-book/IRealProUrlParser';
import IRealProChartModel from '../../../client/components/real-book/IRealProChartModel';
import {IIRealProChord} from '../../../client/components/real-book/types';

interface ISongHarmony {
    title: string;
    key: string;
    progression: IIRealProChord[][];
}

export function prepareData(): ISongHarmony[] {
    const parser = new IRealProUrlParser();
    const harmonies: any = [];

    jazzRawData.forEach(urlString => {
        const songs = parser.parse(urlString);

        songs.forEach(song => {
            const chartModel = new IRealProChartModel(song);
            const harmony = {
                title: song.title,
                key: song.key,
                progression: [] as any
            };

            chartModel.segments.forEach(segment => {
                const segmentProgression: any = [];

                segment.data.forEach(row => {
                    row.harmony?.forEach(chord => {
                        if (chord.root === 'x' && segmentProgression[segmentProgression.length - 1]) {
                            segmentProgression.push(segmentProgression[segmentProgression.length - 1]);

                        } else {
                            segmentProgression.push(chord);
                        }
                    });
                });
                harmony.progression.push(segmentProgression);
            });

            harmonies.push(harmony);
        });
    });

    return harmonies;
}

// export functiom flattenData() {
//
// }

prepareData();
