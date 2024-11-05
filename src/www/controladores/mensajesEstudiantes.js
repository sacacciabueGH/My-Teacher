


document.querySelector("#chatId").addEventListener("click",function (){
    const nombreProfesor = document.getElementById("nombre-profesor").textContent;

    localStorage.setItem('nombreProfesor', nombreProfesor);

    window.location.href = 'chatAlumnoProfe.html';
})