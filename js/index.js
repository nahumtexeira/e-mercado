function usuarioAutenticado() {
    return localStorage.getItem("autenticado") === "true";
}

if (!usuarioAutenticado()) {
    alert("Debes iniciar sesión para continuar")
    window.location.href = "login.html";
}

document.getElementById("cerrarSesion").addEventListener("click", function () {
    localStorage.removeItem("autenticado");
    window.location.href = "login.html";
});

const usuario = document.getElementById("user");
function usuariocharge(){
    usuario.innerHTML=localStorage.getItem("email");
}
usuariocharge();


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});


