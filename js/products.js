const categoryID = localStorage.getItem("catID");
const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/"+categoryID+".json";

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

// Función para ordenar los datos alfabéticamente
function sortDataAlphabetically(order) {
  dataArray.sort((a, b) => a.name.localeCompare(b.name) * order);
  showData();
}

// Función para ordenar los datos por precio
function sortDataByPrice(order) {
  dataArray.sort((a, b) => (a.cost - b.cost) * order);
  showData();
}

// Función para cambiar el orden ascendente/descendente
function toggleSortOrder() {
  sortByPriceAsc = !sortByPriceAsc;
  const sortOrder = sortByPriceAsc ? 1 : -1;
  sortDataByPrice(sortOrder);
}

// Cargar y mostrar datos iniciales
fetch(DATA_URL)
  .then(response => response.json())
  .then(data => {
    dataArray = data.products;
    categoria.innerHTML = data.catName;
    showData();
  });

// Cambia el evento 'change' a 'click' para todos los radio buttons
sortAscRadio.addEventListener("click", () => {
  if (sortAscRadio.checked) {
    sortDataAlphabetically(1); // Ordenar alfabéticamente ascendente
  }
});

sortDescRadio.addEventListener("click", () => {
  if (sortDescRadio.checked) {
    sortDataAlphabetically(-1); // Ordenar alfabéticamente descendente
  }
});

sortByCountRadio.addEventListener("click", () => {
  if (sortByCountRadio.checked) {
    toggleSortOrder();
  }
});
