import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'


const supabaseUrl = 'https://bbqrhmeaujuanbgzfwsv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicXJobWVhdWp1YW5iZ3pmd3N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg0MDEzNjUsImV4cCI6MjAwMzk3NzM2NX0.lPX6X3IEg7edPO5WUitW5lERnGCzRydkV7tkmzFHIiM';
export const supabase = createClient(supabaseUrl, supabaseKey)

// Initialization of variables
let $ = document;
let homeProductsWrapper = $.querySelector('.product-wrapper')


async function fetchData() {
  try {
    // Query data from a table
    const { data, error } = await supabase
    .from('products')
    .select("*")
    
    if(data) {
      data.forEach(elem => {
        elem.section === "Hoodies and Jackets" && homeProducts(elem.image, elem.title, elem.price)
      })
    }
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

fetchData();

function homeProducts(image, title, price) {
  homeProductsWrapper.insertAdjacentHTML('beforeend', `
  <div class="product" >
  <div class="product__product-content">
  <img src="${image}" alt="img" class="product-content__img">
  <h4 class="product-content__title">${title}</h4>
  <h4 class="product-content__price">$${price}</h4>
  </div>
  </div>`)
}
