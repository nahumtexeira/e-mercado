// función para autentificar el usuario

function logIn () {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    const expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if ( !expr.test(email) ){
        alert("Error: La dirección de correo " + email + " no es válida.");
        return false;
    }

    if ((email == "") || (pass == "")) {
        alert("Error: Alguno de los campos están vacios");
        return false;
    } 
    localStorage.setItem("autenticado", "true");
    localStorage.setItem("email", email);
    window.location.replace("/index.html");
}
