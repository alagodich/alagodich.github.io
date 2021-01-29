### TODO
* Split code, put react and semantic-ui-react to vendors bundle

#### Map
* Rework, try highcharts, am4 charts are too heavy

#### Real Book
* For hot module loading set module: ESNext in tsconfig, "target": "esnext", "moduleResolution": "node" https://github.com/webpack/webpack/issues/5703
* Add Keyboard shortcuts available
* Fit chart text, use either https://drafts.csswg.org/css-values/#viewport-relative-lengths or some kind of text fitter. https://stackoverflow.com/questions/16056591/font-scaling-based-on-width-of-container
* SVG chord bars Handle too many chords in bar, decrease font size, Display repeat ending top borders properly, maybe SVG entire bar
* Render W symbol as a space (Butterfly), Coda, Segno and Fermata symbols (Always And Forever)
* Encrypt song to data url for export
* Analyze chords and add option to present them as steps, build Markov Chain
* Import/Export playlists

#### csound
* Integrate with real book
* Generate csd from chord progression

#### Metronome
* @svgdotjs/svg.js manipulates DOM so in react we have to use ref which becomes deprecated

#### Fluff
* Check out Bulma https://bulma.io/
* Check out https://svelte.dev/

#### Tensor flow
* Add drawn picture recognition from svg canvas
