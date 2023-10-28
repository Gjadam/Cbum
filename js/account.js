import { supabase } from "./products.js";

let ordersWrapper = document.querySelector('.orders__wrapper')


// Get data from Database for Orders section
async function getData() {
    try {
      // Query data from a table
      const { data, error } = await supabase
      .from('orders')
      .select("*")
      
    if(data) {
        data.forEach(element => {
            ordersWrapper.insertAdjacentHTML('beforeend', `
            <div class="orders__order-content">
            <img src="${element.image}" alt="" class="order-content__image">
            <h1 class="order-content__name">${element.title}</h1>
            <h5 class="order-content__price">${element.price}$</h5>
            </div>`)
        });
      }
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
getData()



