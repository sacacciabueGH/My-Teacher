document.addEventListener('DOMContentLoaded', () => {
    const nombreAlumno = localStorage.getItem('alumnoSeleccionado');

    if(nombreAlumno) {
        document.querySelector('.nombre-alumno p').textContent = nombreAlumno;
        localStorage.removeItem('alumnoSeleccionado');
    }
});


document.getElementById("btn-enviar").addEventListener("click", sendMessage);

function sendMessage() {
    const messageInput = document.getElementById("mensaje-input");
    const messageText = messageInput.value.trim();

    if (messageText === "") return;

    // Añade el mensaje como enviado
    addMessage(messageText, "enviado");

    // Limpiar el área de entrada
    messageInput.value = "";

    // Simulación de respuesta después de un segundo
    setTimeout(() => {
        addMessage("Hola!", "recibido");
    }, 1000);
}

function addMessage(text, type) {
    const messagesContainer = document.getElementById("mensajes");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("mensaje", type);
    messageDiv.innerText = text;
    messagesContainer.appendChild(messageDiv);

    // Desplazar el scroll hacia abajo para ver el último mensaje
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

//FUNCION PARA EL BOTON CERRAR SESION
const botonH = document.getElementById("botonH");
const dropdownMenu = document.getElementById("dropdown-menu");

botonH.addEventListener("click", (event) => {

    event.stopPropagation();

    dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
});

document.addEventListener("click", () => {
    dropdownMenu.style.display = "none";
});

