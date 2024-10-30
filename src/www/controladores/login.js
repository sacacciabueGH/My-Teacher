document.addEventListener("DOMContentLoaded", function(){

    const btnLogin = document.getElementById("login");
    const userEmail = document.getElementById("email");
    const userPassword = document.getElementById("password");

    

    const usuarioLog = "admin";
    btnLogin.addEventListener("click", function(event){
        event.preventDefault();
        if(userEmail.value == usuarioLog && userPassword.value == usuarioLog){
            window.location.href = "./menu.html";
        }
    })
})