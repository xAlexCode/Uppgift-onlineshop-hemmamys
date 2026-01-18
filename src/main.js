import './style.scss';

/**
 * Skapa en lista med 10 produkter (name, price, rating, category, img) och lägg till dem i DOM:en. Alltså section elementet med id "products" kommer att fyllas med tio divs som representerar produkter. 
 * Varje produkt-div ska innehålla ett h2 element för produktens namn och ett p element för produktens pris.
 */

const products = [ //Array med produkter till sidan
  {
    name: 'Sura nappar', 
    price: 19, 
    rating: 4, 
    category: 'sour', 
    img: 'img/Napp.jpg'
  },
  {
    name: 'Ferrero Rocher', 
    price: 12, 
    rating: 3, 
    category: 'choklad', 
    img: 'img/Ferrerorocher.jpg'
  }, 
  {
    name: 'Bubble Fizz', 
    price: 9, 
    rating: 5, 
    category: 'sött', 
    img: 'img/Bubblefizz.jpg'
  },
  {
    name: 'Sura persikor', 
    price: 25, 
    rating: 4, 
    category: 'surt', 
    img: 'img/Surapersikor.jpg'
  },
  {
    name: 'Chokladkaka', 
    price: 30, 
    rating: 3, 
    category: 'choklad', 
    img: 'img/Chokladkaka.jpg'
  },
  {
    name: 'Gummibjörnar', 
    price: 10, 
    rating: 1, 
    category: 'sött', 
    img: 'img/Gummibjornar.jpg'
  },
  { 
    name: 'M&Ms', 
    price: 2, 
    rating: 5, 
    category: 'choklad', 
    img: 'img/Mms.jpg'
  },
  {
    name: 'Klubba', 
    price: 15, 
    rating: 2, 
    category: 'sött', 
    img: 'img/Klubba.jpg'
  },
  {
    name: 'Sura ormar', 
    price: 18, 
    rating: 4, 
    category: 'surt', 
    img: 'img/Ormar.jpg'
  },
  {
    name: 'Sura vingum', 
    price: 14, 
    rating: 3, 
    category: 'surt', 
    img: 'img/Suravingum.jpg'
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
const filterShowAllBtn = document.querySelector('#filterShowAllBtn');

filterSweetBtn.addEventListener('click', filterProductListSweetCategory); //Lägger till event listeners på knapparna
filterSourBtn.addEventListener('click', filterProductListSourCategory);
filterChocolateBtn.addEventListener('click', filterProductListChocolateCategory);
filterShowAllBtn.addEventListener('click', filterProductsListShowAll);

// ------------------------------------------------------------------
// ------------------------ Sortera knappar -------------------------
// ------------------------------------------------------------------

// Funktion för att sortera produkter efter pris (billigast först)
const sortByPriceBtn = document.querySelector('#sortPriceBtn');
sortByPriceBtn.addEventListener('click', sortByPrice);

function sortByPrice() {
  console.log("sortByPrice funktionen körs");
  filteredProducts.sort((product1, product2) => product1.price - product2.price); //Sorterar filteredProducts arrayen efter billigast pris till dyrast
  printProducts(); //Skriver ut produkterna igen efter sortering
}

// Funktion för att sortera produkter efter namn (alfabetisk ordning) kort version
const sortByNameBtn = document.querySelector('#sortNameBtn');
sortByNameBtn.addEventListener('click', sortByName);

function sortByName() {
  filteredProducts.sort((product1, product2) => 
  product1.name.localeCompare(product2.name));
  printProducts(); //Skriver ut produkterna igen efter sortering
}

//funktin för att sortera produkter efter betyg (högst först)
const sortRatingBtn = document.querySelector('#sortRatingBtn');
sortRatingBtn.addEventListener('click', sortByRating);

function sortByRating() {
  filteredProducts.sort((product1, product2) => product2.rating - product1.rating); //Sorterar filteredProducts arrayen efter högst betyg till lägst
  printProducts(); //Skriver ut produkterna igen efter sortering
}

// Funktion för att sortera produkter efter kategori
const sortCategoryBtn = document.querySelector('#sortCategoryBtn');
sortCategoryBtn.addEventListener('click', sortByCategory);

function sortByCategory() {
  filteredProducts.sort((product1, product2) => 
  product1.category.localeCompare(product2.category));
  printProducts(); //Skriver ut produkterna igen efter sortering
}
/** Längare version av sortByCategory funktionen utbytt till kortare
 * function sortByCategory() {
  filteredProducts.sort((product1, product2) => { //Sorterar filteredProducts arrayen efter kategori i alfabetisk ordning
    const product1Category = product1.category.toUpperCase(); // Gör kategorierna till versaler för att undvika problem med små och stora bokstäver
    const product2Category = product2.category.toUpperCase();

    if (product1.category < product2.category) {
      return -1;
    }
    if (product1.category > product2.category) {
      return 1;
    }
    return 0; // Om kategorierna är lika
  });
  printProducts(); //Skriver ut produkterna igen efter sortering
}*/

// -----------------------------------------------------------------
// ------------------------ Filter funktion ------------------------
// -----------------------------------------------------------------

function filterProductsListShowAll() {
  filteredProducts = Array.from(products);
  printProducts();
}

function filterProductListSweetCategory() {
  filteredProducts = products.filter((product) => product.category === 'sött');
  printProducts();
}

function filterProductListSourCategory() {
  filteredProducts = products.filter((product) => product.category === 'surt');
  printProducts();
}

function filterProductListChocolateCategory() {
  filteredProducts = products.filter((product) => product.category === 'choklad');
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
    <img src="${product.img}" alt="${product.name}" loading="lazy" width="200" height="200">
    <h2>${product.name}</h2>
    <div class="metadata">
      <p>Pris: ${product.price} kr</p>
      <p>Betyg: ${product.rating} / 5</p>
      </div>
    <p>Kategori: ${product.category}</p>
  </article>
  `;
  
    productsListing.innerHTML += html; //Lägger tiill html i DOM:en

  }
}
printProducts(); //kör funktionen

