//Validación del formulario con Bootstrap
(() => {
    'use strict'
  
    const forms = document.querySelectorAll('.needs-validation')
  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

// Traer la dirección de email
const localEmail = localStorage.getItem("email", email);
const inputEmail = document.getElementById("email");
const dataComplete = JSON.parse(localStorage.getItem("data"));

const name = document.getElementById("name");
const lastname = document.getElementById("lastname");
const tel = document.getElementById("tel");

if (localEmail, dataComplete) {
    inputEmail.value = localEmail
    name.value = dataComplete.name;
    lastname.value = dataComplete.lastname;
    tel.value = dataComplete.tel;
}

// Guardar en el localStorage los datos
function sendData () {
    const data = {name: name.value, lastname: lastname.value, tel: tel.value};
    localStorage.setItem ("data", JSON.stringify(data));
}
