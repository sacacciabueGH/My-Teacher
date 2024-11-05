

document.querySelector("#chatId").addEventListener("click",function (){
    const nombreAlumno = document.getElementById("nombre-alumno").textContent;

    localStorage.setItem('alumnoSeleccionado', nombreAlumno);

    window.location.href = 'chatProfeAlumno.html';
})