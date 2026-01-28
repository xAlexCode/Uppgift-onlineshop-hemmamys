import './style.scss';
import products from './products.mjs';
import {
  validateFirstNameField,
  validateLastNameField,
  validateAdresField,
  validateZipField,
  validateCityField,
  validatePhoneField,
  validateEmailField,
  validateSsnField,
  validateGdprField,
  toggleOrderButtonActive,
} from './validation.mjs';

/**
 * Flyttade över produkterna till products.mjs för att ge lite struktur i dokumentet och göra det lättare att läsa.
 * Tanken är att varje produkt ska skrivas ut med en HTML-struktur som innehåller:
 * ett h2/h3-element för produktens namn
 * ett p-element för priset
 * metadata som kategori och betyg
 * knappar för att öka/minska antal och lägga till i kundvagnen
 */

const cart = []; // En tom array som fungerar som varukorg

let filteredProducts = Array.from(products); // Skapar en kopia av products arrayen som vi kan filtrera och sortera utan att ändra originalet
const productsListing = document.querySelector('#products'); // Hämtar section elementet med id "products"

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------ Filter knappar ------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------

const filterSweetBtn = document.querySelector('#filterSweetBtn'); // Hämtar knappar för att filtrera produkter
const filterSourBtn = document.querySelector('#filterSourBtn');
const filterChocolateBtn = document.querySelector('#filterChocolateBtn');
const filterShowAllBtn = document.querySelector('#filterShowAllBtn');

filterSweetBtn.addEventListener('click', filterProductListSweetCategory); // Lägger till ett event vid click
filterSourBtn.addEventListener('click', filterProductListSourCategory);
filterChocolateBtn.addEventListener('click', filterProductListChocolateCategory);
filterShowAllBtn.addEventListener('click', filterProductsListShowAll);

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------ Filter funktion -----------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------

// Visar alla produkter (återställer filtreringen)
function filterProductsListShowAll() {
  filteredProducts = Array.from(products);
  printProducts();
}
// Filtrerar fram produkter i kategorin "sött"
function filterProductListSweetCategory() {
  filteredProducts = products.filter((product) => product.category === 'sött');
  printProducts();
}
// Filtrerar fram produkter i kategorin "surt"
function filterProductListSourCategory() {
  filteredProducts = products.filter((product) => product.category === 'surt');
  printProducts();
}
// Filtrerar fram produkter i kategorin "choklad"
function filterProductListChocolateCategory() {
  filteredProducts = products.filter((product) => product.category === 'choklad');
  printProducts();
}

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------  Sortera knappar  ---------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------

const sortByPriceBtn = document.querySelector('#sortPriceBtn'); // Hämtar knapparna för att sortera produkter
const sortByNameBtn = document.querySelector('#sortNameBtn');
const sortRatingBtn = document.querySelector('#sortRatingBtn');
const sortCategoryBtn = document.querySelector('#sortCategoryBtn');

sortByPriceBtn.addEventListener('click', sortByPrice); // Lägger till ett event vid click
sortByNameBtn.addEventListener('click', sortByName);
sortRatingBtn.addEventListener('click', sortByRating);
sortCategoryBtn.addEventListener('click', sortByCategory);

// Funktion för att sortera produkter efter pris (billigast först)
function sortByPrice() {
  filteredProducts.sort((product1, product2) => product1.price - product2.price); // Sorterar filteredProducts arrayen efter billigast pris till dyrast
  printProducts(); // Skriver ut produkterna igen efter sortering
}

// Funktion för att sortera produkter efter namn (alfabetisk ordning)
function sortByName() {
  filteredProducts.sort((product1, product2) => product1.name.localeCompare(product2.name));
  printProducts(); // Skriver ut produkterna igen efter sortering
}

// funktion för att sortera produkter efter betyg (högst först)
function sortByRating() {
  filteredProducts.sort((product1, product2) => product2.rating - product1.rating); // Sorterar filteredProducts arrayen efter högst betyg till lägst
  printProducts(); // Skriver ut produkterna igen efter sortering
}

// Funktion för att sortera produkter efter kategori
function sortByCategory() {
  filteredProducts.sort((product1, product2) => product1.category.localeCompare(product2.category));
  printProducts(); // Skriver ut produkterna igen efter sortering
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

// Funktion som skriver ut alla produkter på sidan
function printProducts() {
  productsListing.innerHTML = ''; // Tömmer productListing innan vi lägger till nya produkter

  for (let i = 0; i < filteredProducts.length; i++) {
    // Loopar igenom alla filtrerade produkter
    const product = filteredProducts[i]; // Detta är den aktuella produkten i loopen

    // Skapar en HTML-struktur för produkten
    const html = ` 
    <article>
      <img src="${product.img}" alt="${product.alt}" loading="lazy" width="640" height="426">
      <div class="product-header">
        <h3>${product.name}</h3>
      </div>

      <div class="metadata">
        <p>Pris: ${product.price} kr</p>
        <p>Betyg: ${product.rating} / 5</p>
        <p>Kategori: ${product.category}</p>
      </div>

      <div class="controls">
        <label for="amount-${product.id}" class="amount-label">Välj antal:</label>
          <div class="control-container">
           <button class="decrease" aria-label="Minska antal" data-id="${product.id}">-</button>
           <input type="number" value="0" aria-label="Välj antal" id="amount-${product.id}" disabled>
           <button class="increase" aria-label="Öka antal" data-id="${product.id}">+</button>
          </div>
      </div>
      
      <button class="buy" data-id="${product.id}">Lägg till</button>
    </article>
  `;
    productsListing.innerHTML += html; // Lägger tiill html i DOM:en
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
  buyButton.forEach((btn) => {
    btn.addEventListener('click', addProductToCart);
  });
}

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------ Funktion +/- antal --------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// Funktion för att öka antalet godisar i input rutan med + knappen
function increaseProductCount(e) {
  const clickedBtnId = e.target.dataset.id; // Hämtar ID:t från knappen som klickades ex 3
  const input = document.querySelector(`#amount-${clickedBtnId}`); // Hittar rätt input‑fält baserat på ID:t ex #amount-3
  input.value = Number(input.value) + 1; // Säger att inputvärdet ska öka med +1
}

// Funktion för att minska antalet godisar i input rutan med + knappen
function decreaseProductCount(e) {
  const clickedBtnId = e.target.dataset.id; // Hämtar ID:t från knappen som klickades ex 3
  const input = document.querySelector(`#amount-${clickedBtnId}`); // Hittar rätt input‑fält baserat på ID:t ex #amount-3

  let amount = Number(input.value) - 1; // Om värdet redan är 1 eller mindre ska vi inte minska mer och return stoppar funktionen direkt
  if (amount < 0) {
    amount = 0;
  }
  input.value = amount;
}

// ----------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------- Funktion lägg till produkt i kundvagn ----------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// Skapa funktion som gör att artikeln läggs in i kundvagnen vid klick och senare antalet.
/**
 * Skapa ett event vid klick och kalla funktionen addProductToCart.
 * Logga att köp knappen faktiskt skriver ut vid knappttryck.
 * Vid knapptryck måste vi hitta vilken produkt det gäller och dess id.
 * Leta upp produkten i listan med id, om ingen produkt hittas return/avbryt
 * Hämta input-fältet med antal, läs av hur många produkter det är, är det mindre än 1 avbryt
 * Kontrollera om produkten finns i kundvagnen
 * Uppdatera totalsumman i kundvagnen och skriv ut på nytt
 */

// Funktion som lägger till en produkt i kundvagnen när användaren klickar på "köp"
function addProductToCart(e) {
  // console.log('köp knapp klickad');

  const clickedBtnId = Number(e.target.dataset.id); // Hämta id från knappen som klickades
  // console.log('Id från knappen', clickedBtnId); // Loggar vilket Id som hämtats från knapptrycket ex 3
  const product = products.find((product) => product.id === clickedBtnId); // Söker upp rätt produkt från arrayen baserat på ID
  // console.log('hittad produkten i products', product); // Loggar när den hittat hela objektet med namn, pris osv

  if (product === undefined) {
    // om ingen produkt hittas (undefined) avbryt funktionen
    return;
  }

  // Kolla hur många produkter kunden vill beställa från input-fältet och hämta listan
  const inputField = document.querySelector(`#amount-${clickedBtnId}`);
  let amount = Number(inputField.value);
  if (amount < 1) {
    // Om antalet är mindre än 1 avbryt
    return;
  }

  inputField.value = 0; // återställ input-fältet till 0 efter tryck på köp

  const index = cart.findIndex((product) => product.id === clickedBtnId); // kolla om produkten redan finns i cart -1 finns det inte i varukorgen och är det 0,1,2.. finns det
  if (index === -1) {
    // om produkten inte finns i cart, sätt första produkten till 1
    product.amount = amount;
    cart.push(product); // Lägg till produkten i kundvagnen
  } else {
    product.amount += amount; // Produkten finns redan, öka antalet
  }

  updateCartTotals(); // Uppdatera totalsumman och skriv ut i kundvagnen igen
  printCart();
  printCheckoutCart();
  updateCheckoutTotal();
}


// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------- Funktion uppdatera pris i kundvagnen och specialregel --------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
/**
 * updateCartTotals()
 * Räknar ut varuvärdet (pris * antal) och antal produkter och slutgiltlig totalsumma
 *
 * SPECIALREGEL mängdrabatt (10% om man köper 10 eller fler av samma produkt)
 * SPECIALREGEL måndagsrabatt (10% måndag före kl 10)
 * SPECIALREGEL frakt (25 kr + 10% av varuvärdet, eller fri frakt vid >15 produkter)
 *
 * Uppdaterat så rabatt och frakt tillkommer under checkoutSectionen men INTE varukorgen.
 */

const cartTotalElement = document.querySelector('#cartTotal');// Hämtar elementet som visar totalsumman i varukorgen

/**
 * updateCartTotal ska räkna ut
 * varuvärdet som ska vara i varukorgen och checkout
 * den ska räkna ut antal produkter
 * Men den ska lägga till fraktkostnad, rabattkod och slutgiltlig totalsumma i checkout/sammanfattningen (kallar det olika)
 *
 * Sist ska varukorgen och checkouten uppdateras med rätt värden
 */

// Räkna ut varuvärdet och antal produkter i varukorgen
function updateCartTotals() {
  let cartTotal = 0; // Varuvärdet (summan av priset * antal)
  let productCount = 0; // Totala antal produkter i varukorgen
  let bulkDiscount = 0; // total mängdrabatt (om man köper mer än 10)

  // Räkna ihop totalsumma och antal produkter
  for (let i = 0; i < cart.length; i++) { // Loopar igenom varukorgen
    let price = cart[i].price; // Grundpris per produkt

    // "SPECIALREGEL" 10% om det är 10 eller fler av SAMMA produkt i varukorgen
    if (cart[i].amount >= 10) {
      const discountForThisProduct = cart[i].price * 0.1 * cart[i].amount;
      bulkDiscount += discountForThisProduct; // Lägg till rabatt för denna produkt
      price *= 0.9; // Sänk priset med 10%
    }

    cartTotal += price * cart[i].amount; // Lägger till pris * antal
    productCount += cart[i].amount; // Lägger till antal produkter
  }

  // "SPECIALREGEL" Räkna ut rabatt (måndag före 10)
  const date = new Date();
  const MONDAY = 1;
  let discount = 0; // Rabatten är 0 till att börja med
  // Om det är måndag och klockan är före kl 10 får man 10% rabatt i checkout/sammanfattningen
  if (date.getDay() === MONDAY && date.getHours() < 10) {
    discount = cartTotal * 0.1;
  }

  // "SPECIALREGEL" Räkna ut fri frakt om det är fler än 15 produkter
  let shipping = 0; // Börjar med 0 tills varor lagts till
  if (productCount > 15) { // Om det är mer än 15 produkter frakt = 0 kr
    shipping = 0;
  } else {
    shipping = 25 + cartTotal * 0.1; // Om det inte är mer än 15 produkter läggs det på frakt på 25 kr och ett påslag på 10% av varukorgens värde (varuvärdet)
  }
  // Om kundvagnen är tom ska ingen frakt räknas ut
  if (productCount === 0) {
    shipping = 0;
  }


  // Räkna ut slutlgiltlig totalsumma
  const finalTotal = cartTotal - discount + shipping; // vad kunden totalt ska betala genoom att ta varuvärdet minus eventuell rabatt plus fraktkostnaden

  // "SPECIALREGEL" Faktura får inte väljas om totalsumman överstiger 800 kr så kunden endast kan betala med kort
  // Denna regel körs efter att slutpriset (finalTotal) har beräknats
  const invoiceOption = document.querySelector('#invoice');

  if (invoiceOption) {
    if (finalTotal > 800) { // Om finalTotal är mer än 800kr ska faktura alternativet inaktiveras (disabled)
      invoiceOption.disabled = true;
    } else {
      invoiceOption.disabled = false; // Om inte det överstiger 800kr är den fortfarande enabled
    }
  }
  // Uppdatera totalsumman i varukorgen
  cartTotalElement.textContent = `${finalTotal.toFixed(0)} kr`; // Skriver ut den slutgiltiga totalsumman i kundvagnen (finalTotal) som text och toFixed(0) rundar upp till heltal (slipper decimaler)

  // Uppdatera checkout värden
  const checkoutTotal = document.querySelector('#checkoutTotal'); // Hämtar elementet där totalsumman i checkout ska visas
  const checkoutDiscount = document.querySelector('#checkoutDiscount'); // Hämtar elementet där eventuell måndagsrabatt ska visas
  const checkoutShipping = document.querySelector('#checkoutShipping'); // Hämtar elementet där fraktkostnaden ska visas

  // Totalsumma i checkout
  if (checkoutTotal) {
    checkoutTotal.textContent = `${finalTotal.toFixed(0)} kr`; // Om checkoutTotal elementet finns skriv ut slutgiltliga totalsumman
  }

  // Rabatt i checkout SPECIALREGEL MÅNDAGSRABATT
  if (checkoutDiscount) { // Om rabatt elementet finns
    if (discount > 0) { // Om måndagsrabatten är aktiv
      checkoutDiscount.textContent = `Måndagsrabatt 10%: ${discount.toFixed(0)} kr`; // Visa rabatt texten och hur mycket rabatten är i kr (10%)
    } else {
      checkoutDiscount.textContent = ''; // Om inte rabatt finns, visa ingen text
    }
  }

  // Frakt i checkout SPECIALREGEL FRAKT
  if (checkoutShipping) { // Om frakt element finns, skriv ut fraktkostnaden
    checkoutShipping.textContent = `Frakt: ${shipping.toFixed(0)} kr`; // Visa fraktkostnaden (0 kr om fri frakt) och här används toFixed också för att ta bort decimaler
  }

  // SPECIALREGEL MÄNGDRABATT
  const checkoutBulkDiscount = document.querySelector('#checkoutBulkDiscount'); // Hämta element där mängdrabatt ska synas

  if (checkoutBulkDiscount) {
    if (bulkDiscount > 0) { // Om man får mängdrabatt (10% vid 10+ av samma produkt)
      checkoutBulkDiscount.textContent = `Mängdrabatt 10%: - ${bulkDiscount.toFixed(0)} kr`; // Visa mängdrabatten
    } else {
      checkoutBulkDiscount.textContent = ''; // Om ingen mängdrabatt gället, visa ingen text
    }
  }

  highlightCartTotal(); // ändrar färg på totalsumman vid tillläggning eller borttagning av varor i kundvagnen
}
// ----------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------- Funktion highlight köpsumma --------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
/**
 * Lägga till highlights på totalsumman i kundvagnen
 * Lägg till en CSS-klass (highlight-price) på elementet som visar totalsumman i kundvagnen
 * Sätt en timer på 1 sek
 * När timern går ut kör funktionen removeCartTotalHighlight som tar bort css-klassen
 */

// Lägger till highlight på totalsumman
function highlightCartTotal() {
  cartTotalElement.classList.add('highlight-price'); // Detta lägger till CSS-klassen som ändrar färg på texten

  const SECONDS_IN_MS = 1000; // Tidsberäkning 1 sekund i milisekunder
  const SECONDS = 1; // Tidsberäkning 1 sekund
  setTimeout(removeCartTotalHighlight, SECONDS_IN_MS * SECONDS); // Tar bort highlight efter 1 sekund
}

// Tar bort highlight från totalsumman
function removeCartTotalHighlight() {
  cartTotalElement.classList.remove('highlight-price'); // tar bort CSS-klassen så highlight effekten försvinner
}
// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------- Kundvagnen + specialregel helgpåslag 15% ---------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
/**
 * Skapa en html struktur med kundvagnens innehåll som hamnar i DOM-trädet
 * Det ska finnas produktens namn, pris, knapp för att öka/minska/radera, totalpris
 * Koppla ihop +/+ och radera knapparna med eventlisteners för att kunna öka och minska och radera innehållet
 *
 * SPECIALREGEL med helgpåslag 15%
 * Alla produkter i kategorin sött får ett helgpåslag 15% om det är:
 * Fredag efter kl 15
 * lördag och söndag hela dagen
 * Måndag fram till kl 03
 * Påslager ska endast synas i checkout inte i produktlistan
 */
const cartSection = document.querySelector('#cartSection'); // Hämta hela sektionen som ska visas/gömmas
const cartList = document.querySelector('#cart'); // Hämta själva list containern där kundvagnens innehåll ska skrivas ut

// Funktion som skriver ut kundvagnens innehåll
function printCart() {
  cartList.innerHTML = ''; // Tömmer listan  innan den skrivs ut igen och om varukorgen är tom visas meddelandet "varukorgen är tom"

  for (let i = 0; i < cart.length; i++) { // Loppar igenom kundvagnen och skriver ut alla produkter i kundvagnen som klickas på
    // SPECIALREGEL HELGPÅSLAG 15% PÅ kategorin med sött
    let price = cart[i].price; // Grundpriset

    const now = new Date();
    const day = now.getDay(); // 0 = söndag, 1 = måndag, 5 = fredag räknas från 0 till 6
    const hour = now.getHours();

    // kontrollerar om helgpåslaget ska vara aktiv
    if (cart[i].category === 'sött' && ( // Gäller endast kategorin sött
      (day === 5 && hour >= 15) || // fredag efter kl15
      day === 6 || // lördag
      day === 0 || // söndag
      (day === 1 && hour < 3) // måndag före 03
    )
    ) {
      price *= 1.15; // Lägg till ett påslag på 15%
    }

    const productSum = price * cart[i].amount; // Räkna ut totalpriset för just denna produkten i kundvagnen

    // HTML för produkten i varukorgslistan
    cartList.innerHTML += `
      <article class="cart-item">
        <span class="cart-name">${cart[i].name}</span>

        <div class="cart-controls">
          <button data-id="${cart[i].id}" class="decrease-cart-product">-</button>
          <span class="cart-amount">${cart[i].amount} st</span>
          <button data-id="${cart[i].id}" class="increase-cart-product">+</button>
        </div>

        <span class="cart-price">${productSum.toFixed(0)} kr</span> 
        <button data-id="${i}" class="delete-product">Radera</button>
      </article>
    `;
  }

  // ----------------------------------------------------------------------------------------------------------------------------------
  // ------------------------------------------- Knappar som +/- och raderar i kundvagnen ---------------------------------------------
  // ----------------------------------------------------------------------------------------------------------------------------------
  // Kopplar eventlisteners till knapparna +/-/radera i kundvagnen/korgen

  const cartDecreaseButtons = document.querySelectorAll('button.decrease-cart-product');
  cartDecreaseButtons.forEach((btn) => {
    btn.addEventListener('click', decreaseProductFromCart);
  });

  const cartIncreaseButtons = document.querySelectorAll('button.increase-cart-product');
  cartIncreaseButtons.forEach((btn) => {
    btn.addEventListener('click', increaseProductFromCart);
  });

  const deleteButtons = document.querySelectorAll('button.delete-product');
  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', deleteProductFromCart);
  });
}

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------- Knapparna kopplas till checkoutSection ----------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
/**
 * Skriver ut varukorgen i checkout sectionen
 * Då checkout i detta fall använder samma knappar som varukorgen (öka,minska,radera),
 * kopplas eventlisteners om varje gång checkout uppdateras
 */

function printCheckoutCart() {
  const checkoutCart = document.querySelector('#checkoutCart'); // Hämta checkout lista
  checkoutCart.innerHTML = cartList.innerHTML; // Kopiera HTML från varukorgen

  // Koppla minus-knappen igen i checkout
  checkoutCart.querySelectorAll('.decrease-cart-product')
    .forEach((btn) => btn.addEventListener('click', decreaseProductFromCart));
  // Koppla plus-knappen igen i checkout
  checkoutCart.querySelectorAll('.increase-cart-product')
    .forEach((btn) => btn.addEventListener('click', increaseProductFromCart));
  // Koppla radera-knappen igen i checkout
  checkoutCart.querySelectorAll('.delete-product')
    .forEach((btn) => btn.addEventListener('click', deleteProductFromCart));
}
// Uppdatera totalsumman i checkout genom att kopiera värdet från varukorgens totalsumma
function updateCheckoutTotal() {
  const checkoutTotal = document.querySelector('#checkoutTotal'); // Hämta checkout-total
  checkoutTotal.textContent = cartTotalElement.textContent; // Kopiera totalsumman
}
// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------- Funktioner som +/- och raderar i kundvagnen --------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
/**
 * Minska antalet av en produkt i varukorgen och ta bort om antalet är 0
 * Öka antalet av en produkt i varukorgen
 * Radera/ta bort en produkt ur varukorgen
 */

// Minska antal
function decreaseProductFromCart(e) {
  const rowId = Number(e.target.dataset.id); // Hämta produktens id
  const product = cart.find((product) => product.id === rowId); // Hitta produkten i kundvagnen

  product.amount -= 1; // Minskar antalet

  // Om antalet blir 0, ta bort produkten helt ur kundvagnen
  if (product.amount <= 0) {
    const index = cart.findIndex((product) => product.id === rowId);
    cart.splice(index, 1);
  }
  printCart(); // Uppdatera varukorgen
  updateCartTotals(); // Räkna om totalsumman
  printCheckoutCart(); // Uppdatera checkout-listan
  updateCheckoutTotal(); // Uppdatera checkout-total
}
// Öka antal
function increaseProductFromCart(e) {
  const rowId = Number(e.target.dataset.id);
  const product = cart.find((product) => product.id === rowId);

  product.amount += 1; // Ökar antalet

  printCart(); // Uppdatera varukorgen
  updateCartTotals(); // Räkna om totalsumman
  printCheckoutCart(); // Uppdatera checkout-listan
  updateCheckoutTotal(); // Uppdatera checkout-total
}
// Ta bort en produkt
function deleteProductFromCart(e) {
  const rowId = Number(e.target.dataset.id); // Hämtar produktens index i arrayen

  cart.splice(rowId, 1); // Tar bort produkten helt ur kundvagnen

  printCart(); // Uppdatera varukorgen
  updateCartTotals(); // Räkna om totalsumman
  printCheckoutCart(); // Uppdatera checkout-listan
  updateCheckoutTotal(); // Uppdatera checkout-total
}

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------ Varukorgsknapp som är hidden/visible --------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// Med Idt till kundkorgen så döljs och visas kundvagnen med knapp tryck på varukorg
const cartButton = document.querySelector('#cartButton'); // Hämtar knapp som öppnar/stänger kundvagnen

cartButton.addEventListener('click', () => {
  // När man klickar på varukorg togglas synligheten från hidden till visible
  cartSection.classList.toggle('visible');
  cartSection.classList.toggle('hidden');
});

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------ Beställningsformulär som är hidden/visible --------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
/**
 * Hantera visning av beställningsformuläret (checkout) och kundvagnen
 * När man klickar på Kassa knappen döljs varukorgen och checkout visas
 * När man klickar på tillbaka knappen döljs checkout och varukorgen visas
 *
 * Specialregeln med timer som startas när man klickar på kassan så tömmer formuläret och varukorg/checkout efter 15 min
 * Man får en alert som säger att du var för långsam och tömmer formuläret
 */
let checkoutTimeout; // Används för att starta/stoppa 15 min timern

// Kassa knappen ska leda till beställningsformuläret och även kunna på knapptryck gå tillbaka
const checkoutBtn = document.querySelector('.checkoutBtn'); // Hämtar checkout knappen
const checkoutSection = document.querySelector('#checkoutSection'); // Hämtar beställningsformuläret
const backToCart = document.querySelector('#backToCart'); // Hämtar knappen som går tillbaka till varukorgen

checkoutBtn.addEventListener('click', () => {
  // När man klickar på kassa togglas synligheten från hidden till visible
  cartSection.classList.remove('visible');
  cartSection.classList.add('hidden');

  checkoutSection.classList.remove('hidden'); // Visa checkout
  printCheckoutCart(); // Skriver ut varorna i checkout
  updateCheckoutTotal(); // Uppdaterar totalsumman

  // Startar en timer på 15 min
  checkoutTimeout = setTimeout(() => {
    // Först töms varukorgen
    cart.length = 0;
    printCart();
    updateCartTotals();
    printCheckoutCart();

    resetOrderForm(); // Sedan töms formuläret

    updateCartTotals();// Uppdatera totalsumman EFTER att allt är rensat ANNARS ligger frakten kvar


    alert('Du var för långsam! Beställningen har rensats.'); // Alert som poppar upp och säger att du var för långsam

    checkoutSection.classList.add('hidden'); // Gå tillbaka till varukorgen och gömmer checkoutsection igen
    cartSection.classList.remove('hidden');
  }, 15 * 60 * 1000); // 15 minuter
});

backToCart.addEventListener('click', () => { // När man klickar på tillbaka knappen så ändras döljs checkoutsection och cartsection blir synlig igen, samt shopen generellt
  clearTimeout(checkoutTimeout); // STOPPAR timern på 15 min när man klickar tillbaka

  checkoutSection.classList.add('hidden');
  cartSection.classList.remove('hidden');
});

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------- Kort och Faktura som är hidden/visible -----------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
/**
 * Hanterar visning av betalningsalternativ
 *
 * När man väljer radiobutton faktura visas fältet för personnummer och gömmer kortuppgifter
 * När man väljer radiobutton kort visas fälten för kortuppgifter och gömmer personummer
 */


const paymentOptions = document.querySelectorAll('input[name="invoiceOrCard"]'); // Hämtar radioknappar som tillhör betalningsalternativen
const ssnContainer = document.querySelector('#ssnContainer'); // Hämta containern för personnummer
const cardContainer = document.querySelector('#cardContainer'); // Hämta containern för kortuppgifter

paymentOptions.forEach((option) => { // Lyssnar på change/bytet i betalningsalternativen
  option.addEventListener('change', () => {
    if (option.value === 'invoice') { // Om man väljer faktura, visas personnummer
      ssnContainer.classList.remove('hidden');
      cardContainer.classList.add('hidden'); // Gömmer kortuppgifter
    } else {
      ssnContainer.classList.add('hidden'); // Om man väljer kort, visas kortuppgifter
      cardContainer.classList.remove('hidden'); // Gömmer personnummer
    }

    // Uppdatera valideringen efter växling så att rätt fält måste fyllas i
    toggleOrderButtonActive();
  });
});

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------- Knappen som reset beställningsform och kundvagn --------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
/**
 * Här hämtar vi rensa beställning funktionen
 * När användaren klickar på knappen rensas både varukorgen, checkout och alla ev felmeddelanden
 * Det återställer beställningsflödet
 */
// Hämtar knappen för att rensa formuläret och kundvagnen
const resetOrderBtn = document.querySelector('#resetOrder');
resetOrderBtn.addEventListener('click', resetOrderForm); // Kopplar knappen till funktionen som rensar allt

// Funktion som rensar kundvagnen och formuläret
function resetOrderForm() {
  cart.length = 0; // Tar bort alla produkter ur kundvagnen
  printCart(); // Uppdaterar kundvagnsvyn så den blir tom
  updateCartTotals(); // Räknar om totalsumman (blir 0 kr)
  printCheckoutCart(); // Uppdaterar checkoutlistan (blir tom)

  const form = document.querySelector('#checkoutForm'); // Återställning av formuläret
  form.reset(); // Tömmer alla inputfält i checkout-formuläret

  document.querySelectorAll('.error').forEach((error) => { // Döljer alla felmeddelanden
    error.classList.add('hidden'); // Tar bort synliga valilderingsfel
  });
}
printProducts(); // skriver ut produkterna på sidan
