const ITEMS_TO_SHOW = 4;
const MOBILE_BREAKPOINT = 768;

const loadMoreButton = document.querySelector('.load-more');
const tabs = document.querySelectorAll('.menu-tabs button');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        switchTab(tab.dataset.tab);
    });
});

loadMoreButton.addEventListener('click', () => {
    const items = getActiveCategoryItems();
    updateMenuItems(items, items.length);
    loadMoreButton.classList.add('inactive', 'clicked');
});

['resize', 'load'].forEach(event => window.addEventListener(event, () => {
    const items = getActiveCategoryItems();
    if (isMobile()) {
        if (!loadMoreButton.classList.contains('clicked')) {
            updateMenuItems(items, ITEMS_TO_SHOW);
            loadMoreButton.classList.remove('inactive');
        }
    } else if (!loadMoreButton.classList.contains('inactive')) {
        updateMenuItems(items, items.length);
        loadMoreButton.classList.add('inactive');
    }
}));

function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
}

function getActiveCategoryItems() {
    const activeTab = document.querySelector('.menu-tabs button.active').dataset.tab;
    return document.querySelectorAll(`.menu-item[data-category="${activeTab}"]`);
}

function switchTab(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    loadMoreButton.classList.remove('inactive', 'clicked');
    menuItems.forEach(item => {
        item.classList.toggle('inactive', item.dataset.category !== category);
    });

    const categoryItems = document.querySelectorAll(`.menu-item[data-category="${category}"]`);
    if (isMobile()) {
        updateMenuItems(categoryItems, ITEMS_TO_SHOW);
    } else {
        updateMenuItems(categoryItems, categoryItems.length);
        loadMoreButton.classList.add('inactive');
    }
}

function updateMenuItems(items, itemsToShow = ITEMS_TO_SHOW) {
    items.forEach((item, index) => {
        item.classList.toggle('inactive', index >= itemsToShow);
    });
    if (items.length <= itemsToShow) {
        loadMoreButton.classList.add('inactive');
    }
}