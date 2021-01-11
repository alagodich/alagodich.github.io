function filterTags() {
    const hash = decodeURI(window.location.hash).split('#')[1],
        selectedTags = hash
            ? hash.split(',').filter(tag => tag !== '')
            : [];

    [...document.getElementsByClassName('site__posts')].forEach(container => {
        const posts = [...container.getElementsByClassName('event')];

        posts.forEach(post => {
            const postTags = post.dataset.tags
                ? post.dataset.tags.split(',').filter(tag => tag !== '')
                : [];
            const postSelected = postTags.filter(tag => selectedTags.includes(tag)).length;

            if (selectedTags.length && !postSelected) {
                post.style.display = 'none';
            } else {
                post.style.display = 'block';
            }
        });
    });

    [...document.getElementsByClassName('tag__selector')].forEach(selector => {
        const selectorTag = selector.dataset.tag;
        const classList = [...selector.classList]
            .filter(className => className !== 'blue');

        if (selectedTags.includes(selectorTag)) {
            classList.push('blue');
            selector.className = classList.join(' ');
            selector.href = '#';
        } else {
            selector.className = classList.join(' ');
            selector.href = `#${selectorTag}`;
        }
    });
}

(() => {
    filterTags();

    if ('onhashchange' in window) {
        window.addEventListener('hashchange', filterTags);
    } else {
        // Disable tags if browser does not support hash change event
        [...document.getElementsByClassName('js--tag-bar')].forEach(element => {
            element.style.display = 'none';
        });
    }
})();
