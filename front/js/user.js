// Función para validar el formato del correo electrónico
function isValidEmail(email) {
  const emailRegex =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return emailRegex.test(email);
}

// Función para realizar la solicitud de inicio de sesión
async function loginUser(email, pass) {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, pass }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error al iniciar sesión: ${error.message}`);
  }
}

// Función principal de inicio de sesión
async function logIn() {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;

  if (!isValidEmail(email)) {
    alert("Error: La dirección de correo electrónico no es válida.");
    return;
  }

  if (email === "" || pass === "") {
    alert("Error: Alguno de los campos está vacío");
    return;
  }

  try {
    const loginData = await loginUser(email, pass);

    // Almacenar el token en localStorage o en una cookie
    localStorage.setItem("token", loginData.token);

    // Verificar si el usuario es el administrador
    if (email === "admin@admin.com" && pass === "admin") {
      window.location.replace("/troll.html");
    } else {
      // Redirigir a la página principal o realizar otras acciones después del inicio de sesión
      window.location.replace("/index.html");
    }
  } catch (error) {
    console.error(error.message);
    alert("Error al iniciar sesión. Verifica tus credenciales.");
  }
}

// Función para verificar la existencia y validez del token
function isAuthenticated() {
  const token = localStorage.getItem("token");

  if (token) {
    return true;
  }

  return false;
}

// Verificar la autenticación antes de cargar la página
if (!isAuthenticated()) {
  alert("Debes iniciar sesión para continuar");
  window.location.href = "login.html";
}

// Evento para cerrar sesión
document.querySelector("#cerrarSesion").addEventListener("click", function () {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

// Mostrar información del usuario
const user = document.querySelector("#user");
function usercharge() {
  user.innerHTML = localStorage.getItem("email");
}
usercharge();
