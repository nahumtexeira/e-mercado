const USER_ID = 25801;
const CART_URL =
  "https://japceibal.github.io/emercado-api/user_cart/" + USER_ID + ".json";

fetch(CART_URL)
  .then((response) => response.json())
  .then((serverCart) => {
    // Datos del carrito del servidor
    const serverProductData = serverCart.articles;

    // Obtener el carrito local almacenado en el navegador
    const localCart = JSON.parse(localStorage.getItem("carrito")) || [];

    // Combinar los productos del servidor y el carrito local
    const carritoCompleto = serverProductData.concat(localCart);

    const cartContainer = document.getElementById("product-data");
    // Verifica si el carrito está vacío o no
    if (carritoCompleto.length > 0) {
      carritoCompleto.forEach((product) => {
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
        <td>${count}</td>
        <td>${currency}</td>
        <td><button class="btn-close" aria-label="Close" onclick="remove('${product.id}')"></button></td>
      </tr>
    `;
        cartContainer.innerHTML += productHtml;
      });
    } else {
      // Si el carrito está vacío, muestra un mensaje
      cartContainer.innerHTML = "El carrito está vacío.";
    }
    console.log("Carrito completo:", carritoCompleto);
    console.log("Carrito local:", localCart);
  })

  .catch((error) => {
    console.error("Error al obtener el carrito del servidor:", error);
  });
