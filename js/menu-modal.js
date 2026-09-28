const modalOverlay = document.querySelector('.modal-overlay');
const menuItemModal = document.querySelector('.menu-item-modal');
const body = document.body;
const closeModalButton = document.querySelector('.modal-close');

let currentBasePrice = 0;

function closeModal() {
    modalOverlay.classList.remove('active');
    menuItemModal.classList.remove('active');
    body.classList.remove('no-scroll');
}

function openModal(item) {
    modalOverlay.classList.add('active');
    menuItemModal.classList.add('active');
    body.classList.add('no-scroll');

    changeModal(item);
}

function changeModal(item) {
    const modalImage = menuItemModal.querySelector('.modal-image img');
    const modalTitle = menuItemModal.querySelector('.modal-title h3');
    const modalDescription = menuItemModal.querySelector('.modal-title p');
    const modalSizeTabs = menuItemModal.querySelectorAll('.modal-size-tab');
    const modalAdditivesTabs = menuItemModal.querySelectorAll('.modal-additives-tab');

    modalImage.src = item.image;
    modalTitle.textContent = item.name;
    modalDescription.textContent = item.description;

    const sizes = Object.values(item.sizes);
    modalSizeTabs.forEach((tab, index) => {
        tab.dataset.cost = sizes[index]['add-price'];
        tab.querySelector('.size').textContent = sizes[index].size;
        tab.classList.toggle('active', index === 0);
    });

    modalAdditivesTabs.forEach((tab, index) => {
        tab.dataset.cost = item.additives[index]['add-price'];
        tab.querySelector('.additive').textContent = item.additives[index].name;
        tab.classList.remove('active');
    });

    currentBasePrice = Number(item.price);
    updateTotalPrice();
}

function updateTotalPrice() {
    const modalTotalPrice = menuItemModal.querySelector('.modal-total .price');
    const activeTabs = menuItemModal.querySelectorAll('.modal-size-tab.active, .modal-additives-tab.active');

    let total = currentBasePrice;
    activeTabs.forEach(tab => total += Number(tab.dataset.cost));

    modalTotalPrice.textContent = `$${total.toFixed(2)}`;
}

closeModalButton.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', event => {
    if (event.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

menuItemModal.querySelector('.modal-size-tabs').addEventListener('click', event => {
    const tab = event.target.closest('.modal-size-tab');
    if (!tab) {
        return;
    }
    menuItemModal.querySelectorAll('.modal-size-tab.active').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    updateTotalPrice();
});

menuItemModal.querySelector('.modal-additives-tabs').addEventListener('click', event => {
    const tab = event.target.closest('.modal-additives-tab');
    if (!tab) {
        return;
    }
    tab.classList.toggle('active');
    updateTotalPrice();
});