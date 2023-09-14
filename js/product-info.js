const prodID = localStorage.getItem("prodID");
const prodInfoURL = "https://japceibal.github.io/emercado-api/products/" + prodID + ".json";
const prodCommURL = "https://japceibal.github.io/emercado-api/products_comments/" + prodID + ".json";
const containerInfo = document.querySelector(".containerInfo");
const containerComm = document.querySelector(".containerComm");
const containerMainImage = document.querySelector(".containerMainImage");
const containerSecondaryImages = document.querySelector(".containerSecondaryImages");
const containerProductCategory = document.querySelector(".productCategory");


// Cargar y mostrar datos iniciales
fetch(prodInfoURL)
    .then(response => response.json())
    .then(infoCard => {
        showProdCategory(infoCard);
        showProdInfoData(infoCard);
        showMainImage(infoCard);
        showProdImg(infoCard.images);
    });

// Muestra la Categoría
function showProdCategory(infoCard) {
    containerProductCategory.innerHTML += `
    <p class="st-products-category">Categoría: <span>${infoCard.category}</span></p>
`;
}

// Muestra la descripción
function showProdInfoData(infoCard) {
    containerInfo.innerHTML += `
    <div class="productInfo"> 
    <h1>${infoCard.name}</h1>
    <p class="totalSold">| ${infoCard.soldCount} vendidos</p>
    <p class="st-products">Categoría: <span>${infoCard.category}</span></p>
    <p class="st-products">Descripción:</p>
    <p>${infoCard.description}</p>
    <p class="st-products">Costo:</p>
    <p>${infoCard.cost} ${infoCard.currency}</p>
</div>
`;
}
// Muestra la Imagen inicial
function showMainImage(infoCard) {
    containerMainImage.innerHTML += `
    <img class="mainImage" src="${infoCard.images[0]}" alt="imagen principal">
`;
}

//Cambia la imagen principal por la unt.
function changeMainImage(src) {
    const mainImage = document.querySelector(".mainImage");
    mainImage.src = src;
}

// Muestra las imágenes del producto sin contar la inicial.
function showProdImg(images) {
    
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
  
      containerSecondaryImages.innerHTML += `
              <img onclick="changeMainImage('${img}')" class="unitImages" src="${img}" alt="">
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
        containerComm.innerHTML += ` <h3 class="titleOpinions">Opiniones del producto</h3>`
        for (const item of commCard) {
            containerComm.innerHTML += `
                <div class="commentCard">
                <p class="stars">${scoreToStars(item.score)} </p>
                <p class="commentDescription">${item.description} </p>
                <p class="userNameComment">${item.user} </p>
                <p class="dataComment">${item.dateTime}</p>
                <hr>
                </div>
            `;
        }
    }

document.getElementById('submitComment').addEventListener('click', (event)=>{
    event.preventDefault();
    showComment();
})
    
function showComment(){
    const form = document.getElementById("commentForm");
    const formData = new FormData(form);
    const opinion = formData.get("opinion");
    const rate = formData.get("rate");
    containerComm.innerHTML +=`
    <div class="commentCard">
                <p class="stars">${scoreToStars(rate)} </p>
                <p class="commentDescription">${opinion}</p>
                <p class="userNameComment">${localStorage.getItem("email").replace('@gmail.com',"")}</p>
                <p class="dataComment">${Date.now()}</p>
    </div>
    `
}

function scoreToStars(score) {
    const filledStars = "★".repeat(score);
    const emptyStars = "☆".repeat(5 - score);
        return filledStars + emptyStars;
  }