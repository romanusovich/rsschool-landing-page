const burgerMenuButton = document.querySelector('.burger-menu-button');
const burgerMenu = document.querySelector('.burger-menu');

burgerMenuButton.addEventListener('click', () => {
    burgerMenuButton.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

const burgerMenuLinks = document.querySelectorAll('.burger-menu a');

burgerMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        burgerMenuButton.classList.remove('active');
        burgerMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});