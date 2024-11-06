document.getElementById("form-register").addEventListener('submit', async function (e) {
    e.preventDefault();

    const estudiante = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        ciudad: document.getElementById("ciudad").value,
        direccion: document.getElementById("direccion").value,
        telefono: document.getElementById("telefono").value
    };

    try {
        const response = await fetch('http://localhost:8080/alumnos/registrarAlumno', {
            method: 'POST',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify(estudiante)
        });

        if(!response.ok){
            throw new Error(`Error en el registro: ${response.statusText}`)
        }

        const data = await response.json();
        console.log('Registro exitoso', data);
        alert('registro exitoso');
    } catch (error) {
        console.error('Error en el registro', error);
        alert('Error al registrar estudiante');
    }
})
