const data = localStorage.getItem('data');

if (data) {
    console.log('Bienvenido, ' + data);
} else {
    console.log('No se encontró el email en el localStorage');
}

console.log(data.nombre);
const nombreProfe = document.getElementById('nombreProfe');
nombreProfe.innerHTML = data.nombre;

document.querySelectorAll(".btnVerAlumno").forEach(button =>{
    button.addEventListener('click', function(){
        const nombreAlumno = this.getAttribute('data-alumno');

        localStorage.setItem('alumnoSeleccionado', nombreAlumno);

        window.location.href = 'chatProfeAlumno.html';
    })
})



const botonH = document.getElementById("botonH");
const dropdownMenu = document.getElementById("dropdown-menu");

botonH.addEventListener("click", (event) => {

    event.stopPropagation();

    dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
});

document.addEventListener("click", () => {
    dropdownMenu.style.display = "none";
});