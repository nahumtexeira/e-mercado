const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL =
  "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

function setCatID(id) {
  localStorage.setItem("catID", id);
  window.location = "products.html";
}
let getJSONData = function (url) {
  let result = {};

  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;

      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;

      return result;
    });
};

let showSpinner = function () {
  document.querySelector("#spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.querySelector("#spinner-wrapper").style.display = "none";
};

fetch(CATEGORIES_URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al obtener los datos de las categorías");
    }
    return response.json();
  })

  .then((data) => {
    const categoryList = document.querySelector("#categoryList");

    data.forEach((category) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.textContent = category.name;
      link.href = "products.html";
      listItem.appendChild(link);
      categoryList.appendChild(listItem);
      listItem.onclick = function (event) {
        event.preventDefault();
        setCatID(category.id);
        window.location.href = link.href;
      };
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
