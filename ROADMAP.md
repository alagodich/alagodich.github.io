#### Real Book
* Litha http://localhost:3000/realbook.html#/jazz/682 has opening bar instead of closing
* Fix displaced closing bar lines http://localhost:3000/realbook.html#/latin/38
* Fix multiple ending marks Papo de Homem e Mulher - iAAB AB⊙ from Samba de Roda List, maybe dedupe them
* Pelo Telefone is a mess because of multiple endings, need to clean up url parser for it
* Add Keyboard shortcuts available
* Use media query to resize svg view box for different screen sizes 
* Calculate chords positions inside bar
* For hot module loading set module: ESNext in tsconfig, "target": "esnext", "moduleResolution": "node" https://github.com/webpack/webpack/issues/5703
* Implement Segno sign and it's marks D.S al fine, D.S al coda Dal Segno (Airmail Special)
* Encrypt song to data url for export
* Analyze chords and add option to present them as steps, build Markov Chain
* Manage playlists

#### Map
* Rework, try highcharts, am4 charts are too heavy

#### csound
* Integrate with real book
* Generate csd from chord progression

#### Metronome
* Remove @svgdotjs/svg.js, draw svg directly

#### Fluff
* Check out Bulma https://bulma.io/
* Check out https://svelte.dev/
