const USER_ID = 25801;
const CART_URL =
  "https://japceibal.github.io/emercado-api/user_cart/" + USER_ID + ".json";
let carritoCompleto = JSON.parse(localStorage.getItem("carritoCompleto")) || [];
const cartContainer = document.getElementById("product-data");

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
            <td>${count}</td>
            <td>${currency}</td>
            <td><button class="btn-close" aria-label="Close" onclick="remove(${product.id})"></button></td>
          </tr>
        `;
        cartContainer.innerHTML += productHtml;
      });
    } else {
      cartContainer.innerHTML = "El carrito está vacío.";
    }
    console.log("Carrito completo:", carritoCompleto);
  })
  .catch((error) => {
    console.error("Error al obtener el carrito del servidor:", error);
  });

function remove(productId) {
  const productIndex = carritoCompleto.findIndex(
    (product) => product.id === productId
  );

  if (productIndex !== -1) {
    carritoCompleto.splice(productIndex, 1);

    localStorage.setItem("carritoCompleto", JSON.stringify(carritoCompleto));
  }
}
