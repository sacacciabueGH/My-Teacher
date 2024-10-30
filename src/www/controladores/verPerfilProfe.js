const nombreProfesor = localStorage.getItem('profesorSeleccionado');

if(nombreProfesor){
    document.querySelector('.nombre-profesor p').textContent = nombreProfesor;


    localStorage.removeItem('profesorSeleccionado');
}