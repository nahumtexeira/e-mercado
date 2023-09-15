function isAuthenticated() {
  return localStorage.getItem("autenticado") === "true";
}

if (!isAuthenticated()) {
  alert("Debes iniciar sesión para continuar");
  window.location.href = "login.html";
}

document.getElementById("cerrarSesion").addEventListener("click", function () {
  localStorage.removeItem("autenticado");
  window.location.href = "login.html";
});

const usuario = document.getElementById("user");
function usuariocharge() {
  usuario.innerHTML = localStorage.getItem("email");
}
usuariocharge();
