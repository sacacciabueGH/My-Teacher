document.getElementById("login-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('http://localhost:8080/alumnos/logueoAlumno',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email,password})
        });

        const data = await response.json();
        console.log(data);
        if(response.ok){
            localStorage.setItem('data', data);
            alert('Login exitoso');
            window.location.href = 'menuEstudiante.html';
        }else{
            alert(data.error);
        }


    }catch(error){
        console.log('Error en login', error)
        alert('Hubo un error')
    }
})