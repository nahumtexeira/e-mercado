const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

const products = document.getElementById("products");

function showData(dataArray) {
  for (const item of dataArray) {
      products.innerHTML += `
          <div class="productCard"> 
              <img src="${item.image}" alt="Product Image"> 
              <h3>${item.name} - ${item.currency} ${item.cost}</h3>
              <p class="soldCount">Vendidos: ${item.soldCount}</p> 
              <p class="descripcionProduct">${item.description}</p>
          </div>
      `;
  }
}

fetch(DATA_URL)
  .then(response => response.json())
  .then(data => {showData(data.products)})