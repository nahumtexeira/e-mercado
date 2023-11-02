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
// Agrega un evento de clic al botón "Guardar cambios"

// Traer la dirección de email
const localEmail = localStorage.getItem("email", email);
const inputEmail = document.getElementById("email");
const dataComplete = JSON.parse(localStorage.getItem("data"));
const savedImage = localStorage.getItem("image");

const name = document.getElementById("name");
const lastname = document.getElementById("lastname");
const tel = document.getElementById("tel");
const imgProfile = document.getElementById("imgProfile");

if ((localEmail, dataComplete)) {
  inputEmail.value = localEmail;
  name.value = dataComplete.name;
  lastname.value = dataComplete.lastname;
  tel.value = dataComplete.tel;
}

// Guardar en el localStorage los datos
function sendData() {
  const data = { name: name.value, lastname: lastname.value, tel: tel.value };
  localStorage.setItem("data", JSON.stringify(data));
}

// Traer imagen del usuario
const imgProfile = document.getElementById("imgProfile");
const btnFile = document.getElementById("formFile");

//btnFile.addEventListener('change', function (event) {
//    if (event.target.files.length > 0) {
//        const file = event.target.files[0];
//        const newFile = new FileReader();
//        newFile.onload = function (e) {
//            imgProfile.src = e.target.result;
//            newFile.readAsDataURL(file);
//        }
//   }
//})

if (btnFile.files.length > 0) {
  const newFile = btnFile.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const newImage = e.target.result;
    localStorage.setItem("image", newImage);
  };
  reader.readAsDataURL(newFile);
}
