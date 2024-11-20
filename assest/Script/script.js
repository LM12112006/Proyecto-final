// registro.js

function register() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const genero = document.getElementById("genero").value;
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");
  
    // Verificar si el correo ya está registrado
    if (localStorage.getItem(correo)) {
        message.textContent = "El correo ya está registrado. Por favor, utiliza otro.";
        message.style.color = "red";
        return;
    }
  
    // Guardar los datos del usuario en el almacenamiento local
    const userData = {
        nombre: nombre,
        apellido: apellido,
        genero: genero,
        correo: correo,
        password: password
    };
    
    localStorage.setItem(correo, JSON.stringify(userData));
    message.textContent = "Registro exitoso. Te estamos redirigiendo para que inicies sesion...";
    message.style.color = "red";
  
    // Limpiar campos
    document.getElementById("registerForm").reset();
  
    // Redirigir a la página de inicio de sesión
    setTimeout(() => {
        window.location.href = "inicio-usuario.html";
    }, 2000); // Espera 2 segundos antes de redirigir
  }
  
  // inicio.js
  
  function login() {
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");
  
    // Obtener los datos del usuario del almacenamiento local
    const storedUser = JSON.parse(localStorage.getItem(correo));
  
    // Verificar si el usuario existe y la contraseña coincide
    if (storedUser && storedUser.password === password) {
        // Guardar el correo del usuario autenticado
        localStorage.setItem("loggedInUser", correo);
        
        // Redirigir a la página principal
            window.location.href = "inicio.html";
    } else {
        message.textContent = "Correo o contraseña incorrectos";
        message.style.color = "red";
    }
  }
  
  // index.js
  
  // Función para verificar el estado de autenticación del usuario
  function checkAuthStatus() {
    const userEmail = localStorage.getItem("loggedInUser");
    const authButtons = document.getElementById("auth-buttons");
    const userArea = document.getElementById("user-area");
    const usernameDisplay = document.getElementById("username-display");
  
    if (userEmail) {
        // Usuario ha iniciado sesión
        const storedUser = JSON.parse(localStorage.getItem(userEmail));
        
        authButtons.style.display = "none"; // Oculta los botones de Registro e Inicio
        userArea.style.display = "block"; // Muestra el área de usuario
        usernameDisplay.textContent = storedUser.nombre; // Muestra el nombre del usuario
    } else {
        // Usuario no ha iniciado sesión
        authButtons.style.display = "block"; // Muestra los botones de Registro e Inicio
        userArea.style.display = "none"; // Oculta el área de usuario
    }
  }
  
  // Función para cerrar sesión
  function logout() {
    localStorage.removeItem("loggedInUser"); // Elimina el usuario autenticado
    checkAuthStatus(); // Actualiza la interfaz
  }
  
  // Ejecuta la verificación de autenticación al cargar la página
  checkAuthStatus();