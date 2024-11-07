const data = JSON.parse(localStorage.getItem('data'));

if (data) {
    console.log('Bienvenido, ' + data);
} else {
    console.log('No se encontró el email en el localStorage');
}

const nombreProfe = document.getElementById('nombreProfe');
nombreProfe.innerHTML = `Hola ${data.nombre} ${data.apellido}!`;

document.querySelectorAll(".btnVerAlumno").forEach(button =>{
    button.addEventListener('click', function(){
        const nombreAlumno = this.getAttribute('data-alumno');

        localStorage.setItem('alumnoSeleccionado', nombreAlumno);

        window.location.href = 'chatProfeAlumno.html';
    })
})

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

const cargarChatsProfesor = async () => {
    const alumnos = await obtenerChatsProfesor(data.id);
    mostrarChats(alumnos);
};

const traerAlumnoPorId = async (idAlumno) => {
    try {
        const response = await fetch(`http://localhost:8080/alumnos/${idAlumno}`);
        if (!response.ok) {
            throw new Error('Error al obtener el alumno');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

const chatsRecientes = document.getElementById("chatsRecientes");

const mostrarChats = async (alumnos) => {
    for (const alumno of alumnos) {
        try {
            const alumnoLista = await traerAlumnoPorId(alumno.alumno_id);
            chatsRecientes.innerHTML += `
                <div class="alumno-design">
                    <img src="../img/persona.png" alt="persona">
                    <p>${alumnoLista.nombre} ${alumnoLista.apellido}</p>
                    <button class="btnVerAlumno" data-alumno="${alumnoLista.id}">Ver</button>
                </div>
            `;
            document.querySelectorAll(".btnVerAlumno").forEach(button =>{
                button.addEventListener('click', function(){
                    const idAlumno = this.getAttribute('data-alumno');
            
                    localStorage.setItem('alumnoSeleccionado', idAlumno);
            
                    window.location.href = 'chatProfeAlumno.html';
                })
            })
        } catch (error) {
            console.error("Error al mostrar el alumno:", error);
        }
    }
};


cargarChatsProfesor();

const botonH = document.getElementById("botonH");
const dropdownMenu = document.getElementById("dropdown-menu");

botonH.addEventListener("click", (event) => {

    event.stopPropagation();

    dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
});

document.addEventListener("click", () => {
    dropdownMenu.style.display = "none";
});