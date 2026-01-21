import './style.scss';
import products from './products.mjs';

/**
 * Flyttade över produkterna till products.mjs för att ge lite struktur i dokumentet och göra det lättare att läsa.
 * Tanke för html strukturen i js, varje produkt-div ska innehålla ett h2 element för produktens namn och ett p element för produktens pris.
 * 
 */
const cart = []; //En kundvagn som är en array

let filteredProducts = Array.from(products); //Skapar en kopia av products arrayen som vi kan filtrera och sortera utan att ändra originalet
const productsListing = document.querySelector('#products'); //Hämtar section elementet med id "products"

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------ Filter knappar ------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------

const filterSweetBtn = document.querySelector('#filterSweetBtn'); //Hämtar knappar för att filtrera produkter
const filterSourBtn = document.querySelector('#filterSourBtn');
const filterChocolateBtn = document.querySelector('#filterChocolateBtn');
const filterShowAllBtn = document.querySelector('#filterShowAllBtn');

filterSweetBtn.addEventListener('click', filterProductListSweetCategory); //Lägger till ett event vid click
filterSourBtn.addEventListener('click', filterProductListSourCategory);
filterChocolateBtn.addEventListener('click', filterProductListChocolateCategory);
filterShowAllBtn.addEventListener('click', filterProductsListShowAll);

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------ Filter funktion -----------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------  Sortera knappar  ---------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------

const sortByPriceBtn = document.querySelector('#sortPriceBtn'); //Hämtar knapparna för att sortera produkter
const sortByNameBtn = document.querySelector('#sortNameBtn');
const sortRatingBtn = document.querySelector('#sortRatingBtn');
const sortCategoryBtn = document.querySelector('#sortCategoryBtn');

sortByPriceBtn.addEventListener('click', sortByPrice);  //Lägger till ett event vid click
sortByNameBtn.addEventListener('click', sortByName);
sortRatingBtn.addEventListener('click', sortByRating);
sortCategoryBtn.addEventListener('click', sortByCategory);

// Funktion för att sortera produkter efter pris (billigast först)
function sortByPrice() {
  filteredProducts.sort((product1, product2) => product1.price - product2.price); //Sorterar filteredProducts arrayen efter billigast pris till dyrast
  printProducts(); //Skriver ut produkterna igen efter sortering
}

// Funktion för att sortera produkter efter namn (alfabetisk ordning) kort version
function sortByName() {
  filteredProducts.sort((product1, product2) => 
  product1.name.localeCompare(product2.name));
  printProducts(); //Skriver ut produkterna igen efter sortering
}

//funktion för att sortera produkter efter betyg (högst först)
function sortByRating() {
  filteredProducts.sort((product1, product2) => product2.rating - product1.rating); //Sorterar filteredProducts arrayen efter högst betyg till lägst
  printProducts(); //Skriver ut produkterna igen efter sortering
}

// Funktion för att sortera produkter efter kategori
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

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------ Skapa produktlista --------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------

function printProducts() { //Funktion som skriver ut alla produkter på sidan
  productsListing.innerHTML = ''; // Tömmer productListing innan vi lägger till nya produkter

  for (let i = 0; i < filteredProducts.length; i++) { // en loop som går igenom alla produkter
    const product = filteredProducts[i];  //Detta är den aktuella produkten

  //Skapar en HTML-struktur för produkten
  const html = ` 
  <article>
    <img src="${product.img}" alt="${product.alt}" loading="lazy" width="640" height="426">
    <div class="productheader">
      <h3>${product.name}</h3>
    </div>
    <div class="metadata">
      <p>Pris: ${product.price} kr</p>
      <p>Betyg: ${product.rating} / 5</p>
      <p>Kategori: ${product.category}</p>
    </div>
    <div class="controls">
      <button class="decrease" aria-label="Minska antal" data-id="${product.id}">-</button>
      <input type="number" aria-label="Välj antal" id="amount-${product.id}" disabled>
      <button class="increase" aria-label="Öka antal" data-id="${product.id}">+</button>
    </div>
    <button class="buy" data-id="${product.id}">Lägg till</button>
  </article>
  `;
    productsListing.innerHTML += html; //Lägger tiill html i DOM:en
  }

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------ Skapa knappar +/- antal ---------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
/**
 * Skapa en -/+ button och ett inputfält med antal i, som man sedan vid click kunna toggla antalet upp och ned
 * Det ska finnas en lägg till i kundvagnsknapp. 
 * Ge varje produkt ett ID med en siffra för att skilja från andra produkter, ex inte ska krocka med namn om det finns två karameller för olika pris. 
 * Dessa måste ligga i printproducts
*/
const increaseButton = document.querySelectorAll('#products button.increase');
increaseButton.forEach((btn) => {
  btn.addEventListener('click', increaseProductCount);
});

const decreaseButton = document.querySelectorAll('#products button.decrease');
decreaseButton.forEach((btn) => {
  btn.addEventListener('click', decreaseProductCount);
});

// ----------------------------------------------------------------------------------------------------------------------------------
//  ------------------------------------------------------ Skapa köp knapp ----------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
/**
 * Måste också ligga i printproducts funktionen
 * Skapa en köp knapp, som man vid klick lägger till antal godisar i kundvagnen.
 */

const buyButton = document.querySelectorAll('#products button.buy');
console.log(buyButton);
buyButton.forEach((btn) => {
  btn.addEventListener('click', addProductToCart);
});

}

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------ Funktion +/- antal --------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
//Funktion för att öka antalet godisar i input rutan med + knappen
function increaseProductCount(e) {
  const clickedBtnId = e.target.dataset.id;  // Hämtar ID:t från knappen som klickades ex 3
  const input = document.querySelector(`#amount-${clickedBtnId}`); // Hittar rätt input‑fält baserat på ID:t ex #amount-3
  input.value = Number(input.value) + 1; // Säger att inputvärdet ska öka med +1
}

//Funktion för att minska antalet godisar i input rutan med + knappen
function decreaseProductCount(e) {
  const clickedBtnId = e.target.dataset.id;  // Hämtar ID:t från knappen som klickades ex 3
  const input = document.querySelector(`#amount-${clickedBtnId}`); // Hittar rätt input‑fält baserat på ID:t ex #amount-3

  if (Number(input.value) <= 1) { // Om värdet redan är 1 eller mindre ska vi inte minska mer och return stoppar funktionen direkt
    return;
  }

  input.value = Number(input.value) - 1; // Säger att inputvärdet ska minska med -1 om inte det redan är mindre än 1
}

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------ Funktion köp knapp --------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
//Skapa funktion som gör att artikeln läggs in i kundvagnen vid klick och senare antalet.
/**
 * Hur jag behöver tänka. 
 * Skapa ett event vid klick och kalla funktionen addProductToCart. Logga att knappen faktiskt skriver ut vid knappttryck. 
 * Vid knapptryck måste vi hitta vilken produkt det gäller och dess id.
 *  
 * 
 */

function addProductToCart (e) {
  console.log("köp knapp klickad");

  const clickedBtnId = Number(e.target.dataset.id); // Hämta id från knappen
  console.log("Id från knappen", clickedBtnId); //Loggar vilket Id som hämtats från knapptrycket ex 3
  const product = products.find(product => product.id === clickedBtnId); //Söker upp rätt produkt från arrayen baserat på ID
  console.log("hittad produkten i products", product); //Loggar när den hittat hela objektet med namn, pris osv

  if (product === undefined) { // om ingen produkt hittas (undefined) avbryt funktionen
    return;
  }

  const index = cart.findIndex(product => product.id === clickedBtnId); // kolla om produkten redan finns i cart -1 finns det inte i varukorgen och är det 0,1,2.. finns det
  if (index === -1) {
    product.amount = 1;  //om produkten inte finns i cart, sätt första produkten till 1
    cart.push(product); // Lägg till produkten i kundvagnen
  } 
  else {
    cart[index].amount += 1;
  }
  printCart();
}


const cartSection = document.querySelector('#cartsection'); //Hämta hela sektionen som ska visas/gömmas
const cartList = document.querySelector('#cart'); //Hämta själva listhållarn där kundvagnens innehåll ska skrivas ut

//funktion som skriver ut kundvagnens innehåll
function printCart() { 
  cartList.innerHTML = ''; //Om varukorgen är tom visas meddelandet "varukorgen är tom"

  for(let i = 0; i < cart.length; i++) { //Loppar igenom kundvagnen och skriver ut alla produkter i kundvagnen som klickas på
    cartList.innerHTML += `
      <p>${cart[i].name}: ${cart[i].amount} st</p>
    `;
  }
}

const cartButton = document.querySelector('#kundkorg'); //Hämtar knapp som öppnar/stänger kundvagnen 

cartButton.addEventListener('click', () => { // När man klickar på kundvagnen togglas synligheten från hidden till visible
  cartSection.classList.toggle('visible');
  cartSection.classList.toggle('hidden');
});

printProducts(); //skriver ut produkterna på sidan
