// función para autentificar el usuario

function logIn () {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;

    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

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
