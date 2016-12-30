function filterTags() {
    const hash = window.location.hash.split('#')[1],
        selectedTags = hash
            ? hash.split(',').filter(tag => tag !== '')
            : [];

    $('.ui.feed.site__posts > .event').each((index, post) => {
        const $post = $(post),
            postTags = $post.data('tags').split(',').filter(tag => tag !== ''),
            postSelected = postTags.filter(tag => selectedTags.includes(tag)).length;

        if (selectedTags.length && !postSelected) {
            $post.hide();
        } else {
            $post.show();
        }
    });

    $('.tag__selector').each((index, selector) => {
        const $selector = $(selector),
            selectorTag = $selector.data('tag');

        if (selectedTags.includes(selectorTag)) {
            $selector
                .addClass('blue')
                .prop('href', '#');
        } else {
            $selector
                .removeClass('blue')
                .prop('href', `#${selectorTag}`);
        }
    });
}

$(() => {
    filterTags();

    if ('onhashchange' in window) {
        $(window).bind('hashchange', filterTags);
    } else {
        $('.tag__selector').mouseup(filterTags);
    }
});
