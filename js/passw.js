document.getElementById("passwform").addEventListener('click',codePass)
function codePass () {
    var email = document.getElementById("email").value;

    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if ( !expr.test(email) ){
        alert("Error: Debes ingresar tu correo para recuperar la contraseña");
        return false;
    }

    if (email == "") {
        alert("Error: Debes ingresar tu correo para recuperar la contraseña");
        return false;
    } 
        window.location.replace("/login.html");
}