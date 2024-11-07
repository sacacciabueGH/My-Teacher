// Conectarse al servidor de Socket.IO
const socket = io("http://localhost:8080");

// Obtener los IDs del alumno y el profesor desde el localStorage
const data = JSON.parse(localStorage.getItem('data'));
const alumno_id = localStorage.getItem('alumnoSeleccionado');
const profesor_id = data.id;

// Unirse al canal de chat entre el alumno y el profesor
socket.emit("join", { alumno_id, profesor_id });

// Escuchar mensajes entrantes
socket.on("message", (mensaje) => {
    // Agregar el mensaje recibido en el chat
    addMessage(mensaje.mensaje, mensaje.alumno_id === alumno_id ? "enviado" : "recibido");
});

document.getElementById("btn-enviar").addEventListener("click", sendMessage);

function sendMessage() {
    const messageInput = document.getElementById("mensaje-input");
    const messageText = messageInput.value.trim();

    if (messageText === "") return;

    // Añadir el mensaje como enviado en la interfaz
    addMessage(messageText, "enviado");

    // Enviar el mensaje al servidor mediante Socket.IO
    socket.emit("sendMessage", {
        mensaje: messageText,
        alumno_id: alumno_id,
        profesor_id: profesor_id
    });

    // Limpiar el área de entrada
    messageInput.value = "";
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


document.addEventListener("click", () => {
    dropdownMenu.style.display = "none";
});

let mensajesMostrados = new Set();
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(`http://localhost:8080/mensajes/${alumno_id}/${profesor_id}`);
        const mensajes = await response.json();
        console.log(mensajes)

        mensajes.forEach(mensaje => {
            if (!mensajesMostrados.has(mensaje.id)) {  // Verifica que el mensaje no esté ya mostrado
                addMessage(mensaje.mensaje, mensaje.alumno_id === alumno_id ? "enviado" : "recibido");
                addMessage(mensaje.mensaje, mensaje.profesor_id === profesor_id ? "enviado" : "recibido");
                mensajesMostrados.add(mensaje.id); // Añadir el ID del mensaje al conjunto
            }
        });
    } catch (error) {
        console.error("Error al cargar los mensajes anteriores:", error);
    }
});


//FUNCION PARA EL BOTON CERRAR SESION
const botonH = document.getElementById("botonH");
const dropdownMenu = document.getElementById("dropdown-menu");

botonH.addEventListener("click", (event) => {

    event.stopPropagation();

    dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
});

