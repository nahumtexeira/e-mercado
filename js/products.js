const categoryID = localStorage.getItem("catID");
const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/"+categoryID+".json";

const products = document.getElementById("products");
const categoria= document.getElementById("categoryProd");
function showData(dataArray, catID) {
  for (const item of dataArray) {
    categoria.innerHTML = catID;
        products.innerHTML += `
          <div class="productCard"> 
              <img src="${item.image}" alt="Product Image"> 
              <div class="productDescription">
                <div>
                  <h3>${item.name} - ${item.currency} ${item.cost}</h3>
                  <p class="soldCount">Vendidos: ${item.soldCount}</p>
                </div>
              <p class="descripcionProduct">${item.description}</p>
              </div>
          </div>
      `;
  }
}

fetch(DATA_URL)
  .then(response => response.json())
  .then(data => {showData(data.products, data.catName)})