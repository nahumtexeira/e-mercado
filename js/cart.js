const USER_ID = 25801;
const CART_URL =
  "https://japceibal.github.io/emercado-api/user_cart/" + USER_ID + ".json";
let carritoCompleto = JSON.parse(localStorage.getItem("carritoCompleto")) || [];
const cartContainer = document.getElementById("product-data");
const currencytype = document.getElementById("currency");
const totalPrice = document.getElementById("totalPrice");
const currencySelect = document.getElementById("currency");
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
      const localProductIndex = carritoCompleto.findIndex(
        (localProduct) => localProduct.id === serverProduct.id
      );
      if (localProductIndex !== -1) {
        localProductsToDelete.push(localProductIndex);
      }
    }
    for (const index of localProductsToDelete) {
      carritoCompleto.splice(index, 1);
    }

    carritoCompleto = carritoCompleto.concat(serverProductData);

    if (carritoCompleto.length > 0) {
      carritoCompleto.forEach((product, id) => {
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
  <input type="number" class="quantity-input" value="${count}" min="1" oninput="updateQuantity(${
          product.id
        }, event)">
</td>

<td>${currency}<p id="subtotal-${product.id}">${count * cost}</p></td>

            <td><button class="btn-close" aria-label="Close" onclick="remove(${
              product.id
            })"></button></td>
          </tr>
        `;
        cartContainer.innerHTML += productHtml;
      });
    } else {
      cartContainer.innerHTML = "El carrito está vacío.";
    }
    console.log("Carrito completo:", carritoCompleto);
    updateTotal();
  })
  .catch((error) => {
    console.error("Error al obtener el carrito del servidor:", error);
  });
radioButtons.forEach((radio) => {
  radio.addEventListener("change", updateTotal);
});

function remove(productId) {
  const productIndex = carritoCompleto.findIndex(
    (product) => product.id === productId
  );

  if (productIndex !== -1) {
    carritoCompleto.splice(productIndex, 1);

    localStorage.setItem("carritoCompleto", JSON.stringify(carritoCompleto));
  }
  updateTotal();
  window.location.href = window.location.href;
}

function updateQuantity(productId, event) {
  const newQuantity = event.target.value; // Nuevo valor de la cantidad

  // Buscar el producto en carritoCompleto por su ID
  const productIndex = carritoCompleto.findIndex(
    (product) => product.id === productId
  );

  if (productIndex !== -1) {
    // Si se encuentra el producto, actualizar la cantidad
    carritoCompleto[productIndex].count = parseInt(newQuantity);

    // Realizar la multiplicación de count y cost para obtener el subtotal
    const product = carritoCompleto[productIndex];
    const subtotal = product.count * product.unitCost;

    // Actualizar el carrito en el localStorage
    localStorage.setItem("carritoCompleto", JSON.stringify(carritoCompleto));

    // Actualizar el elemento HTML que muestra el subtotal
    const subtotalElement = document.querySelector(`#subtotal-${productId}`);
    subtotalElement.textContent = subtotal;
    updateTotal();
  } else {
    // Manejo de error si el producto no se encuentra
    console.error("Producto no encontrado en el carritoCompleto.");
  }
}

function updateTotalPrice() {
  totalPrice.textContent = "";
  let total = 0;

  // Iterar sobre los productos en carritoCompleto
  for (const product of carritoCompleto) {
    total += product.count * product.unitCost;
  }

  // Actualizar el elemento HTML totalPrice con el total calculado
  const roundedTotal = Math.round(total); // Redondear el total
  totalPrice.textContent = roundedTotal;
}

currencySelect.addEventListener("change", updateTotal);

function updateTotal() {
  const selectedCurrency = currencySelect.value;
  const totalInSelectedCurrency =
    calculateTotalInSelectedCurrency(selectedCurrency);
  const radioButtons = document.querySelectorAll('input[name="opcion"]');

  // Obtenemos el valor del radio button seleccionado
  const selectedRadioButton = Array.from(radioButtons).find(
    (radio) => radio.checked
  );
  const percentage = parseFloat(selectedRadioButton.value);

  // Calculamos el total sumando el porcentaje al total original
  const totalWithPercentage =
    totalInSelectedCurrency + totalInSelectedCurrency * (percentage / 100);

  // Actualizamos el elemento que muestra el total
  const totalPrice = document.getElementById("totalPrice");
  totalPrice.textContent = totalWithPercentage;
}

function calculateTotalInSelectedCurrency(selectedCurrency) {
  let total = 0;

  carritoCompleto.forEach((product) => {
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
  const cardNumberInput = document.getElementById("cardNumber");
  const securityCodeInput = document.getElementById("securityCode");
  const expirationDateInput = document.getElementById("expirationDate");
  const accountNumberInput = document.getElementById("accountNumber");
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
function finalizarCompra(event) {
  event.preventDefault();
  // Obtener el formulario por su ID
  var form = document.getElementById("miFormulario");
  // Enviar el formulario
  form.submit();
}
function formatCard(element) {
            let trimmed = element.value.replace(/\s+/g, '');
            let formatted = '';
            for (let i = 0; i < trimmed.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formatted += ' ';
                }
                formatted += trimmed[i];
            }

            element.value = formatted;
        }