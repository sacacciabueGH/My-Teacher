document.addEventListener("DOMContentLoaded", function(){

    const btnLogin = document.getElementById("login");
    const userEmail = document.getElementById("email");
    const userPassword = document.getElementById("password");

    

    const usuarioLogEstudiante = "estudiante";
    const usuarioLogProfesor = "profesor";
    btnLogin.addEventListener("click", function(event){
        event.preventDefault();
        if(userEmail.value == usuarioLogEstudiante && userPassword.value == usuarioLogEstudiante){
            window.location.href = "./menuEstudiante.html";
        }
        if(userEmail.value == usuarioLogProfesor && userPassword.value == usuarioLogProfesor){
            window.location.href = "./menuProfesor.html";
        }
    })
})