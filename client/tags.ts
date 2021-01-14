/**
 * Handle hash tags on post list
 * This currently pollutes global namespace and should be reworked into React component
 * To manage event listener lifecycle
 */
function filterTags() {
    const hash = decodeURI(window.location.hash).split('#')[1],
        selectedTags = hash
            ? hash.split(',').filter(tag => tag !== '')
            : [];

    [...document.getElementsByClassName('site__posts') as any].forEach((container: HTMLDivElement) => {
        const posts = [...container.getElementsByClassName('event') as any];

        posts.forEach((post: HTMLDivElement) => {
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

    [...document.getElementsByClassName('tag__selector') as any].forEach((selector: HTMLAnchorElement) => {
        const selectorTag = selector.dataset.tag
            ? selector.dataset.tag
            : '';
        const classList = [...selector.classList as any]
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
    const tagsAndPostsPresentOnPage =
        document.getElementsByClassName('site__posts').length
        && document.getElementsByClassName('tag__selector').length;

    if (!tagsAndPostsPresentOnPage) {
        return;
    }

    filterTags();

    if ('onhashchange' in window) {
        window.addEventListener('hashchange', filterTags, false);
    } else {
        // Disable tags if browser does not support hash change event
        [...document.getElementsByClassName('js--tag-bar') as any].forEach(element => {
            element.style.display = 'none';
        });
    }
})();
