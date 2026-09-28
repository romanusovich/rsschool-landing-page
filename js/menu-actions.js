let ITEMS_TO_SHOW = 4;

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
    const activeTab = document.querySelector('.menu-tabs button.active').dataset.tab;
    const menuItems = document.querySelectorAll(`.menu-item[data-category="${activeTab}"]`);
    updateMenuItems(menuItems, menuItems.length);
    loadMoreButton.classList.add('inactive');
    loadMoreButton.classList.add('clicked');
});

window.addEventListener('resize', () => {
    const activeTab = document.querySelector('.menu-tabs button.active').dataset.tab;
    const menuItems = document.querySelectorAll(`.menu-item[data-category="${activeTab}"]`);
    if (window.innerWidth > 768) {
        if (!loadMoreButton.classList.contains('inactive')) {
            updateMenuItems(menuItems, menuItems.length);
            loadMoreButton.classList.add('inactive');
        }
    } else {
        if (!loadMoreButton.classList.contains('clicked')) {
            updateMenuItems(menuItems, ITEMS_TO_SHOW);
            loadMoreButton.classList.remove('inactive');
        }
    }
});

function switchTab(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    loadMoreButton.classList.remove('inactive');
    loadMoreButton.classList.remove('clicked');
    menuItems.forEach(item => {
        if (item.dataset.category === category) {
            item.classList.remove('inactive');
        } else {
            item.classList.add('inactive');
        }
    });
    updateMenuItems(document.querySelectorAll(`.menu-item[data-category="${category}"]`), ITEMS_TO_SHOW);
}

function updateMenuItems(items, itemsToShow = ITEMS_TO_SHOW) {
    items.forEach((item, index) => {
        if (index < itemsToShow) {
            item.classList.remove('inactive');
        } else {
            item.classList.add('inactive');
        }
    });
}