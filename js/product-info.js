const prodID = localStorage.getItem("prodID");
const prodInfoURL = "https://japceibal.github.io/emercado-api/products/" + prodID + ".json";
const prodCommURL = "https://japceibal.github.io/emercado-api/products_comments/" + prodID + ".json";
const containerInfo = document.querySelector(".containerInfo");
const containerComm = document.querySelector(".containerComm");


// Cargar y mostrar datos iniciales
fetch(prodInfoURL)
    .then(response => response.json())
    .then(infoCard => {
        showProdInfoData(infoCard);
    });


function showProdInfoData(infoCard) {
    containerInfo.innerHTML = ""; // Limpiar el contenedor antes de mostrar los datos
    containerInfo.innerHTML += `
    <div class="productInfo"> 
    <h1>${infoCard.name}</h1>
    <strong>Categoría:</strong>    
    <p>${infoCard.category}</p>
    <strong>Descripción:</strong>
    <p>${infoCard.description}</p>
    <strong>Costo:</strong>
    <p>${infoCard.cost} ${infoCard.currency}</p>
    <strong>Cantidad de vendidos:</strong>
    <p>${infoCard.soldCount}</p>
    
    <h3>Imágenes:</h3>
   
</div>
`;
}
// Cargar y mostrar datos iniciales
fetch(prodCommURL)
    .then(response => response.json())
    .then(commCard => {
        showProdCommInfo(commCard);
    });

function showProdCommInfo(commCard){
        containerComm.innerHTML = ""; // Limpiar el contenedor antes de mostrar los datos
        containerComm.innerHTML += ` <h2>Comentarios</h2>`
        for (const item of commCard) {
            containerComm.innerHTML += `
                <div class="commentCard"> 
                <p><strong>${item.user}</strong> - ${item.dateTime} - score:${item.score}</p> 
                <p>${item.description} </p>
            `;
        }
    }
