const nombreProfesor = localStorage.getItem('profesorSeleccionado');

if(nombreProfesor){
    document.querySelector('.nombre-profesor p').textContent = nombreProfesor;


    localStorage.removeItem('profesorSeleccionado');
}

const botonH = document.getElementById("botonH");
const dropdownMenu = document.getElementById("dropdown-menu");

botonH.addEventListener("click", (event) => {

    event.stopPropagation();

    dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
});

document.addEventListener("click", () => {
    dropdownMenu.style.display = "none";
});