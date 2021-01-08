## My personal blog

Written on [Jekyll](https://jekyllrb.com/)

Hosted on [github-pages](https://pages.github.com/)

Css framework [Semantic UI]()

Some components created with [React](https://facebook.github.io/react/)

### TODOs
* Toggle metronome by 'space' press
* Get rid of Snap lib in metronome

### Install
* Install [ruby, jekyll and bundler installed](https://help.github.com/articles/using-jekyll-with-pages/)
* `npm install`
* `bundle install --path vendor/bundle`
* to run locally `bundle exec jekyll serve --draft`
* to watch and compile /app/ files `grunt watch`
* to start browser sync `grunt browserSync` (it will proxy localhost:4000 so 'bundle serve' and 'grunt watch' are required for this to work 

### Styles
Using [semantic-ui](http://semantic-ui.com/)    
Config `semantic.json`.     
On `npm install` semantic automatically installed/updated in `./semantic` directory, `./semantic/dist/` directory is auto generated and git ignored.     
`./semantic/src/` contains site overrides.      
To rebuild semantic assets run `npm run semantic-ui`

## Experiments with ember

### Workflow
* Clone https://github.com/alagodich/ember-experiments
* Work using ember-cli
* Execute watch task `ember server`
* App will be accessible on http://localhost:4200/  
* Livereload server on http://localhost:49152

### Deployment
* Stop ember-cli server
* Copy dist to /experiments/


