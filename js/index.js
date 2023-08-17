localStorage.setItem("autenticado", "true");

function usuarioAutenticado() {
    return localStorage.getItem("autenticado") === "true";
}

if (!usuarioAutenticado && !window.location.href.endsWith("login.html")) {
    window.location.href = "login.html";
}

localStorage.removeItem("autenticado");

document.getElementById("cerrarSesion").addEventListener("click", function() {
    localStorage.removeItem("autenticado");
    window.location.href = "login.html";
});


document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});


