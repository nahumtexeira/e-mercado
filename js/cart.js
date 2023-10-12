const USER_ID = 25801;

fetch("https://japceibal.github.io/emercado-api/user_cart/" + USER_ID + ".json")
  .then((response) => response.json())
  .then((serverCart) => {
    const serverProductData = serverCart.articles;

    if (serverProductData.length > 0) {
      const cartContainer = document.getElementById("product-data");

      serverProductData.forEach((product) => {
        const name = product.name;
        const cost = product.unitCost;
        const count = product.count;
        const currency = product.currency;
        const imageUrl = product.image;

        const productHtml = `
          <div class="product">
            <p>Nombre: ${name}</p>
            <p>Costo: ${cost} ${currency}</p>
            <p>Cantidad: ${count}</p>
            <img src="${imageUrl}" alt="${name}">
          </div>
        `;

        cartContainer.innerHTML += productHtml;
      });
    } else {
      const cartContainer = document.getElementById("product-data");
      cartContainer.innerHTML = "El carrito del servidor está vacío.";
    }

    //productos del carrito local
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.forEach((item) => {
      const prodID = item.prodID;
      const count = item.count;
      const PRODUCT_INFO_URL =
        "https://japceibal.github.io/emercado-api/products/" + prodID + ".json";

      fetch(PRODUCT_INFO_URL)
        .then((response) => response.json())
        .then((data) => {
          const cartContainer = document.getElementById("product-data");
          const name = data.name;
          const cost = data.cost;
          const imageUrl = data.images[0];

          const productHtml = `
            <div class="product">
              <p>Nombre: ${name}</p>
              <p>Costo: ${cost}</p>
              <p>Cantidad: ${count}</p>
              <img src="${imageUrl}" alt="${name}">
              <button class="btn-close" aria-label="Close" onclick="remove('${prodID}')"></button>

            </div>
          `;

          cartContainer.innerHTML += productHtml;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function remove(prodID) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const updatedCart = carrito.filter((item) => item.prodID !== prodID);
  localStorage.setItem("carrito", JSON.stringify(updatedCart));

  window.location.href = window.location.href;
}
