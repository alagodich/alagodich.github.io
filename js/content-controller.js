(function() {
"use strict";

    var DEFAULT_ROUTE = 'home';
    var template = document.querySelector('template[is="auto-binding"]');
    var contentController, pages, scaffold;
    var cache = {};

    template.pages = [
        {name: 'Home', hash: 'home', url: '/home.html'},
        {name: 'Pirate badges', hash: 'dart-sample', url: 'dart/build/web/piratebadge/index.html'},
        //{name: 'Polymer sample', hash: 'polymer-sample', url: '/polymer-sample.html'}
    ];


    template.addEventListener('template-bound', function(e) {
        scaffold = document.querySelector('#scaffold');
        contentController = document.querySelector('#contentController');
        pages = document.querySelector('#pages');
        var keys = document.querySelector('#keys');

        // Use URL has for initial route. Otherwise, use the first page.
        this.route = this.route || DEFAULT_ROUTE;
    });


    // Prevent link navigation
    template.ajaxLoad = function(e, detail, sender) {
        e.preventDefault();
    };


    template.keyHandler = function(e, detail, sender) {

        switch (detail.key) {
            case 'left':
            case 'up':
                pages.selectPrevious();
                break;
            case 'right':
            case 'down':
                pages.selectNext();
                break;
            case 'space':
                detail.shift ? pages.selectPrevious() : pages.selectNext();
                break;
        }
    };

    template.menuItemSelected = function(e, detail, sender) {
        if (detail.isSelected) {

            // Need to wait so <core-ajax> has it's URL set
            this.async(function() {
                if (!cache[contentController.url]) {
                    contentController.go();
                }
                scaffold.closeDrawer();
            });
        }
    };

    template.cyclePages = function(e, detail, sender) {
        // Clicks should navigate and not cycle pages
        if (e.path[0].localName == 'a') {
            return;
        }
        e.shiftKey ? sender.selectPrevious(true) : sender.selectNext(true);
    };

    template.onResponse = function(e, detail, sender) {
        var article = detail.response.querySelector('#articleContent');
        var html;
        if (article) {
            //article.querySelector('.byline').remove();
            // Fix up image paths to not be local
            [].forEach.call(article.querySelectorAll('img'), function(img) {
                img.setAttribute('src', img.src);
            });

            html = article.innerHTML;
        } else {
            html = "Content not found";
        }

        // Primitive caching by URL
        cache[contentController.url] = html;
        this.injectBoundHTML(cache[contentController.url], pages.selectedItem.firstElementChild);
    };

})();

