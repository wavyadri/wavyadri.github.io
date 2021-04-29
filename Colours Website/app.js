// targeting the hamburger 3 bars
const menu = document.querySelector('#mobile-menu');

// targeting the navbar items
const menuLinks = document.querySelector('.navbar__menu');

const navLogo = document.querySelector('#navbar__logo');

// Display Mobile Menu
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
};

// event listener
menu.addEventListener('click', mobileMenu);

// Show active menu when scrolling
const highlightMenu = () => {
    const element = document.querySelector('.highlight');
    const homeMenu = document.querySelector('#home-page');
    const aboutMenu = document.querySelector('#about-page');
    const servicesMenu = document.querySelector('#services-page');
    //Need a scroll position to show where we are
    let scrollPos = window.scrollY;
    // console.log(scrollPos);


    //adds 'highlight' class to my menu items
    // >960 means won't work for mobile
    // <600 means won't work for About
    if(window.innerWidth > 960 && scrollPos < 600) {
        homeMenu.classList.add('highlight');
        aboutMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos < 1400) {
        aboutMenu.classList.add('highlight');
        homeMenu.classList.remove('highlight');
        servicesMenu.classList.remove('highlight');
        return;
    } else if (window.innerWidth > 960 && scrollPos < 2345) {
        servicesMenu.classList.add('highlight');
        aboutMenu.classList.remove('highlight');
        return;
    }

    if((element && window.innerWidth < 960 && scrollPos < 600) || element) {
        element.classList.remove('highlight');
    }
};

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

// Close mobile Menu when clicking on a menu item
const hideMobileMenu = () => {
    const menuBars = document.querySelector('.is-active');
    if(window.innerWidth <= 768 && menuBars) {
        menu.classList.toggle('is-active');
        menuLinks.classList.remove('active');
    }
}

// Trigger hideMobileMenu
menuLinks.addEventListener('click', hideMobileMenu);
// For when we click the COLOURS navbar logo
navLogo.addEventListener('click', hideMobileMenu);