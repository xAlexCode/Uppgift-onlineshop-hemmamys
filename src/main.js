import './style.scss';

/**
 * Skapa en lista med 10 produkter (name, price, rating, category, img) och lägg till dem i DOM:en. Alltså section elementet med id "products" kommer att fyllas med tio divs som representerar produkter. 
 * Varje produkt div ska innehålla ett h2 element för produktens namn och ett p element för produktens pris.
 */

const products = [ //Array med produkter till sidan
  {
    name: 'Nappar', 
    price: 19, 
    rating: 4, 
    category: 'sweet', 
    img: 'img/Surapersikor.jpeg'
  },
  {
    name: 'Chokladbit', 
    price: 12, 
    rating: 4, 
    category: 'chocolate', 
    img: 'placeholder'
  }, 
  {
    name: 'Bubbles Fizz', 
    price: 8, 
    rating: 4, 
    category: 'sweet', 
    img: 'placeholder'
  },
  {
    name: 'Sura remmar', 
    price: 25, 
    rating: 5, 
    category: 'sour', 
    img: 'placeholder'
  },
  {
    name: 'Chokladkaka', 
    price: 15, 
    rating: 3, 
    category: 'chocolate', 
    img: 'placeholder'
  },
  {
    name: 'Gummibjörnar', 
    price: 10, 
    rating: 4, 
    category: 'sweet', 
    img: 'placeholder'
  },
  {
    name: 'Klubba', 
    price: 5, 
    rating: 2, 
    category: 'sweet', 
    img: 'placeholder'
  },
  { 
    name: 'Mörk choklad', 
    price: 20, 
    rating: 5, 
    category: 'chocolate', 
    img: 'placeholder'
  },
  {
    name: 'Sura ormar', 
    price: 18, 
    rating: 4, 
    category: 'sour', 
    img: 'placeholder'
  },
  {
    name: 'Sura persikor', 
    price: 14, 
    rating: 3, 
    category: 'sour', 
    img: 'placeholder'
  }
];

let filteredProducts = Array.from(products); //Skapar en kopia av products arrayen som vi kan filtrera och sortera utan att ändra originalet
const productsListing = document.querySelector('#products'); //Hämtar section elementet med id "products"

// -----------------------------------------------------------------
// ------------------------ Filter knappar -------------------------
// -----------------------------------------------------------------
const filterSweetBtn = document.querySelector('#filterSweetBtn'); //Hämtar knappar för att filtrera produkter
const filterSourBtn = document.querySelector('#filterSourBtn');
const filterChocolateBtn = document.querySelector('#filterChocolateBtn');

filterSweetBtn.addEventListener('click', filterProductListSweetCategory); //Lägger till event listeners på knapparna
filterSourBtn.addEventListener('click', filterProductListSourCategory);
filterChocolateBtn.addEventListener('click', filterProductListChocolateCategory);
// ------------------------------------------------------------------
// ------------------------ Sortera knappar -------------------------
// ------------------------------------------------------------------

// Funktion för att sortera produkter efter pris (billigast först)
const sortByPriceBtn = document.querySelector('#sortPriceBtn');
sortByPriceBtn.addEventListener('click', sortByPrice);

function sortByPrice() {
  filteredProducts.sort((product1, product2) => product1.price - product2.price); //Sorterar filteredProducts arrayen efter billigast pris till dyrast
  printProducts(); //Skriver ut produkterna igen efter sortering
}

// Funktion för att sortera produkter efter namn
const sortByNameBtn = document.querySelector('#sortNameBtn');
sortByNameBtn.addEventListener('click', sortByName);

function sortByName() {
  filteredProducts.sort((product1, product2) => { //Sorterar filteredProducts arrayen efter namn i alfabetisk ordning
    const product1Name = product1.name.toUpperCase(); // Gör namnen till versaler för att undvika problem med små och stora bokstäver
    const product2Name = product2.name.toUpperCase();

    if (product1.name < product2.name) {
      return -1;
    }
    if (product1.name > product2.name) {
      return 1;
    }
    return 0; // Om namnen är lika
  });
  printProducts(); //Skriver ut produkterna igen efter sortering
}

// -----------------------------------------------------------------
// ------------------------ Filter funktion ------------------------
// -----------------------------------------------------------------
function showAllProducts() {
  filteredProducts = Array.from(products);
  printProducts();
}

function filterProductListSweetCategory() {
  filteredProducts = products.filter((product) => product.category === 'sweet');
  printProducts();
}

function filterProductListSourCategory() {
  filteredProducts = products.filter((product) => product.category === 'sour');
  printProducts();
}

function filterProductListChocolateCategory() {
  filteredProducts = products.filter((product) => product.category === 'chocolate');
  printProducts();
}

// -----------------------------------------------------------------
// ------------------------ Skapa produktlista ---------------------
// -----------------------------------------------------------------

function printProducts() { //Funktion som skriver ut alla produkter på sidan
  productsListing.innerHTML = ''; // Tömmer productListing innan vi lägger till nya produkter

  for (let i = 0; i < filteredProducts.length; i++) { // en loop som går igenom alla produkter
    const product = filteredProducts[i];  //Detta är den aktuella produkten

  //Skapar en HTML-struktur för produkten
  const html = ` 
  <article>
    <img src="${product.img}" alt="${product.name}" loading="lazy" width="300" height="200">
    <h2>${product.name}</h2>
    <div class="metadata">
      <p>Pris: ${product.price} kr</p>
      <p>Betyg: ${product.rating} / 5</p>
      </div>
    <p>Kategori: ${product.category}</p>
  </article>
  `;
  console.log(html); //Loggar html-strukturen i konsolen för att se att det fungerar
    productsListing.innerHTML += html; //Lägger tiill html i DOM:en

  }
}
printProducts(); //kör funktionen

