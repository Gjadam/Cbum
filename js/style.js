let $ = document;
// Start NavBar Variables //
let openNavBar = $.querySelector('.navbar__btn-navigation')
let navBarMobile = $.querySelector('.navbar__mobile-nav')
let closeNavbar = $.querySelector('.close-navbar-wrapper')
let showShopItems = $.querySelector('.navbar__mobile-nav__items__link')
let shopContent = $.querySelector('.navbar__mobile-nav__DropdownMenu')
let searchIcon = $.querySelectorAll('.navbar__icon')
let searchBox = $.querySelector('.search-box')
let searchBoxTimesIcon = $.querySelector('.search-box__times-icon')
let shopSlider = $.querySelector('.shop-slider')
let shopSliderClose = $.querySelector('.shop-slider__close-btn')
let navbarMobileButton = $.querySelectorAll('.navbar__mobile-nav__DropdownMenu-link')


// End NavBar Variables //
let flag = true;


// Start NavBar //

// Start Open/Close NavBar //
openNavBar.addEventListener('click', () => {
    navBarMobile.style.left = '0'
})

closeNavbar.addEventListener('click', () => {
    navBarMobile.style.left = '-35rem'
    
})
// End Open/Close NavBar //

// Start Show ShopItems In Mobile NavBar //
showShopItems.addEventListener('click', () => {
    if (flag) {
        shopContent.style.display = 'block'
        flag = false
    } else {
        shopContent.style.display = 'none'
        flag = true
    }
    
})
// End Show ShopItems In Mobile NavBar //

// Start Open/Close Boxes //
searchIcon.forEach( icon => {
    icon.addEventListener('click', e => {
        if (e.target.dataset.name === 'search') {
            if (flag) {
                searchBox.style.display = 'block'
                flag = false
            } else {
                searchBox.style.display = 'none'
                flag = true
            }
        } else if(e.target.dataset.name === 'shop') {
            shopSlider.style.right = '0'
        }
    })
})

searchBoxTimesIcon.addEventListener('click', () => {
    searchBox.style.display = 'none'
})

shopSliderClose.addEventListener('click', () => {
    shopSlider.style.right = '-60rem'
})

// End Open/Close Shop Slider //


// Close navbar into click buttons
navbarMobileButton.forEach(btn => {
    btn.addEventListener('click', () => {
        navBarMobile.style.left = '-35rem'
    })
})

// End NavBar //


