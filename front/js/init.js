const CATEGORIES_URL = "http://localhost:3000/api/cat";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/api/sell/publish";
const PRODUCTS_URL = "http://localhost:3000/api/cat/:categoryId";
const PRODUCT_INFO_URL = "http://localhost:3000/api/product/:productId";
const PRODUCT_INFO_COMMENTS_URL =
  "http://localhost:3000/api/product/:productId/comments";
const CART_INFO_URL = "http://localhost:3000/api/user/:userId/cart";
const CART_BUY_URL = "http://localhost:3000/api/cart/buy";
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
      link.href = `${PRODUCTS_URL.replace(
        ":categoryId",
        category.id
      )}${EXT_TYPE}`;
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
