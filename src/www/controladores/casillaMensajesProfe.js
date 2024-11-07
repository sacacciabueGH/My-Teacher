const profesor = JSON.parse(localStorage.getItem('data'));

// Función para obtener los chats del profesor
const obtenerChatsProfesor = async (profesor_id) => {
    try {
        const response = await fetch(`http://localhost:8080/mensajes/profesor/${profesor_id}/chats`);
        if (!response.ok) {
            throw new Error('Error al obtener los chats del profesor');
        }
        return await response.json();
        
    } catch (error) {
        console.error(error);
    }
};

// Función para mostrar los chats en la interfaz
const mostrarChats = (chats) => {
    const chatList = document.querySelector(".chat-list");
    chatList.innerHTML = ""; // Limpiar la lista de chats
    chats.forEach(chat => {
        const chatItem = document.createElement("div");
        chatItem.classList.add("chat-item");
        chatItem.innerHTML = `
            <p><strong>Alumno ID: ${chat.alumno_id}</strong></p>
            <p>${chat.mensaje}</p>
            <p>${new Date(chat.iniciado_en).toLocaleString()}</p>
            <button class="btnChat" data-profesor="${chat.alumno_id}">Ver</button>
        `;
        
        chatItem.addEventListener("click", () => {
            localStorage.setItem('alumnoSeleccionado', chat.alumno_id);
            window.location.href = 'chatProfeAlumno.html';
        });
        
        chatList.appendChild(chatItem);
    });
};

// Función principal para cargar y mostrar los chats del profesor
const cargarChatsProfesor = async () => {
    const chats = await obtenerChatsProfesor(profesor.id);
    mostrarChats(chats);
};

// Ejecutar la función al cargar la página
document.addEventListener("DOMContentLoaded", cargarChatsProfesor);
