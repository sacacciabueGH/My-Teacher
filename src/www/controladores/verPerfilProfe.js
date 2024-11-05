const nombreProfesor = localStorage.getItem('profesorSeleccionado');

if(nombreProfesor){
    document.querySelector('.nombre-profesor p').textContent = nombreProfesor;


    // localStorage.removeItem('profesorSeleccionado');
}


document.querySelector("#contactar-profesor").addEventListener("click",function (){
    const nombreProfesor = document.getElementById("nombre-profesor").textContent;

    localStorage.setItem('nombreProfesor', nombreProfesor);

    window.location.href = 'chatAlumnoProfe.html';
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