const idProfesor = localStorage.getItem('profesorSeleccionado');

document.querySelector("#contactar-profesor").addEventListener("click",function (){
    window.location.href = 'chatAlumnoProfe.html';
})

const nombreProfesor = document.getElementById("nombre-profesor");
const descripcionProfesor = document.getElementById("descripcion-profesor");
const materias = document.getElementById("materias");

const obtenerProfesorPorId = (idProfesor) => {
    return fetch(`http://localhost:8080/profesores/${idProfesor}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el profesor por ID: ' + response.statusText);
            }
            return response.json(); // Retorna el profesor
        });
};

const cargarDatos = async () =>{
    const profesor = await obtenerProfesorPorId(idProfesor);
    nombreProfesor.innerHTML = `${profesor.nombre} ${profesor.apellido}`
    descripcionProfesor.innerHTML = `${profesor.descripcion}`
    materias.innerHTML = `${profesor.materia}`
    
}

cargarDatos();



const botonH = document.getElementById("botonH");
const dropdownMenu = document.getElementById("dropdown-menu");

botonH.addEventListener("click", (event) => {

    event.stopPropagation();

    dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
});

document.addEventListener("click", () => {
    dropdownMenu.style.display = "none";
});