function isAuthenticated() {
  return localStorage.getItem("autenticado") === "true";
}

if (!isAuthenticated()) {
  alert("Debes iniciar sesión para continuar");
  window.location.href = "login.html";
}

document.querySelector("#cerrarSesion").addEventListener("click", function () {
  localStorage.removeItem("autenticado");
  window.location.href = "login.html";
});

const user = document.querySelector("#user");
function usercharge() {
  user.innerHTML = localStorage.getItem("email");
}
usercharge();
