//Validación del formulario con Bootstrap
(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// Traer la dirección de email
const localEmail = localStorage.getItem("email");
const inputEmail = document.getElementById("email");
const dataComplete = JSON.parse(localStorage.getItem("data"));
const savedImage = localStorage.getItem("image");

const name = document.getElementById("name");
const lastname = document.getElementById("lastname");
const tel = document.getElementById("tel");
const imgProfile = document.getElementById("imgProfile");
const btnFile = document.getElementById("formFile");

// Agregar evento de cambio al input de archivo (botón de selección de imagen)
btnFile.addEventListener("change", function (event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      imgProfile.src = e.target.result;
      localStorage.setItem("image", e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

// Si se encontró una imagen en el localStorage, mostrarla en imgProfile
if (savedImage) {
  imgProfile.src = savedImage;
  inputEmail.value = localEmail;
  name.value = dataComplete.name;
  lastname.value = dataComplete.lastname;
  tel.value = dataComplete.tel;
}

// Guardar en el localStorage los datos
function sendData() {
  const data = { name: name.value, lastname: lastname.value, tel: tel.value };
  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("email", inputEmail.value);
}
