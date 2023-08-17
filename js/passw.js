document.getElementById("passwform").addEventListener('click',codePass)
function codePass () {
    var correo = document.getElementById("correo").value;

    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if ( !expr.test(correo) ){
        alert("Error: Debes ingresar tu correo para recuperar la contraseña");
        return false;
    }

    if (correo == "") {
        alert("Error: Debes ingresar tu correo para recuperar la contraseña");
        return false;
    } 
        window.location.replace("/login.html");
}