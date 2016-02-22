## My personal blog

Written on [Jekyll](https://jekyllrb.com/)

Hosted on [github-pages](https://pages.github.com/)

Css framework [Semantic UI]()

Some components created with [React](https://facebook.github.io/react/)

### TODOs
* Добавить карусель для картинок
* Добавить js и dart приложения в новый раздел на сайт
* Метроном (добавить выбора размера, подключеть firebase)
* Use Flow http://flowtype.org/
* Toggle metronome by 'space' press
* Add annotations to metronome app (desktop only)
* Use build tools for semantic

### Install
* make sure you have [ruby, jekyll and bundler installed](https://help.github.com/articles/using-jekyll-with-pages/)
* `npm install`
* `bower install`
* `grunt`
* to run locally `bundle exec jekyll serve --draft`
* to watch and compile /app/ files `grunt watch`
* to start browser sync `grunt browserSync` (it will proxy localhost:4000 so 'bundle serve' and 'grunt watch' are required for this to work 


## Experiments with ember
### Workflow
* Work in `app/experiments` using ember-cli
* Execute watch task `ember server`
* App will be accessible on http://localhost:4200/  
* Livereload server on http://localhost:49152
* Don't run any other watch tasks simultaneously
### Deployment
* Stop ember-cli server
* execute `grunt deploy-ember`


https://github.com/Semantic-Org/Semantic-UI/issues/3533


