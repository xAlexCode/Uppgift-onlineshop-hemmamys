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

const productsListing = document.querySelector('#products'); //Hämtar section elementet med id "products"

function printProducts() { //Funktion som skriver ut alla produkter på sidan
  productsListing.innerHTML = ''; // Tömmer productListing innan vi lägger till nya produkter

  for (let i = 0; i < products.length; i++) { // en loop som går igenom alla produkter
    const product = products[i];  //Detta är den aktuella produkten

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

