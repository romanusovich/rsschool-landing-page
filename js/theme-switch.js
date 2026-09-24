const themeSwitch = document.querySelector('.theme-switch');
const lightTheme = themeSwitch.querySelector('.light');
const darkTheme = themeSwitch.querySelector('.dark');

const applyTheme = (theme) => {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);

    localStorage.setItem('theme', theme);
    updateActiveTheme();
};

const updateActiveTheme = () => {
    const isDarkTheme = document.body.classList.contains('dark-theme');

    darkTheme.classList.toggle('active', isDarkTheme);
    lightTheme.classList.toggle('active', !isDarkTheme);
};

lightTheme.addEventListener('click', () => applyTheme('light'));
darkTheme.addEventListener('click', () => applyTheme('dark'));

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light' || savedTheme === 'dark') {
    applyTheme(savedTheme);
} else {
    updateActiveTheme();
}