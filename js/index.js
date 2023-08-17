function usuarioAutenticado() {
    return localStorage.getItem("autenticado") === "true";
}
console.log(usuarioAutenticado())
if (!usuarioAutenticado()) {
    window.location.href = "login.html";
}

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