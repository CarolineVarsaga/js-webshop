//===========================================================================================================================
//==================================================------ GLOBAL ------=====================================================
//===========================================================================================================================
//-----------------THEME BUTTON----------------
const themeButton = document.querySelector('#themeButton');

//-----------------CART BUTTON-----------------
const cartButton = document.querySelector('.shopping-cart');
const cartSection = document.querySelector('#cartSection');
const offset = 35;

//----------------HAMBURGER MENU---------------
const menu = document.querySelector(".menu");
const hamburger= document.querySelector(".hamburger");
const closeIcon= document.querySelector(".close-icon");
const menuIcon = document.querySelector(".menu-icon");

//----------------GENERATE DONUTS--------------
const container = document.querySelector('#donutContainer');

//----------------CATEGORY BUTTONS-------------
const categoryButtons = document.querySelectorAll('#buttonContainer button');    

//----------------SORTING BUTTONS---------------
const categorySortButton = document.querySelector('#categoryBtn');
const nameSortButton = document.querySelector('#nameBtn');
const priceSortButton = document.querySelector('#priceBtn');
const ratingSortButton = document.querySelector('#ratingBtn');

//-----------------SHOPPING CART---------------
const today = new Date(); 
let cartHtmlContainer = document.querySelector('#checkOutContainer');
let cartItemsNr = document.querySelector('#cartItemsNr');
let invoiceInput = document.querySelector('.invoice-input'); 
let printMonday = document.querySelector('#printMonday');
let totalSum = 0; 
let totalAmount = 0; 
let shippingCost = 25;

//----------------------FORM--------------------
const invoice = document.querySelector('#paymentInvoice');
const card = document.querySelector('#paymentCard'); 
const invoiceButton = document.querySelector('#paymentInvoiceRadio');
const cardButton = document.querySelector('#paymentCardRadio');
let typingTimer;
const doneTypingInterval = 500; // wait 0.5 seconds after the user stopped typing
let requiredFields = document.querySelectorAll('.required-input'); 
let typeText = document.querySelectorAll('.type-text'); 
const paymentInput = document.querySelectorAll('payment-input'); 

let checkBox = document.querySelector('.checkbox-personal-data');
let orderBtn = document.querySelector('.submit-button');

const firstName = document.querySelector('#firstName');
const firstNameError = document.querySelector('#firstNameError');
const surName = document.querySelector('#surName');
const surNameError = document.querySelector('#surNameError');
const address = document.querySelector('#address');
const addressError = document.querySelector('#addressError');
const zipCode = document.querySelector('#zipCode');
const zipCodeError = document.querySelector('#zipCodeError');
const city = document.querySelector('#city');
const cityError = document.querySelector('#cityError');
const phone = document.querySelector('#phone');
const phoneError = document.querySelector('#phoneError');
const email = document.querySelector('#email');
const emailError = document.querySelector('#emailError');

const textRegex = new RegExp(/^[a-z|A-Z|å|ä|ö|Å|Ä|Ö]{2,}$/);
const addressRegex = new RegExp(/^[a-zA-ZåäöÅÄÖ\s.,-]+ \d+$/);
const zipCodeRegex = new RegExp(/^\d{3}[ ]?\d{2}$/);
const phoneRegex = new RegExp(/^(?:(?:\+|00)46|0)\s?(?:(?:[1-9][0-9])|(?:[1-9]))(?:\s?\d){8}$/);
const emailRegex = new RegExp(/^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/);

const socialSecurityNumber = document.querySelector('#socialSecurityNumber');
const socialSecurityNumberError = document.querySelector('#socialSecurityNumberError');
const socialSecurityNumberRegex = new RegExp((/^(19|20)?[0-9]{2}[- ]?((0[0-9])|(10|11|12))[- ]?(([0-2][0-9])|(3[0-1])|(([7-8][0-9])|(6[1-9])|(9[0-1])))[- ]?[0-9]{4}$/)); 

//--------------RESET AFTER 15 MINUTES-----------
let timerActive = false;
let firstInput = true; 
let timeoutID;
const timeoutTime = 15 * 60 * 1000; 

//---------------CONFIRMATION WINDOW-------------
const confirmationWindow = document.querySelector('.confirmation-window');
const confirmationInfo = document.querySelector('.confirmation-information');

//===========================================================================================================================
//==============================================------ THEME BUTTON ------===================================================
//===========================================================================================================================
function toggleTheme() {
  document.body.classList.toggle('dark-theme');  
}
themeButton.addEventListener('click', toggleTheme);

//===========================================================================================================================
//===============================================------ CART BUTTON ------===================================================
//===========================================================================================================================
function scrollToCart() {
  const targetPosition = cartSection.offsetTop - offset;  //added offset so it stops a little before target
  window.scrollTo({ top: targetPosition, behavior: 'smooth' });
}
cartButton.addEventListener('click', scrollToCart);

//===========================================================================================================================
//============================================------ HAMBURGER MENU ------===================================================
//===========================================================================================================================
function toggleMenu() {
  if (menu.classList.contains("show-menu")) {
    menu.classList.remove("show-menu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("show-menu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}
hamburger.addEventListener("click", toggleMenu);

//===========================================================================================================================
//=============================================------ SHOP ITEMS/OBJECTS ------==============================================
//===========================================================================================================================
const donuts = [
  {
    name: 'Chokladmunk',
    price: 15,
    rating: 4,
    category: 'Choklad',
    id: 0,
    image: {
      src: 'img/chocolate-donut-640x451.jpg',
      alt: 'munk doppad i choklad, täckt med chokladströssel',
      width: '640',
      height: '451',
    },
    amount: 0,        
  },
  {
    name: 'Vaniljmunk med chokladströssel',
    price: 15,
    rating: 3.8,
    category: 'Fyllning',
    id: 1,
    image: {
      src: 'img/chocolate-sprinkles-640x520.jpg',
      alt: 'fylld vaniljmunk toppad med chokladströssel',
      width: '640',
      height: '520',
    },
    amount: 0,
  },
  {
    name: 'Självlysande munk',
    price: 20,
    rating: 4.4,
    category: 'Strössel',
    id: 2,
    image: {
      src: 'img/glowing-donut-640x360.jpg',
      alt: 'munk doppad i självlysande lila glasyr, täckt med lila strössel.',
      width: '640',
      height: '360',
    },
    amount: 0,
  },
  {
    name: 'Lermunk',
    price: 15,
    rating: 1,
    category: 'Choklad',
    id: 3,
    image: {
      src: 'img/mud-donut-640x470.jpg',
      alt: 'munk helt täckt i mörk choklad',
      width: '640',
      height: '470',
    },
    amount: 0,
  },
  {
    name: 'Kalasmunk',
    price: 20,
    rating: 4,
    category: 'Strössel',
    id: 4,
    image: {
      src: 'img/split-donut-640x555.jpg',
      alt: 'munk täckt till hälften med choklad och andra hälften med färgglatt strössel',
      width: '640',
      height: '555',
    },
    amount: 0,
  },
  {
    name: 'Strösselmunk',
    price: 20,
    rating: 4.5,
    category: 'Strössel',
    id: 5,
    image: {
      src: 'img/sprinkles-donut-640x427.jpg',
      alt: 'munk toppad med färgglatt strössel',
      width: '640',
      height: '427',
    },
    amount: 0,
  },
  {
    name: 'Jordgubbsmunk',
    price: 15,
    rating: 3.8,
    category: 'Frukt/Bär',
    id: 6,
    image: {
      src: 'img/strawberry-donut-640x640.jpg',
      alt: 'munk doppad i rosa glasyr med smak av jordgubb',
      width: '640',
      height: '640',
    },
    amount: 0,
  },
  {
    name: 'Sockermunk',
    price: 15,
    rating: 4.3,
    category: 'Naturell',
    id: 7,
    image: {
      src: 'img/sugar-donut-640x520.jpg',
      alt: 'en klassisk munk täckt av strösocker',
      width: '640',
      height: '520',
    },
    amount: 0,
  },
  {
    name: 'Vaniljmunk',
    price: 15,
    rating: 5,
    category: 'Fyllning',
    id: 8,
    image: {
      src: 'img/vanilla-donut-640x420.jpg',
      alt: 'munk fylld med vaniljkräm',
      width: '640',
      height: '420',
    },
    amount: 0,
  },
  {
    name: 'Gårdagens munk',
    price: 10,
    rating: 0.5,
    category: '',
    id: 9,
    image: {
      src: 'img/yesterday-donut-640-448.jpg',
      alt: 'munk som blev bakad igår',
      width: '640',
      height: '448',
    },
    amount: 0,
  },
]

//===========================================================================================================================
//=============================================------ GENERATE DONUTS ------=================================================
//===========================================================================================================================
function generateDonuts(donuts) {
  container.innerHTML = '';
  for (let i = 0; i < donuts.length; i++) {
    container.innerHTML += `
      <article id="donut-${i}" class="donut-article">
        <img src="${donuts[i].image.src}" alt="${donuts[i].image.alt}" width="${donuts[i].image.width}" height="${donuts[i].image.height}" loading="lazy" class="donut-img">
        <div id="donut-div-${i}" class="donut-area">
          <h3 class="donut-heading">${donuts[i].name}</h3>
          <p>Betyg: ${donuts[i].rating}</p>
          <p>Pris: <span id="price-${i}">${donuts[i].price}</span>kr/st</p>
          <div id="buttons-box-${i}" class="buttons-box">
            <button class="button-minus donut-button" data-id="decrease-${i}">-</button>
            <button class="button-plus donut-button" data-id="increase-${i}">+</button>      
          </div>  
          <p>Antal valda: <span class="count-donut" id="count-${i}">${donuts[i].amount}</span></p>        
          <p>Kategori: ${donuts[i].category}</p>
          <p><strong>Summa: </strong><span id="sum-${i}">0</span>kr</p>
        </div>           
      </article>
    `;
  }
  const increaseButtons = Array.from(document.querySelectorAll('.button-plus'));
  const decreaseButtons = Array.from(document.querySelectorAll('.button-minus'));
  
  for (let i = 0; i < increaseButtons.length; i++) {
    increaseButtons[i].addEventListener('click', increaseAmount);
    decreaseButtons[i].addEventListener('click', decreaseAmount);
  }    
} 
generateDonuts(donuts);

//===========================================================================================================================
//==========================================------ PLUS- & MINUS-BUTTONS ------==============================================
//===========================================================================================================================
/**
 x when clicking on plus or minus
 x the amount will update
 x and the price will increase or decrease
 x should not be able to go under 0
*/

function increaseAmount(e) {
  const index = e.currentTarget.dataset.id.replace('increase-', '');
  const product = donuts.find(donut => donut.id === Number(index));
  const count = document.querySelector(`#count-${index}`); 
  let price = donuts[index].price;
  let sum = document.querySelector(`#sum-${index}`);
  let countNumber = Number(count.innerText);

  //increasing the product amount
  product.amount += 1;
  count.innerHTML = countNumber += 1;
  sum.innerHTML = countNumber * price;
  addDonutsToCart();    
}

function decreaseAmount(e) {
  const index = e.currentTarget.dataset.id.replace('decrease-', '');
  const count = document.querySelector(`#count-${index}`); 
  const price = donuts[index].price;
  const product = donuts.find(donut => donut.id === Number(index));
  let sum = document.querySelector(`#sum-${index}`);
  let countNumber = Number(count.innerText);  

  if (countNumber <= 0) {
    return;
  }
  product.amount -= 1; 
  count.innerHTML = countNumber -= 1;
  sum.innerHTML = countNumber * price;
  addDonutsToCart();
} 

//===========================================================================================================================
//=============================================------ CATEGORY BUTTONS ------================================================
//===========================================================================================================================
/** 
 x when pressing a category button 
 x the products with that category will stay visible
 x and the rest will be hidden 
 */

let currentCategory = 'Välj alla kategorier';

function handleClick(e) {
  const clickedCategory = e.target.textContent;

  if (clickedCategory === 'Välj alla kategorier') {
    currentCategory = 'Välj alla kategorier';
    generateDonuts(donuts);
  } else {
    currentCategory = clickedCategory;
    const filteredArray = donuts.filter(item => item.category === currentCategory);
    generateDonuts(filteredArray);
  }
}

for (let i = 0; i < categoryButtons.length; i++) {
  categoryButtons[i].addEventListener('click', handleClick);
}    

//===========================================================================================================================
//==========================================------ SORTING BUTTONS ------====================================================
//===========================================================================================================================

//=======================================================
//===============--- CATEGORY BUTTON ---=================
//=======================================================
function sortedByCategory(category) {
  return [...donuts].filter(item => (currentCategory === 'Välj alla kategorier' || item.category === category)).sort((a, b) => a.category.localeCompare(b.category));
}
function sortedCategory() {
  const sortedArray = sortedByCategory(currentCategory);  
  generateDonuts(sortedArray);
}
categorySortButton.addEventListener('click', sortedCategory);

//=======================================================
//=================--- NAME BUTTON ---===================
//=======================================================
function sortedByName(category) {
  return [...donuts].filter(item => (currentCategory === 'Välj alla kategorier' || item.category === category)).sort((a, b) => a.name.localeCompare(b.name));
} 
function sortedName() {
  const sortedArray = sortedByName(currentCategory);  
  generateDonuts(sortedArray);
}
nameSortButton.addEventListener('click', sortedName);

//=======================================================
//=================--- PRICE BUTTON ---==================
//=======================================================
function sortedByPrice(category) {
  return [...donuts].filter(item => (currentCategory === 'Välj alla kategorier' || item.category === category)).sort((a, b) => a.price - b.price);
}
function sortedPrice() {
  const sortedArray = sortedByPrice(currentCategory);  
  generateDonuts(sortedArray);
}
priceSortButton.addEventListener('click', sortedPrice);

//=======================================================
//================--- RATING BUTTON ---==================
//=======================================================
function sortedByRating(category) {
  return [...donuts].filter(item => (currentCategory === 'Välj alla kategorier' || item.category === category)).sort((a, b) => b.rating - a.rating);
}
function sortedRating() {
  const sortedArray = sortedByRating(currentCategory);  
  generateDonuts(sortedArray);
}
ratingSortButton.addEventListener('click', sortedRating);

//===========================================================================================================================
//===========================================------ SHOPPING CART ------=====================================================
//===========================================================================================================================    

//=======================================================
//=================--- WEEKEND PRICE ---=================
//=======================================================
function getPriceMultiplier() { 
  let multuplier = 1;                                
  if ((today.getDay() === 5 && today.getHours() >= 15) || (today.getDay() === 6) || (today.getDay ()=== 0)  || (today.getDay() === 1 && today.getHours() < 3)) {
    multuplier = 1.15; 
  } 
  return multuplier;  
} 

//=======================================================
//================--- MONDAY DISCOUNT ---================
//=======================================================
function mondayDiscountPrice() {
  if (today.getDay() === 1 && today.getHours() < 10) { 
    totalSum = Math.round(totalSum * 0.9);
    printMonday.innerHTML += '<span>Måndagsrabatt:</span> 10 % på hela beställningen!';    
    printMonday.classList.add('print-monday');
  }
}
  
//=======================================================
//=================--- SHIPPING COST ---=================
//=======================================================
function shipping() {
  let shippingCost =  25 + Math.round(totalSum * 0.1);
  if (totalAmount >= 15) {
    shippingCost = 0; 
  } 
  return shippingCost;
}

//=======================================================
//=======--- NO INVOICE WHEN PRICE ABOVE 800KR ---=======
//=======================================================  
function invoicePriceRule(totalSum) {
  if (totalSum >= 800) {   
    document.querySelector('#paymentInvoiceRadio').disabled = true;
    document.querySelector('.invoice-input').disabled = true; 
    invoiceInput.removeAttribute('required')
    document.querySelector('.invoice-input').value ="";
  } else {
    document.querySelector('#paymentInvoiceRadio').disabled = false;
    document.querySelector('.invoice-input').disabled = false; 
  }
}

//=======================================================
//==============--- CART ICON ANIMATION ---==============
//=======================================================
function removeEnlargedClass() {
  cartItemsNr.classList.remove('enlarge');  
}
function cartCount() {
  cartItemsNr.classList.add('enlarge');
  cartItemsNr.innerHTML += `<p>${totalAmount}</p>`;

  setTimeout(removeEnlargedClass, 400);
}

//=======================================================
//================--- PRODUCT TO CART ---================
//=======================================================
function addDonutsToCart() {
  cartHtmlContainer.innerHTML = '';
  cartItemsNr.innerHTML = '';
  printMonday.innerHTML = '';      
  
  let priceIncrease = getPriceMultiplier();  

  totalSum = 0; 
  totalAmount = 0; 
  shippingCost = 25; 

  donuts.forEach(donut => { 
    if (donut.amount > 0) {      
      let donutPrice = donut.price; 

      if (donut.amount >= 10) {
        donutPrice *= 0.9;
      }
      
      const adjustedDonutPrice = Math.round(donutPrice * priceIncrease);
      totalSum += donut.amount * adjustedDonutPrice;

      const discountMessage = '10% rabatt!';
      
      const donutClass = donut.amount >= 10 ? 'donut-in-cart-price-discount' : '';
      const showDiscountMessage = donut.amount >= 10 ? discountMessage : '';    

      totalAmount += donut.amount;  //the number on the cart icon
      
      cartHtmlContainer.innerHTML += `
        <article class="donut-in-cart">
          <div class="donut-in-cart-img-name">            
            <img class="donut-in-cart-img" src="${donut.image.src}" alt="${donut.image.alt}" width="${donut.image.width}" height="${donut.image.height}">
            <p class="donut-in-cart-name">${donut.name}</p>
          </div>
          <p class="donut-in-cart-amount">${donut.amount}</p>
          <div class="donut-price-and-discount">
            <p class="${donutClass}">${donut.amount * adjustedDonutPrice}kr</p>
            <p class="discount-message">${showDiscountMessage}</p>
          </div>
          <button class="remove-donut-button" onclick="removeDonut('${donut.name}')">Ta bort</button>
        </article>
      `;   

      if (totalAmount > 0) {
        startTimer();
      }
    }
  });
  const initialShippingCost = totalSum === 0 ? 0 : shipping();

  invoicePriceRule(totalSum); 
  mondayDiscountPrice(); 
  
  //=======================================================
  //=================--- PRINT SUMMARY ---=================
  //=======================================================  
  cartHtmlContainer.innerHTML += `
    <div class="summary-container">
      <div class="summary">
        <h3 class="shipping-cost">Frakt: ${shipping()}kr</h3>
        <h3 class="total-sum">Summa: ${totalSum.toString()}kr</h3>
        <h3 class="total-sum-and-shipping">Totalt: ${totalSum + initialShippingCost}kr</h3>
      </div>
    </div>
  `;
  
  if (totalAmount <= 0 && timerActive) {
    clearTimeout(timeoutID);
    timerActive = false; 
  }
  orderConfirmation(); 
  cartCount();
  
}
addDonutsToCart();

//=======================================================
//================--- REMOVE PRODUCT ---=================
//=======================================================
function removeDonut(donutName) {  
  const index = donuts.findIndex(donut => donut.name === donutName);
  if (index !== -1) {
    donuts[index].amount = 0;
  }
  addDonutsToCart();
  generateDonuts(donuts); 
}

//===========================================================================================================================
//================================================------ FORM ------=========================================================
//===========================================================================================================================    
typeText.type = 'text';
zipCode.type = 'number'; 
phone.type = 'tel'; 
email.type = 'email'; 

//=======================================================
//=========--- RADIO BUTTONS CARD OR INVOICE ---=========
//=======================================================
function handleRadioClick() {
  if (document.querySelector('#paymentInvoiceRadio').checked) {
    invoice.style.display = 'block';
    card.style.display = 'none'; 
    let invoiceInput = document.querySelector('.invoice-input'); 
    
    invoiceInput.setAttribute('required', 'required');
    document.querySelectorAll('.card-input').forEach(input => input.value.trim() === '');   
    requiredInputFields(); 
  } else {
    card.style.display = 'block';
    invoice.style.display = 'none'; 
    let invoiceInput = document.querySelector('.invoice-input'); 
    
    invoiceInput.removeAttribute('required')
    document.querySelector('.invoice-input').value = '';
    requiredInputFields();

    socialSecurityNumberError.textContent = '';
    errorText.textContent = '';
  }
} 
const radioButtons = document.querySelectorAll('input[name="radio"]');
radioButtons.forEach(radio => {
  radio.addEventListener('click', handleRadioClick);
});

document.addEventListener('DOMContentLoaded', requiredInputFields);
checkBox.addEventListener('click', requiredInputFields);
orderBtn.addEventListener('click', handleOrderClick);

function handleOrderClick() {
  const invoiceChecked = document.querySelector('#paymentInvoiceRadio').checked;
  if (invoiceChecked) {
    validateSocialSecurityNumber();    
  }
}

//=======================================================
//============--- REQUIRED FIELDS INPUT ---==============
//=======================================================
function handleKeyUp() {
  clearTimeout(typingTimer);  //timer so it wont freeze on every pressed key
  typingTimer = setTimeout(function() {
    requiredInputFields();   //calling requiredInputFields when the user has stopped typing
  }, doneTypingInterval);
}

function requiredInputFields() {
  let requiredFields = document.querySelectorAll('input[required="required"]');
  let checkBox = document.querySelector('.checkbox-personal-data');
  let checkBoxChecked = checkBox.checked;  
 
  requiredFields.forEach(input => {
    input.addEventListener('keyup', handleKeyUp);
  });

  const everyInput = Array.from(requiredFields);
  const everyInputFilled = everyInput.every(input => input.value.trim() !== '');

  everyInput.forEach(input => {
    input.required = true;
  });

  if (everyInputFilled && checkBoxChecked) {      
    orderBtn.disabled = false; 
  } else {
    orderBtn.disabled = true;     
  }
}

const form = document.querySelector('#form'); 

//if checkbox isn't checked, prevent form to be sent when pressing Enter
form.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {    
    if (!document.querySelector('.checkbox-personal-data').checked) {
      e.preventDefault();
    }
  }
});

form.addEventListener('submit', validateRequiredInputs);

//=======================================================
//============--- VALIDATE FIELDS INPUT ---==============
//=======================================================
const errorText = document.querySelector('#errorText');

function checkForError() {
  const errorMessages = document.querySelectorAll('.error-message');
  const hasErrors = Array.from(errorMessages).some(errorMessage => errorMessage.textContent !== '');

  if (hasErrors) {
    errorText.textContent = 'Kunde inte genomföra beställningen. Ett eller flera av fälten innehåller fel. Vänligen kontrollera.';
  } else {
    errorText.textContent = '';
    confirmationWindow.style.display = 'flex'; 
    document.body.classList.add('confirmation-window-open'); //locking the scroll function 
  }
}

function validateRequiredInputs(e) { //validate all required input fields and invoice input if needed
  e.preventDefault();
  
  const invoiceChecked = document.querySelector('#paymentInvoiceRadio').checked;
  if (invoiceChecked) {
    validateDefaultInputs();
    validateSocialSecurityNumber();
  } else {
    validateDefaultInputs();
  }

  checkForError(); 
  if (errorText.textContent) {
    confirmationWindow.style.display = 'none';
  }
}

function validateField(input, regex, errorElement, errorMessage) {
  if (!regex.test(input.value)) {
    input.classList.add('error-input');
    errorElement.textContent = errorMessage;
  } else {
    input.classList.remove('error-input');
    errorElement.textContent = '';
  }
}

function validateDefaultInputs() {  
  validateField(firstName, textRegex, firstNameError, 'Ogiltigt förnamn, minst 2 karaktärer');
  validateField(surName, textRegex, surNameError, 'Ogiltigt efternamn, minst 2 karaktärer');
  validateField(address, addressRegex, addressError, 'Ogiltig adress');
  validateField(zipCode, zipCodeRegex, zipCodeError, 'Ogiltigt postnummer');
  validateField(city, textRegex, cityError, 'Ogiltig postort');
  validateField(phone, phoneRegex, phoneError, 'Ogiltigt mobilnummer');
  validateField(email, emailRegex, emailError, 'Ogiltig e-postadress');

  checkForError();
}

function validateSocialSecurityNumber() {    
  validateField(socialSecurityNumber, socialSecurityNumberRegex, socialSecurityNumberError, 'Ogiltigt personnummer');

  checkForError();
}

//===========================================================================================================================
//=============================================------ RESET BUTTON ------====================================================
//=========================================================================================================================== 
const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', removeOrder);

function clearCart() {
  cartHtmlContainer.innerHTML = '';
  cartItemsNr.innerHTML = '';
  printMonday.innerHTML = '';   

  donuts.forEach(donut => { 
    if (donut.amount > 0) {
      donut.amount = 0; 
    }
  });
  addDonutsToCart(); 
  generateDonuts(donuts); 
}

function removeOrder() {
  const formInputs = document.querySelectorAll('input');
  formInputs.forEach(input => {
    if (input.type) { 
      input.value = '';
      checkBox = document.querySelector('.checkbox-personal-data').checked = false;
      orderBtn.disabled = true; 
      clearCart(); 
    }
  });
}

removeOrder();

//===========================================================================================================================
//========================================------ RESET AFTER 15 MINUTES ------===============================================
//=========================================================================================================================== 
function clearAfter15Minutes() {
  clearCart();
  removeOrder();
  timerActive = false; 
  alert('Du var för långsam att genomföra beställningen. Vänligen försök igen.')
}

function startTimer() {
  if (!timerActive) {
  clearTimeout(timeoutID);
  timeoutID = setTimeout(clearAfter15Minutes, timeoutTime);
  timerActive = true; 
  }
}

function resetTimer() {
  clearTimeout(timeoutID);
  startTimer(); 
}

function clearTimer() {
  if (firstInput) {
  clearTimeout(timeoutID);
  firstInput = false; 
  }
}

const input = document.querySelector('.form-input');
input.addEventListener('input', clearTimer); 

 orderBtn.addEventListener('click', function() {
  resetTimer(timeoutID);
  addDonutsToCart();
}); 

//===========================================================================================================================
//==========================================------ CONFIRMATION WINDOW ------================================================
//=========================================================================================================================== 
function dateToday() {
  const monthNames = [
    "januari", "februari", "mars", "april", "maj", "juni",
    "juli", "augusti", "september", "oktober", "november", "december"
  ];
  const day = today.getDate();
  const monthIndex = today.getMonth();
  const year = today.getFullYear();
  const monthName = monthNames[monthIndex];

  return `${day} ${monthName} ${year},`;
}

function calculateDeliveryTime(minutes) {
  let deliveryTime = new Date(today.getTime() + minutes * 60000);
  let deliveryHours = deliveryTime.getHours().toString().padStart(2, '0');
  let deliveryMinutes = deliveryTime.getMinutes().toString().padStart(2, '0');
  
  if (deliveryTime.getDate() !== today.getDate()) {  //if delivery time passes midnight, change date
    deliveryTime = new Date(today.getTime() + minutes * 60000);
    deliveryTime.setDate(today.getDate() + 1);
  }

  return `${dateToday()} kl.${deliveryHours}:${deliveryMinutes}`;
}

//Delivery in 30 minutes: 
function normalDelivery() {
  return calculateDeliveryTime(30);
}

//Weekend - Delivery in 1,5 hours:
function weekendDelivery() {
  if ((today.getDay() === 6) || (today.getDay ()=== 0)) {
    return calculateDeliveryTime(90);
  }
}

//Night - Delivery in 45 minutes:
function nightDelivery() {
  if (today.getHours() >= 0 && today.getHours() < 5) {
    return calculateDeliveryTime(45);
  }
}

//Friday between 11am and 1pm - Delivery at 3pm:  
function fridayDelivery() {
  if (today.getDate() === 5 && today.getHours() >= 11 && today.getHours() < 13) {
    return '15:00';
  }
}

function deliveryTime() {
  let deliveryMessage = '';

  if (today.getDay() === 5 && today.getHours() >= 11 && today.getHours() < 13) { 
    deliveryMessage = '15:00';
  } else if (today.getDay() === 6 || today.getDay() === 0) {
    deliveryMessage = weekendDelivery();              
  } else if (today.getHours() >= 0 && today.getHours() < 5) { 
    deliveryMessage = nightDelivery();
  } else {
    deliveryMessage = normalDelivery(); 
  }
  return deliveryMessage;
}

//=======================================================
//================--- PAYMENT METHOD ---=================
//=======================================================
function paymentMethod() {
  if (cardButton.checked) {
    confirmationInfo.innerHTML += 'Betalmetod: Kort';
  } else {
    confirmationInfo.innerHTML += 'Betalmetod: Faktura';
  }
}

//=======================================================
//==============--- ORDER INFORMATION ---================
//=======================================================
function orderConfirmation() {
  confirmationInfo.innerHTML = '';
  
  paymentMethod(); 
  deliveryTime(); 
  const initialShippingCost = totalSum === 0 ? 0 : shipping();
  confirmationInfo.innerHTML += `
    <p>Beräknad leverans: ${deliveryTime()}</p>
    <p>Fraktkostnad: ${shipping()}kr</p>
    <p>Summa: ${totalSum.toString()}kr</p>
    <p>Totalsumma: ${totalSum + initialShippingCost}kr</p>
  `;
}
orderConfirmation(); 
invoiceButton.addEventListener('change', orderConfirmation);
cardButton.addEventListener('change', orderConfirmation);

//=======================================================
//================--- CLOSE BUTTON ---===================
//=======================================================
const closeButton = document.querySelector('.confirmation-button');
closeButton.addEventListener('click', function() {
  confirmationWindow.style.display = 'none'; 
  document.body.classList.remove('confirmation-window-open');
  removeOrder();
});