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

let localEmail = localStorage.getItem("email", email);
const inputEmail = document.getElementById("email")

if (localEmail) {
    inputEmail.value = localEmail
}

// Guardar en el localStorage los datos
function sendData () {
    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const tel = document.getElementById("tel").value;

    localStorage.setItem("name", name);
    localStorage.setItem("lastname", lastname);
    localStorage.setItem("tel", tel);

    if (name, lastname, tel) {

    }
}
