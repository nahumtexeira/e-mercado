// Obtener el ID del producto almacenado localmente
const prodID = localStorage.getItem("prodID");

// URLs de las API para obtener información del producto y comentarios
const prodInfoURL =
  "https://japceibal.github.io/emercado-api/products/" + prodID + ".json";
const prodCommURL =
  "https://japceibal.github.io/emercado-api/products_comments/" +
  prodID +
  ".json";

// Carrito de compras
let carritoCompleto = JSON.parse(localStorage.getItem("carritoCompleto")) || [];
let cartProductInfo;
// Referencias a elementos del DOM
const containerComm = document.querySelector(".containerComm");
const containerProductCategory = document.querySelector(".productCategory");
const containerInfo = document.querySelector(".containerInfo");
const containerMainImage = document.querySelector(".containerMainImage");
const containerSecondaryImages = document.querySelector(
  ".containerSecondaryImages"
);
const containerRelatedProducts = document.querySelector(
  "#container-related-products"
);

// Cargar y mostrar datos iniciales del producto
fetch(prodInfoURL)
  .then((response) => response.json())
  .then((infoCard) => {
    cartProductInfo = infoCard;
    showProduct(infoCard);
    showRelatedProducts(infoCard);
  });

// Función para mostrar los detalles del producto
function showProduct(infoCard) {
  // Categoría del producto
  containerProductCategory.innerHTML += `
    <p class="st-products-category">Categoría: <span>${infoCard.category}</span></p>
  `;

  // Información del producto
  containerInfo.innerHTML += `
    <div class="productInfo"> 
      <h1>${infoCard.name}</h1>
      <p class="totalSold">| ${infoCard.soldCount} vendidos</p>
      <p class="average">4.5 (estrellas) (10)</p>
      <p class="cost"><span class="currency">${infoCard.currency}</span> ${infoCard.cost}</p>
      <div class="notification" id="notification">Producto agregado al carrito</div>
      <div class="containerAddToCart">
        <input type="number" id="qty" class="form-control w-auto" value="1" min="1">
        <button class="addToCart" onclick="addToCartClicked()">Añadir al carrito</button>
      </div>
      <h3 class="st-products mt-3">Detalles del producto:</h3>
      <p>${infoCard.description}</p>
    </div>
  `;

  // Imagen principal del producto
  containerMainImage.innerHTML += `
    <img class="mainImage" src="${infoCard.images[0]}" alt="imagen principal">
  `;
  changeMainImage(infoCard.images[0]);

  // Imágenes secundarias del producto
  for (let i = 0; i < infoCard.images.length; i++) {
    const img = infoCard.images[i];

    containerSecondaryImages.innerHTML += `
      <img onclick="changeMainImage('${img}')" class="unitImages" src="${img}" alt="">
    `;
  }
}

// Función para cambiar la imagen principal del producto
function changeMainImage(src) {
  const mainImage = document.querySelector(".mainImage");
  mainImage.src = src;
}

// Cargar y mostrar datos iniciales (COMENTARIOS)
fetch(prodCommURL)
  .then((response) => response.json())
  .then(showProdCommInfo);

// Función para mostrar los comentarios del producto
function showProdCommInfo(commCard) {
  const formattedDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleDateString("es-ES", options);
  };

  containerComm.innerHTML = `
    <h3 class="titleOpinions">Opiniones del producto</h3>
    ${
      commCard.length === 0
        ? `<p class="not-comment">Aún no hay comentarios ¡puedes ser el primero!</p>`
        : ""
    }
    ${commCard
      .map(
        (item) => `
        <div class="commentCard">
          <p class="stars">${scoreToStars(item.score)}</p>
          <p class="commentDescription">${item.description}</p>
          <p class="userNameComment">${item.user}</p>
          <p class="dataComment">${formattedDate(item.dateTime)} hs</p>
          <hr>
        </div>
      `
      )
      .join("")}
  `;
}

// Event listener para el botón de agregar comentario
document.getElementById("submitComment").addEventListener("click", (event) => {
  event.preventDefault();
  showComment();
});

// Función para mostrar un comentario
function showComment() {
  const form = document.getElementById("commentForm");
  const formData = new FormData(form);
  const opinion = formData.get("opinion");
  const rate = formData.get("rate");
  const formattedDate = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  if (!opinion) {
    alert("Por favor, escribe algo.");
    return;
  }

  const userName = localStorage.getItem("email").split("@")[0];
  const commentCard = `
    <div class="commentCard">
      <p class "stars">${scoreToStars(rate)}</p>
      <p class="commentDescription">${opinion}</p>
      <p class="userNameComment">${userName}</p>
      <p class="dataComment">${formattedDate} hs</p>
      <hr>
    </div>
  `;

  containerComm.insertAdjacentHTML("beforeend", commentCard);
  form.reset();
}

// Función para convertir puntuación en estrellas
function scoreToStars(score) {
  return "★".repeat(score) + "☆".repeat(5 - score);
}

// Función para mostrar productos relacionados
function showRelatedProducts(infoCard) {
  infoCard.relatedProducts.forEach((relatedProduct) => {
    const productHTML = ` 
      <div class="productRelatedInfo" onclick="setProdID(${relatedProduct.id})"> 
        <h4 class="nameRelProd">${relatedProduct.name}</h4>
        <hr>
        <img class="imgRelProd" src="${relatedProduct.image}" alt="imagen del producto relacionado">
      </div>
    `;
    containerRelatedProducts.innerHTML += productHTML;
  });
}

// Función para establecer el ID de un producto y redirigir a la página de información del producto
function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}

// Función para agregar productos al carrito de compras
function addToCartClicked() {
  const productoIdAlmacenado = parseInt(localStorage.getItem("prodID"));
  const inputCantidad = parseInt(document.getElementById("qty").value);

  // Verificar si la cantidad ingresada es válida (al menos 1)
  if (inputCantidad >= 1) {
    // Buscar si el producto ya existe en el carrito
    const existingProduct = carritoCompleto.find(
      (item) => item.id === productoIdAlmacenado
    );

    // Si el producto ya existe, actualizar la cantidad
    if (existingProduct) {
      existingProduct.count += inputCantidad;
    } else {
      // Si el producto no existe, agregarlo al carrito
      carritoCompleto.push({
        id: productoIdAlmacenado,
        name: cartProductInfo.name,
        unitCost: cartProductInfo.cost,
        count: inputCantidad,
        currency: cartProductInfo.currency,
        image: cartProductInfo.images[0],
      });
    }

    // Actualizar el carrito en el almacenamiento local
    localStorage.setItem("carritoCompleto", JSON.stringify(carritoCompleto));

    // Restablecer la cantidad a 1 y mostrar una notificación
    document.getElementById("qty").value = "1";

    const notification = document.getElementById("notification");
    notification.style.display = "block";
    setTimeout(function () {
      notification.style.display = "none";
    }, 3000);
  } else {
    // Mostrar una alerta si la cantidad no es válida
    alert("La cantidad debe ser un número válido y al menos 1");
  }
}
