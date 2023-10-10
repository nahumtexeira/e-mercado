const USER_ID = 25801;
const DATA_URL = "https://japceibal.github.io/emercado-api/user_cart/"+ USER_ID +".json";

fetch(DATA_URL)
.then(response => response.json())
.then((data) => {
    showCart(data);
    subTotal()
})
.catch(error => console.error(error));

function showCart(data){
    const articles = data.articles;
    if (articles.length > 0) {
        const product = articles[0];
        const name = product.name;
        const cost = product.unitCost;
        let count = product.count;
        const currency = product.currency;
        let subtotal = cost * count;
        const imageUrl = product.image;

        const productHtml = `
            <p>Nombre: ${name}</p>
            <p>Costo: ${cost} ${currency}</p>
            <p>Cantidad: <input type="number" value="${count}" id="quantityInput"></p>
            <p>Subtotal:<span id="subtotal">${subtotal} ${currency}</span></p>
            <img src="${imageUrl}" alt="${name}">
        `;

        document.getElementById('product-data').innerHTML = productHtml;

    document.getElementById('quantityInput').addEventListener("input", function(){
const count= document.getElementById("quantityInput").value;
const subtotal = cost * count;
document.getElementById("subtotal").textContent = `${subtotal} ${currency}`;
    });
    }
}



