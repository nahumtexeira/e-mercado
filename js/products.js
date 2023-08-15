const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

const products = document.getElementById("products");

function showData(dataArray) {
    for (const item of dataArray) {
      products.innerHTML += `<div> ${"$" + item.cost} ${item.name} ${item.description} ${item.soldCount} ${item.image}</div>`; 
    }
  }

fetch(DATA_URL)
  .then(response => response.json())
  .then(data => {showData(data.products)})