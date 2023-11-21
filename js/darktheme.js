const switchButton = document.getElementById("switch");

// estado actual del modo oscuro desde el localStorage
const isDarkMode = localStorage.getItem("darkMode") === "true";

if (isDarkMode) {
  enableDarkMode();
}

// Agregar un event listener al botón para alternar el modo oscuro
switchButton.addEventListener("click", () => {
  const isDarkMode = document.body.classList.contains("dark");
  if (isDarkMode) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

function enableDarkMode() {
  document.body.classList.add("dark");
  switchButton.classList.add("active");
  localStorage.setItem("darkMode", "true");
}

function disableDarkMode() {
  document.body.classList.remove("dark");
  switchButton.classList.remove("active");
  localStorage.setItem("darkMode", "false");
}
