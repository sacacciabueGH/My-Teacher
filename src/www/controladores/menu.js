document.querySelectorAll(".btnVerProfesor").forEach(button =>{
    button.addEventListener('click', function(){
        const nombreProfesor = this.getAttribute('data-profesor');

        localStorage.setItem('profesorSeleccionado', nombreProfesor);

        window.location.href = 'verPerfilProfe.html';
    })
})