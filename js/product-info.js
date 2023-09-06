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
        showProdImg(infoCard.images);
    });


function showProdInfoData(infoCard) {
    containerInfo.innerHTML = ""; // Limpiar el contenedor antes de mostrar los datos
    containerInfo.innerHTML += `
    <div class="productInfo"> 
    <h1>${infoCard.name}</h1>
    <p class="st-products">Categoría:</p>    
    <p>${infoCard.category}</p>
    <p class="st-products">Descripción:</p>
    <p>${infoCard.description}</p>
    <p class="st-products">Costo:</p>
    <p>${infoCard.cost} ${infoCard.currency}</p>
    <p class="st-products">Cantidad de vendidos:</p>
    <p>${infoCard.soldCount}</p>
</div>
`;
}

function showProdImg(images) {
    containerInfo.innerHTML += '<p class="st-products">Imágenes</p>';
    for (const img of images) {
        containerInfo.innerHTML += `
            <img class="unitImages" src="${img}" alt="">
        `;
    }
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

