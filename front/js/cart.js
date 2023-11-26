const USER_ID = 25801;
const CART_URL = `http://localhost:3000/api/user/${USER_ID}/cart`;
const token = localStorage.getItem("token");
let completeCart = [];
const cartContainer = document.querySelector("#product-data");
const currencytype = document.querySelector("#currency");
const totalPrice = document.querySelector("#totalPrice");
const currencySelect = document.querySelector("#currency");
const pesosToUSD = 0.039; // 1 UYU = 0.039 USD
const USDtoPesos = 1 / pesosToUSD; // 1 USD = 1 / 0.039 UYU
const defCurrency = "pesos"; // Moneda predeterminada
currencySelect.value = defCurrency; // Establece la moneda predeterminada en el select
const radioButtons = document.querySelectorAll('input[name="opcion"]');

// Función para actualizar el carrito y la interfaz de usuario
function updateCartAndUI() {
  fetch(CART_URL, {
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((response) => response.json())
    .then((serverCart) => {
      completeCart = serverCart.articles;
      updateUIWithCartData(completeCart);
    })
    .catch((error) => {
      console.error("Error al obtener el carrito del servidor:", error);
    });
}

// Actualizar el carrito y la interfaz de usuario al cargar la página
updateCartAndUI();

function remove(productId) {
  fetch(`http://localhost:3000/api/user/${USER_ID}/cart/remove/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      updateCartAndUI(); // Actualizar el carrito y la interfaz después de eliminar
    })
    .catch((error) => {
      console.error("Error al eliminar el producto:", error);
    });
}

function updateQuantity(productId, newQuantity) {
  fetch(`http://localhost:3000/api/user/${USER_ID}/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      id: productId,
      count: newQuantity,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Update Quantity Successful:", data);
      updateCartAndUI(); // Actualizar el carrito y la interfaz después de la actualización
    })
    .catch((error) => {
      console.error("Error al actualizar la cantidad del producto:", error);
    });
}

// Función para actualizar la interfaz de usuario con los nuevos datos del carrito
function updateUIWithCartData(serverProductData) {
  // Limpiar el contenedor del carrito
  cartContainer.innerHTML = "";

  // Actualizar la interfaz de usuario con los nuevos datos del carrito
  if (serverProductData.length > 0) {
    serverProductData.forEach((product) => {
      const name = product.name;
      const cost = product.unitCost;
      const count = product.count;
      const currency = product.currency;
      const imageUrl = product.image;
      const productId = product.id;

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
              oninput="updateQuantity(${productId}, event.target.value)">
          </td>

          <td>${currency}
            <p id="subtotal-${productId}">${count * cost}</p>
          </td>
          <td>
            <button class="btn-close" aria-label="Close" onclick="remove(${productId})"></button>
          </td>
        </tr>
      `;
      cartContainer.innerHTML += productHtml;
    });
  } else {
    cartContainer.innerHTML = "El carrito está vacío.";
  }

  // Actualizar los totales
  updateTotal();
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
  const totalInSelectedCurrency =
    calculateTotalInSelectedCurrency(selectedCurrency);
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

// Validaciones Bootstrap
(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
