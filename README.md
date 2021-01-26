## My personal blog

[![Build Status](https://travis-ci.org/alagodich/alagodich.github.io.svg?branch=master)](https://travis-ci.org/alagodich/alagodich.github.io)

Written on [Jekyll](https://jekyllrb.com/)

Hosted on [github-pages](https://pages.github.com/)

Css framework [Fomantic-UI](https://fomantic-ui.com/)

Some components created with [React](https://facebook.github.io/react/)

### Install
* Install [ruby, jekyll and bundler installed](https://help.github.com/articles/using-jekyll-with-pages/)
* `npm install`
* `bundle install --path vendor/bundle`
* to run locally `(cd docs bundle exec jekyll serve --draft)` or `npm start`
* to watch and compile /client/ files `npm run build` | `npm run build:watch`

### Styles
Using [semantic-ui](http://semantic-ui.com/)    
Config `semantic.json`.     
On `npm install` semantic automatically installed/updated in `./semantic` directory, `./semantic/dist/` directory is auto generated and git ignored.     
`./client/site/` contains site overrides.      
To rebuild semantic assets run `npm run fomantic`

## Ember

### Workflow
* Clone https://github.com/alagodich/ember-experiments
* Work using ember-cli
* Execute watch task `ember server`
* App will be accessible on http://localhost:4200/  
* Livereload server on http://localhost:49152
* preact was added as sub dependency by some package, have to remove it's type in post install

### Deployment
* Stop ember-cli server
* Copy dist to /experiments/

### Server side
* To run scripts `npm run node <path>`
