function ingresar() {
    var correo = document.getElementById("correo").value;
    var pass = document.getElementById("pass").value;

    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if ( !expr.test(correo) ){
        alert("Error: La dirección de correo " + correo + " no es válida.");
        return false;
    }

    if ((correo == "") || (pass == "")) {
        alert("Error: Alguno de los campos están vacios");
        return false;
    } 

    location.replace("index.html")
}