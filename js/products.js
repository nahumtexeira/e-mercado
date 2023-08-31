// Obtener elementos del HTML
const categoryID = localStorage.getItem("catID");
const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/" + categoryID + ".json";

const categoria = document.getElementById("categoryProd");
const products = document.getElementById("products");
const searchInput = document.getElementById("Search");
const sortAscRadio = document.getElementById("sortAsc");
const sortDescRadio = document.getElementById("sortDesc");
const sortByCountRadio = document.getElementById("sortByCount");
const rangeFilterMinInput = document.getElementById("rangeFilterCountMin");
const rangeFilterMaxInput = document.getElementById("rangeFilterCountMax");
const rangeFilterButton = document.getElementById("rangeFilterCount");
const clearFilterButton = document.getElementById("clearRangeFilter");


// Variable para almacenar los datos
let dataArray = [];
let sortByPriceAsc = true; // Variable para rastrear el orden ascendente/descendente por precio

// Función para mostrar los datos en el contenedor
function showData(data) {
  products.innerHTML = ""; // Limpiar el contenedor antes de mostrar los datos

  for (const item of data) {
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
  showData(dataArray);
}

// Función para ordenar los datos por precio de forma descendente
function sortDataByPriceDesc() {
  dataArray.sort((a, b) => b.cost - a.cost);
  showData(dataArray);
}

// Función para ordenar los datos por cantidad de vendidos
function sortDataBySoldCount() {
  dataArray.sort((a, b) => b.soldCount - a.soldCount);
  showData(dataArray);
}

// Función para filtrar por rango de precio
function filterByPriceRange(minPrice, maxPrice) {
  return dataArray.filter(item => {
    const itemPrice = item.cost;

    if (minPrice !== "" && maxPrice !== "") {
      return itemPrice >= minPrice && itemPrice <= maxPrice;
    } else if (minPrice !== "") {
      return itemPrice >= minPrice;
    } else if (maxPrice !== "") {
      return itemPrice <= maxPrice;
    }

    return true; // Si no hay filtros, mantener el producto
  });
}

// Función para buscar productos
function searchProducts() {
  const searchText = searchInput.value.toLowerCase();

  const filteredData = dataArray.filter(item => {
    const lowerCaseName = item.name.toLowerCase();
    const lowerCaseDescription = item.description.toLowerCase();

    return lowerCaseName.includes(searchText) || lowerCaseDescription.includes(searchText);
  });

  showData(filteredData);
}

// Agregar manejadores de evento para los botones
rangeFilterButton.addEventListener("click", () => {
  const minPrice = rangeFilterMinInput.value;
  const maxPrice = rangeFilterMaxInput.value;

  const filteredData = filterByPriceRange(minPrice, maxPrice);
  showData(filteredData);
});

searchInput.addEventListener("input", () => {
  searchProducts(); // Muestra los productos a medida que vas escribiendo en el buscador
});

clearFilterButton.addEventListener("click", () => {
  rangeFilterMinInput.value = "";
  rangeFilterMaxInput.value = "";
  showData(dataArray); // Mostrar todos los productos al limpiar filtros
});

// Cargar y mostrar datos iniciales
fetch(DATA_URL)
  .then(response => response.json())
  .then(data => {
    dataArray = data.products;
    categoria.innerHTML = data.catName;
    showData(dataArray);
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