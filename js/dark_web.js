const switchButton = document.getElementById("switch");
// Recuperar el estado actual del modo oscuro desde el localStorage
const isDarkMode = localStorage.getItem("darkMode") === "true";
// Actualizar la UI según el estado actual
if (isDarkMode) {
  document.body.classList.add("dark");
  switchButton.classList.add("active");
}

// Agregar un event listener al botón para alternar el modo oscuro
switchButton.addEventListener("click", () => {
  // Alternar la clase y el estado del modo oscuro
  document.body.classList.toggle("dark");
  switchButton.classList.toggle("active");

  // Guardar el estado en el localStorage
  const isDarkMode = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDarkMode);
});
