let $ = document;
let navBtn = $.querySelector('.navbar-app__mobile')
let navbarMobileContent = $.querySelector('.navbar-app__mobile__content ')
let navOpen = false

navBtn.addEventListener('click', () => {
    if (navOpen) {
        navBtn.classList.remove("nav__btn--open")
        navbarMobileContent.style.display = 'none' 
        navOpen = false
    } else {
        navBtn.classList.add('nav__btn--open')
        navbarMobileContent.style.display = 'block' 
        navOpen = true
    }
})