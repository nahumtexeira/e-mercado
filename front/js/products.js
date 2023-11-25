const categoryID = localStorage.getItem("catID");
const DATA_URL = "http://localhost:3000/api/cat/" + categoryID;

const categories = document.querySelector("#categoryProd");
const products = document.querySelector("#products");
const searchInput = document.querySelector("#search");
const sortAscRadio = document.querySelector("#sortAsc");
const sortDescRadio = document.querySelector("#sortDesc");
const sortByCountRadio = document.querySelector("#sortByCount");
const rangeFilterMinInput = document.querySelector("#rangeFilterCountMin");
const rangeFilterMaxInput = document.querySelector("#rangeFilterCountMax");
const rangeFilterButton = document.querySelector("#rangeFilterCount");
const clearFilterButton = document.querySelector("#clearRangeFilter");

let dataArray = []; // Variable para almacenar los datos
let sortByPriceAsc = true; // Variable para rastrear el orden ascendente/descendente por precio

//Función para guardar id de producto
function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}

// Función para mostrar los datos en el contenedor
function showData(data) {
  products.innerHTML = "";

  for (const item of data) {
    products.innerHTML += `
      <div class="productCard" onclick="setProdID(${item.id})"}> 
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
  return dataArray.filter((item) => {
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

  const filteredData = dataArray.filter((item) => {
    const lowerCaseName = item.name.toLowerCase();
    const lowerCaseDescription = item.description.toLowerCase();

    return (
      lowerCaseName.includes(searchText) ||
      lowerCaseDescription.includes(searchText)
    );
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
  .then((response) => response.json())
  .then((data) => {
    dataArray = data.products;
    categories.innerHTML = data.catName;
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
