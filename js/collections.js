import { supabase } from "./products.js";

// Initialization of variables
let $ = document;
let productCollectionWrapper = $.querySelector('.product-collections-wrapper')
let navbarButtons = $.querySelectorAll('.navbar__DropdownMenu-link')
let shopSliderWrapper = $.querySelector('.shop-slider__products')
let shopSlider = $.querySelector('.shop-slider')
let shopSubmitBtn = $.querySelector('.shop-slider__submit__btn')
let sumValue = 0;



async function fetchData() {
    try {
      // Query data from a table
      const { data, error } = await supabase
      .from('products')
      .select("*")
      
    if(data) {
        // Show all products
        clear()
        data.forEach(elem => {
            allCollectionHandler(elem.image, elem.title, elem.price)
        })
        // show Product with Buttons
        navbarButtons.forEach(() => {
            document.body.addEventListener('click', e => {
                if(e.target.dataset.name === 'All-products') {
                    clear()
                    data.forEach(elem => {
                        allCollectionHandler(elem.image, elem.title, elem.price)
                    })
                } else if(e.target.dataset.name ==='hats') {
                    clear()
                    data.forEach(elem => {
                        elem.section === 'Hats' && hatsHandler(elem.image, elem.title, elem.price)
                    })
                } else if(e.target.dataset.name ==='Hoodies-and-Jackets') {
                    clear()
                    data.forEach(elem => {
                        elem.section === 'Hoodies and Jackets' && HoodiesHandler(elem.image, elem.title, elem.price)
                    })
                } else if(e.target.dataset.name ==='Joggers') {
                    clear()
                    data.forEach(elem => {
                        elem.section === 'Joggers' && JoggersHandler(elem.image, elem.title, elem.price)
                    })
                } else if(e.target.dataset.name ==='Shirts') {
                    clear()
                    data.forEach(elem => {
                        elem.section === 'Shirts' && ShirtsHandler(elem.image, elem.title, elem.price)
                    })
                } else if(e.target.dataset.name ==='Tanks') {
                    clear()
                    data.forEach(elem => {
                        elem.section === 'Tanks' && TanksHandler(elem.image, elem.title, elem.price)
                    })
                }
            })
        })
       
      }
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
fetchData()

 




document.addEventListener('click', e => {
   // insert data into Database when click buttons 
    if(e.target.classList.value === 'product-content__btn') {

        let productImage = e.target.previousElementSibling.previousElementSibling.previousElementSibling.src
        let productTitle = e.target.previousElementSibling.previousElementSibling.innerHTML
        let productPrice = e.target.previousElementSibling.innerHTML
        
        insertData(productImage,productTitle,productPrice)
        // Open SHOP Slider
        shopSlider.style.right = '0'
        
    // Delete data from Database when click buttons
    } else if(e.target.classList.value === 'shop-slider__product__remove-btn') {
        let shopProductWrapper = e.target.parentElement.parentElement
        let shopProductPrice = Number(e.target.previousElementSibling.innerHTML.slice(1))
        // Delete products Styles
        shopProductWrapper.innerHTML = ' '
        shopProductWrapper.style.borderBottom = 'none'
        let finalPrice = sumValue -= shopProductPrice
        shopSubmitBtn.innerHTML = `CHEKBOX • $${finalPrice}`
        let removeTitle = e.target.previousElementSibling.previousElementSibling.innerHTML

        deleteData(removeTitle)
    }
})






// insert data into Database
async function insertData(productImage, productTitle, productPrice) {
            try {
              // Query data from a table
              const { error } = await supabase
                .from('orders')
                .insert({title: productTitle, price: productPrice.slice(1), image: productImage })
                .select('*')

            shopSliderWrapper.insertAdjacentHTML('beforeend', `
            <div class="shop-slider__product animate__animated animate__fadeInRight">
            <img src="${ productImage}" alt="img" class="shop-slider__product__image">
            <div class="shop-slider__product__content-wrapper">
                <h3 class="shop-slider__product__text">${productTitle}</h3>
                <h4 class="shop-slider__product__price">$${productPrice.slice(1)}</h4>
                <a href="#" class="shop-slider__product__remove-btn">REMOVE</a>
            </div>
            </div>`)

            let finalPrice = sumValue += Number(productPrice.slice(1))
            shopSubmitBtn.innerHTML = `CHEKBOX • $${finalPrice}`
              if (error) {
                throw error;
              }
            } catch (error) {
              console.error('Error fetching data:', error.message);
            }
}

if(location.href = '/collections.html#') {
    getData()
}

// Get data from Database
async function getData() {
    location.href = location.href
   try {
     // Query data from a table
     const { data, error } = await supabase
       .from('orders')
       .select('*')

   if(data) {
       data.forEach(product => {
           shopSliderWrapper.insertAdjacentHTML('beforeend', `
           <div class="shop-slider__product">
           <img src="${product.image}" alt="img" class="shop-slider__product__image">
           <div class="shop-slider__product__content-wrapper">
               <h3 class="shop-slider__product__text">${product.title}</h3>
               <h4 class="shop-slider__product__price">$${product.price}</h4>
               <a href="#" class="shop-slider__product__remove-btn">REMOVE</a>
           </div>
           </div>`)
           // Show Final Price value in CheckBox
           let finalPrice = sumValue += product.price
           shopSubmitBtn.innerHTML = `CHEKBOX • $${finalPrice}`
       })

     }
     if (error) {
       throw error;
     }
   } catch (error) {
     console.error('Error fetching data:', error.message);
   }
 }





// Delete data from Database
async function deleteData(removeTitle) {
   try {
     // Query data from a table
     const { error } = await supabase
       .from('orders')
       .delete()
       .eq("title", removeTitle)
       
     if (error) {
       throw error;
     }
   } catch (error) {
     console.error('Error fetching data:', error.message);
   }
 }








// All Products Function
function allCollectionHandler(image, title, price) {
    productCollectionWrapper.insertAdjacentHTML('beforeend', `
    <div class="product animate__animated animate__fadeInLeft" >
    <div class="product__product-content">
    <img src="${image}" alt="img" class="product-content__img">
    <h4 class="product-content__title">${title}</h4>
    <h4 class="product-content__price">$${price}</h4>
    <a href="#" class="product-content__btn">ADD TO CART</a>
    </div>
    </div>`)
}
 

// Hats Function
function hatsHandler(image, title, price) {
    productCollectionWrapper.insertAdjacentHTML('beforeend', `
    <div class="product animate__animated animate__fadeInLeft" >
    <div class="product__product-content">
    <img src="${image}" alt="img" class="product-content__img">
    <h4 class="product-content__title">${title}</h4>
    <h4 class="product-content__price">$${price}</h4>
    <a href="#" class="product-content__btn">ADD TO CART</a>
    </div>
    </div>`)
}

// Hoodies and Jackets Function
function HoodiesHandler(image, title, price) {
    productCollectionWrapper.insertAdjacentHTML('beforeend', `
    <div class="product animate__animated animate__fadeInLeft" >
    <div class="product__product-content">
    <img src="${image}" alt="img" class="product-content__img">
    <h4 class="product-content__title">${title}</h4>
    <h4 class="product-content__price">$${price}</h4>
    <a href="#" class="product-content__btn">ADD TO CART</a>
    </div>
    </div>`)
}
// Joggers Function
function JoggersHandler(image, title, price) {
    productCollectionWrapper.insertAdjacentHTML('beforeend', `
    <div class="product animate__animated animate__fadeInLeft" >
    <div class="product__product-content">
    <img src="${image}" alt="img" class="product-content__img">
    <h4 class="product-content__title">${title}</h4>
    <h4 class="product-content__price">$${price}</h4>
    <a href="#" class="product-content__btn">ADD TO CART</a>
    </div>
    </div>`)
}

// Shirts Function
function ShirtsHandler(image, title, price) {
    productCollectionWrapper.insertAdjacentHTML('beforeend', `
    <div class="product animate__animated animate__fadeInLeft" >
    <div class="product__product-content">
    <img src="${image}" alt="img" class="product-content__img">
    <h4 class="product-content__title">${title}</h4>
    <h4 class="product-content__price">$${price}</h4>
    <a href="#" class="product-content__btn">ADD TO CART</a>
    </div>
    </div>`)
}

// Tanks Function
function TanksHandler(image, title, price) {
    productCollectionWrapper.insertAdjacentHTML('beforeend', `
    <div class="product animate__animated animate__fadeInLeft" >
    <div class="product__product-content">
    <img src="${image}" alt="img" class="product-content__img">
    <h4 class="product-content__title">${title}</h4>
    <h4 class="product-content__price">$${price}</h4>
    <a href="#" class="product-content__btn">ADD TO CART</a>
    </div>
    </div>`)
}



// Clear Products Wrapper Function
function clear() {
    productCollectionWrapper.innerHTML = " "
}



