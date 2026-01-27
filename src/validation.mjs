// importera till main.js

// ----------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------- RegEx regler ------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// RegEx reglerna definerade för varje fält, vad som räknas som giltliga värden i varje formulär.
// Dessa används senare i valideringsfunktioner
const firstNameRegEx = /^[A-Za-zÅÄÖåäö\s\-]{2,}$/;
const lastNameRegEx = /^[A-Za-zÅÄÖåäö\s\-]{2,}$/;
const adresRegEx = /^.{3,}$/;
const zipRegEx = /^\d{5}$/;
const cityRegEx = /^[A-Za-zÅÄÖåäö\s\-]{2,}$/;
const phoneRegEx = /^07\d{8}$/;
const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ssnRegEx = /^\d{8}-?\d{4}$/;


// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------ Formulärfälten ------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// Hämtar hämtas alla input-element från DOM-trädet, dessa variabler används i valideringsfunktionen
// De används också för att koppla eventlisteners till rätt fält

const firstNameField = document.querySelector('#firstName');
const lastNameField = document.querySelector('#lastName');
const adresField = document.querySelector('#adres');
const zipField = document.querySelector('#zip');
const cityField = document.querySelector('#city');
const phoneField = document.querySelector('#phone');
const emailField = document.querySelector('#email');
const ssnField = document.querySelector('#ssn');
const ssnContainer = document.querySelector('#ssnContainer');
const gdprField = document.querySelector('#gdpr');
const orderBtn = document.querySelector('#orderBtn');

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------ Eventlisteners ------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// När användaren lämnar ett fält (focusout- inte i fokus längre) körs valideringsfunktionen för just det fältet.
// GDPR använder change eftersom det är en checkbox

firstNameField.addEventListener('focusout', validateFirstNameField);
lastNameField.addEventListener('focusout', validateLastNameField);
adresField.addEventListener('focusout', validateAdresField);
zipField.addEventListener('focusout', validateZipField);
cityField.addEventListener('focusout', validateCityField);
phoneField.addEventListener('focusout', validatePhoneField);
emailField.addEventListener('focusout', validateEmailField);
ssnField.addEventListener('focusout', validateSsnField);
gdprField.addEventListener('change', validateGdprField); // GDPR

// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------- Valideringsfunktioner ----------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
/**
 * Varje funktion validerar ett specifikt fält
 * Funktionen hämtar värdet från inoutfältet
 * Testar värdet mot rätt RegEx regel
 * Visa eller döljer felmeddelandet beroende på om värdet är giltligt
 * Returnerr sant eller falskt
 * Det ger användaren feddback direkt när de fyller i formuläret
 */

// Förnamn
function validateFirstNameField() {
  const inputFieldValue = firstNameField.value; // Hämta värdet från input
  const isValidFirstName = firstNameRegEx.test(inputFieldValue); // Testa värdet mot regex

  if (isValidFirstName) {
    firstNameField.nextElementSibling.classList.add('hidden'); // Dölj felmeddelande
  } else {
    firstNameField.nextElementSibling.classList.remove('hidden'); // Visa felmeddelande
  }

  return isValidFirstName; // Returnera true eller false
}

// Efternamn
function validateLastNameField() {
  const inputFieldValue = lastNameField.value; // Hämta värdet från input
  const isValidLastName = lastNameRegEx.test(inputFieldValue); // Testa värdet mot regex

  if (isValidLastName) {
    lastNameField.nextElementSibling.classList.add('hidden'); // Dölj felmeddelande
  } else {
    lastNameField.nextElementSibling.classList.remove('hidden'); // Visa felmeddelande
  }

  return isValidLastName; // Returnera true eller false
}

// Adress
function validateAdresField() {
  const inputFieldValue = adresField.value; // Hämta värdet från input
  const isValidAdres = adresRegEx.test(inputFieldValue); // Testa värdet mot regex

  if (isValidAdres) {
    adresField.nextElementSibling.classList.add('hidden'); // Dölj felmeddelande
  } else {
    adresField.nextElementSibling.classList.remove('hidden'); // Visa felmeddelande
  }

  return isValidAdres; // Returnera true eller false
}

// Postnummer
function validateZipField() {
  const inputFieldValue = zipField.value; // Hämta värdet från input
  const isValidZip = zipRegEx.test(inputFieldValue); // Testa värdet mot regex

  if (isValidZip) {
    zipField.nextElementSibling.classList.add('hidden'); // Dölj felmeddelande
  } else {
    zipField.nextElementSibling.classList.remove('hidden'); // Visa felmeddelande
  }

  return isValidZip; // Returnera true eller false
}

// Stad
function validateCityField() {
  const inputFieldValue = cityField.value; // Hämta värdet från input
  const isValidCity = cityRegEx.test(inputFieldValue); // Testa värdet mot regex

  if (isValidCity) {
    cityField.nextElementSibling.classList.add('hidden'); // Dölj felmeddelande
  } else {
    cityField.nextElementSibling.classList.remove('hidden'); // Visa felmeddelande
  }

  return isValidCity; // Returnera true eller false
}

// Telefonnummer
function validatePhoneField() {
  const inputFieldValue = phoneField.value; // Hämta värdet från input
  const isValidPhone = phoneRegEx.test(inputFieldValue); // Testa värdet mot regex

  if (isValidPhone) {
    phoneField.nextElementSibling.classList.add('hidden'); // Dölj felmeddelande
  } else {
    phoneField.nextElementSibling.classList.remove('hidden'); // Visa felmeddelande
  }

  return isValidPhone; // Returnera true eller false
}

// E-post
function validateEmailField() {
  const inputFieldValue = emailField.value; // Hämta värdet från input
  const isValidEmail = emailRegEx.test(inputFieldValue); // Testa värdet mot regex

  if (isValidEmail) {
    emailField.nextElementSibling.classList.add('hidden'); // Dölj felmeddelande
  } else {
    emailField.nextElementSibling.classList.remove('hidden'); // Visa felmeddelande
  }

  return isValidEmail; // Returnera true eller false
}

// Personnummer (endast om faktura är valt)
function validateSsnField() { // Om personnummerfältet är dolt ska det inte valideras
  if (ssnContainer.classList.contains('hidden')) {
    return true; // Hoppa över validering
  }

  const inputFieldValue = ssnField.value; // Hämta värdet från input
  const isValidSsn = ssnRegEx.test(inputFieldValue); // Testa värdet mot regex

  if (isValidSsn) {
    ssnField.nextElementSibling.classList.add('hidden'); // Dölj felmeddelande
  } else {
    ssnField.nextElementSibling.classList.remove('hidden'); // Visa felmeddelande
  }

  return isValidSsn; // Returnera true eller false
}

// GDPR
function validateGdprField() {
  const isChecked = gdprField.checked; // Kontrollera om checkboxen är ikryssad
  const error = document.querySelector('#gdprError');

  if (isChecked) {
    error.classList.add('hidden'); // Dölj felmeddelande
  } else {
    error.classList.remove('hidden'); // Visa felmeddelande
  }

  return isChecked; // Returnera true eller false
}


// ----------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------- Aktivera/inaktivera beställningsknapp ------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
/**
 * Denna funktion kör efter varje validering
 * Om något fält är ogiltligt avbryts funktionen direkt
 * Om alla fält är giltliga aktiveras knappen
 */

function toggleOrderButtonActive() {
  orderBtn.setAttribute('disabled', 'disabled'); // Stäng av knappen direkt

  const isValidFirstName = validateFirstNameField();
  if (!isValidFirstName) {
    return;
  }
  const isValidLastName = validateLastNameField();
  if (!isValidLastName) {
    return;
  }
  const isValidAdres = validateAdresField();
  if (!isValidAdres) {
    return;
  }
  const isValidZip = validateZipField();
  if (!isValidZip) {
    return;
  }
  const isValidCity = validateCityField();
  if (!isValidCity) {
    return;
  }
  const isValidPhone = validatePhoneField();
  if (!isValidPhone) {
    return;
  }
  const isValidEmail = validateEmailField();
  if (!isValidEmail) {
    return;
  }
  const isValidSsn = validateSsnField();
  if (!isValidSsn) {
    return;
  }
  const isValidGdpr = validateGdprField();
  if (!isValidGdpr) {
    return;
  }
  orderBtn.removeAttribute('disabled'); // Alla fält är giltiga → aktivera knappen
}

// Koppla knappen till alla inputs
document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('focusout', toggleOrderButtonActive);
});

// GDPR måste också trigga knappen
gdprField.addEventListener('change', toggleOrderButtonActive);

export {
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
};