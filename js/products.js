const categoryID = localStorage.getItem("catID");
const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/" + categoryID + ".json";

const categoria = document.getElementById("categoryProd");
const products = document.getElementById("products");
const sortAscRadio = document.getElementById("sortAsc");
const sortDescRadio = document.getElementById("sortDesc");
const sortByCountRadio = document.getElementById("sortByCount");

// Variable para almacenar los datos
let dataArray = [];
let sortByPriceAsc = true; // Variable para rastrear el orden ascendente/descendente por precio

// Función para mostrar los datos en el contenedor
function showData() {
  products.innerHTML = ""; // Limpiar el contenedor antes de mostrar los datos

  for (const item of dataArray) {
    products.innerHTML += `
      <div class="productCard"> 
          <img src="${item.image}" alt="Product Image"> 
          <div class="productDescription">
            <div>
              <h2 class="priceProductPage">${item.currency} ${item.cost}</h2>
              <h3 class="nameProductPage">${item.name}</h3>
              <p class="descripcionProduct">${item.description}</p>
            </div>
          <span class="soldCount">Vendidos: ${item.soldCount}</span>
          </div>
      </div>
    `;
  }
}

// Función para ordenar los datos por precio de forma ascendente
function sortDataByPriceAsc() {
  dataArray.sort((a, b) => a.cost - b.cost);
  showData();
}

// Función para ordenar los datos por precio de forma descendente
function sortDataByPriceDesc() {
  dataArray.sort((a, b) => b.cost - a.cost);
  showData();
}

// Función para ordenar los datos por cantidad de vendidos
function sortDataBySoldCount() {
  dataArray.sort((a, b) => b.soldCount - a.soldCount);
  showData();
}

// Cargar y mostrar datos iniciales
fetch(DATA_URL)
  .then(response => response.json())
  .then(data => {
    dataArray = data.products;
    categoria.innerHTML = data.catName;
    showData();
  });

// Agregar manejadores de evento para los botones de orden
sortAscRadio.addEventListener("click", () => {
  sortDataByPriceAsc(); // Ordenar por precio ascendente
});

sortDescRadio.addEventListener("click", () => {
  sortDataByPriceDesc(); // Ordenar por precio descendente
});

sortByCountRadio.addEventListener("click", () => {
  sortDataBySoldCount(); // Ordenar por cantidad de vendidos
});
