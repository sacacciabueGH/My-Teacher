const data = localStorage.getItem('data');

if (data) {
    console.log('Bienvenido, ' + data);
} else {
    console.log('No se encontró el email en el localStorage');
}

document.querySelectorAll(".btnVerProfesor").forEach(button =>{
    button.addEventListener('click', function(){
        const nombreProfesor = this.getAttribute('data-profesor');

        localStorage.setItem('profesorSeleccionado', nombreProfesor);

        window.location.href = 'verPerfilProfe.html';
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