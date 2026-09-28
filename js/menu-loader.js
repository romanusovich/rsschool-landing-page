async function loadMenuJSON() {
    try {
        const response = await fetch('js/products.json');
        if (!response.ok) {
            throw new Error('Failed to load menu JSON');
        }
        const menu = await response.json();
        return menu;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const products = loadMenuJSON();

const menuContainer = document.querySelector('.menu-grid');

products.then(menu => {
    menu.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.dataset.category = item.category;
        menuItem.dataset.sizes = item.sizes;
        menuItem.dataset.additives = item.additives;
        menuItem.innerHTML = `
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="menu-item-description">
                <h3>${item.name}</h3>
                <p class="medium">${item.description}</p>
                <h3 class="price">$${item.price}</h3>
            </div>
        `;
        menuItem.addEventListener('click', () => openModal(item));
        menuContainer.appendChild(menuItem);
    });
})
    .then(() => switchTab('coffee'));
