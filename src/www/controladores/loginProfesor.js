document.getElementById("login-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('http://localhost:8080/profesores/logueoProfesor',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email,password})
        });

        const data = await response.json();
        console.log(data);
        if(response.ok){
            localStorage.setItem('data', data);
            alert('Login exitoso como Profesor');
            window.location.href = 'menuProfesor.html';
        }else{
            alert(data.error);
        }


    }catch(error){
        console.log('Error en login', error)
        alert('Hubo un error')
    }
})