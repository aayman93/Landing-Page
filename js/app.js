/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = Array.from(document.getElementsByTagName('section'));
const secs = document.querySelectorAll('section');
const ul = document.getElementById('navbar__list');
const fragment = document.createDocumentFragment(); 
const menuToggle = document.querySelector('.menu__toggle');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function onMenuToggleClick(event) {
    event.preventDefault()
    ul.classList.toggle('shown');
}
menuToggle.addEventListener('click', onMenuToggleClick);


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
sections.forEach(section => {
    const id = section.id;
    const title = section.dataset.nav;

    const li = document.createElement('li');
    li.innerHTML = `<li><a href="#${id}" class="menu__link">${title}</a></li>`

    fragment.appendChild(li);
});

// Add class 'active' to section when near top of viewport
function onScrollToSection() {
    // Timeout so that when user moves from first section to last using navbar, all nav items in between don't be activated.
    setTimeout(() => {
        sections.forEach(section => {
            const activeLink = document.querySelector(`a[href="#${section.id}"]`);
            if (section.getBoundingClientRect().top <= 150 && section.getBoundingClientRect().bottom >= 150) {
                section.classList.add('your-active-class');
                activeLink.classList.add('active__link');
            } else {
                section.classList.remove('your-active-class');
                activeLink.classList.remove('active__link');
            }
        });
    }, 600);
}

// Scroll to anchor ID using scrollTO event
function onLinkClick(event) {
    event.preventDefault()
    const section = document.querySelector(event.target.getAttribute('href'));
    section.scrollIntoView({
        behavior: "smooth"
    });
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
ul.appendChild(fragment);
// Scroll to section on link click
ul.addEventListener('click', onLinkClick);
// Set sections as active
window.addEventListener('scroll', onScrollToSection);