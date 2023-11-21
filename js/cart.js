const USER_ID = 25801;
const CART_URL = "https://japceibal.github.io/emercado-api/user_cart/" + USER_ID + ".json";
let completeCart = JSON.parse(localStorage.getItem("completeCart")) || [];
const cartContainer = document.querySelector("#product-data");
const currencytype = document.querySelector("#currency");
const totalPrice = document.querySelector("#totalPrice");
const currencySelect = document.querySelector("#currency");
const pesosToUSD = 0.039; // 1 UYU = 0.039 USD
const USDtoPesos = 1 / pesosToUSD; // 1 USD = 1 / 0.039 UYU
const defCurrency = "pesos"; // Moneda predeterminada
currencySelect.value = defCurrency; // Establece la moneda predeterminada en el select
const radioButtons = document.querySelectorAll('input[name="opcion"]');

fetch(CART_URL)
  .then((response) => response.json())
  .then((serverCart) => {
    const serverProductData = serverCart.articles;

    const localProductsToDelete = [];
    for (const serverProduct of serverProductData) {
      const localProductIndex = completeCart.findIndex(
        (localProduct) => localProduct.id === serverProduct.id
      );
      if (localProductIndex !== -1) {
        localProductsToDelete.push(localProductIndex);
      }
    }
    for (const index of localProductsToDelete) {
      completeCart.splice(index, 1);
    }

    completeCart = completeCart.concat(serverProductData);

    if (completeCart.length > 0) {
      completeCart.forEach((product, id) => {
        const name = product.name;
        const cost = product.unitCost;
        const count = product.count;
        const currency = product.currency;
        const imageUrl = product.image;

        const productHtml = `
          <tr class="product">
            <td class="d-none d-sm-table-cell"><img class="imgCart" src="${imageUrl}" alt="${name}"></td>
            <td>${name}</td>
            <td class="d-none d-sm-table-cell">${currency} ${cost}</td>
            <td>
              <input 
                type="number" 
                class="quantity-input" 
                value="${count}" 
                min="1" 
                oninput="updateQuantity(${product.id}, event)">
            </td>
            <td>${currency}
              <p id="subtotal-${product.id}">${count * cost}</p>
            </td>
            <td>
              <button class="btn-close" aria-label="Close" onclick="remove(${product.id})"></button>
            </td>
          </tr>
        `;
        cartContainer.innerHTML += productHtml;
      });
    } else {
      cartContainer.innerHTML = "El carrito está vacío.";
    }
    updateTotal();
  })
  .catch((error) => {
    console.error("Error al obtener el carrito del servidor:", error);
  });
radioButtons.forEach((radio) => {
  radio.addEventListener("change", updateTotal);
});

function remove(productId) {
  const productIndex = completeCart.findIndex(
    (product) => product.id === productId
  );

  if (productIndex !== -1) {
    completeCart.splice(productIndex, 1);
    localStorage.setItem("completeCart", JSON.stringify(completeCart));
  }
  updateTotal();
  window.location.href = window.location.href;
}

function updateQuantity(productId, event) {
  const newQuantity = event.target.value; // Nuevo valor de la cantidad

  // Buscar el producto en completeCart por su ID
  const productIndex = completeCart.findIndex(
    (product) => product.id === productId
  );

  if (productIndex !== -1) {
    // Si se encuentra el producto, actualizar la cantidad
    completeCart[productIndex].count = parseInt(newQuantity);

    // Realizar la multiplicación de count y cost para obtener el subtotal
    const product = completeCart[productIndex];
    const subtotal = product.count * product.unitCost;

    // Actualizar el carrito en el localStorage
    localStorage.setItem("completeCart", JSON.stringify(completeCart));

    // Actualizar el elemento HTML que muestra el subtotal
    const subtotalElement = document.querySelector(`#subtotal-${productId}`);
    subtotalElement.textContent = subtotal;
    updateTotal();
  } else {
    // Manejo de error si el producto no se encuentra
    console.error("Producto no encontrado en el completeCart.");
  }
}

function updateTotalPrice() {
  totalPrice.textContent = "";
  let total = 0;

  // Iterar sobre los productos en completeCart
  for (const product of completeCart) {
    total += product.count * product.unitCost;
  }
}

currencySelect.addEventListener("change", updateTotal);

function updateTotal() {
  const selectedCurrency = currencySelect.value;
  const totalInSelectedCurrency = calculateTotalInSelectedCurrency(selectedCurrency);
  const selectedRadioButton = Array.from(radioButtons).find(
    (radio) => radio.checked
  );
  const percentage = parseFloat(selectedRadioButton.value);

  const totalWithPercentage =
    totalInSelectedCurrency + totalInSelectedCurrency * (percentage / 100);
  const costoEnvioValue = Math.round(
    totalInSelectedCurrency * (percentage / 100)
  );

  const subTotal = document.querySelector("#subTotal");
  subTotal.textContent = totalInSelectedCurrency;

  const costoEnvio = document.querySelector("#costoEnvio");
  costoEnvio.textContent = costoEnvioValue;

  const totalPrice = document.querySelector("#totalPrice");
  totalPrice.textContent = totalWithPercentage;
}

function calculateTotalInSelectedCurrency(selectedCurrency) {
  let total = 0;

  completeCart.forEach((product) => {
    if (product.currency === "USD" && selectedCurrency === "pesos") {
      total += product.unitCost * USDtoPesos * product.count;
    } else if (product.currency === "UYU" && selectedCurrency === "USD") {
      total += product.unitCost * pesosToUSD * product.count;
    } else {
      total += product.unitCost * product.count;
    }
  });

  return Math.round(total); // Redondear el total antes de devolverlo
}

function togglePaymentMethod(radio) {
  const cardNumberInput = document.querySelector("#cardNumber");
  const securityCodeInput = document.querySelector("#securityCode");
  const expirationDateInput = document.querySelector("#expirationDate");
  const accountNumberInput = document.querySelector("#accountNumber");
  if (radio.value === "creditCard") {
    cardNumberInput.disabled = false;
    securityCodeInput.disabled = false;
    expirationDateInput.disabled = false;
    accountNumberInput.disabled = true;
  }
  if (radio.value === "bankTransfer") {
    cardNumberInput.disabled = true;
    securityCodeInput.disabled = true;
    expirationDateInput.disabled = true;
    accountNumberInput.disabled = false;
  }
}

function formatCard(element) {
  let trimmed = element.value.replace(/\s+/g, "");
  let formatted = "";
  for (let i = 0; i < trimmed.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formatted += " ";
    }
    formatted += trimmed[i];
  }
  element.value = formatted;
}

// Obtén la fecha actual en formato ISO (AAAA-MM-DD)
const today = new Date().toISOString().split("T")[0];

const expirationDateInput = document.querySelector("#expirationDate");

// Establece la fecha mínima
expirationDateInput.setAttribute("min", today);

// Validacines Bootstrap
(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()