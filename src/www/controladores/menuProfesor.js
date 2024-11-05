document.querySelectorAll(".btnVerAlumno").forEach(button =>{
    button.addEventListener('click', function(){
        const nombreAlumno = this.getAttribute('data-alumno');

        localStorage.setItem('alumnoSeleccionado', nombreAlumno);

        window.location.href = 'chatProfeAlumno.html';
    })
})
