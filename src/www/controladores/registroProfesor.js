document.getElementById("form-register").addEventListener('submit', async function (e) {
    e.preventDefault();

    const archivoFoto = document.getElementById("file-upload").files[0];
    const profesor = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        ciudad: document.getElementById("ciudad").value,
        direccion: document.getElementById("direccion").value,
        telefono: document.getElementById("telefono").value,
        materia: document.getElementById("materias").value,
        disponibilidad: document.getElementById("disponibilidad").value,
        descripcion: document.getElementById("descripcion").value,
    };

    try {
        if (archivoFoto) {
            // Convertir la imagen a Base64
            const reader = new FileReader();
            reader.onloadend = () => {
                profesor.foto = reader.result; // Foto en Base64
                enviarRegistroProfesor(profesor); // Llama a la función para enviar al backend
            };
            reader.readAsDataURL(archivoFoto);
        } else {
            enviarRegistroProfesor(profesor); // Sin foto
        }
    } catch (error) {
        console.error('Error al procesar la foto:', error);
        alert('Hubo un problema al procesar la foto. Por favor, intenta de nuevo.');
    }

})

async function enviarRegistroProfesor(profesor){
    try {
        const response = await fetch('http://localhost:8080/profesores/registrar', {
            method: 'POST',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify(profesor)
        });

        if(!response.ok){
            throw new Error(`Error en el registro: ${response.statusText}`)
        }

        const data = await response.json();
        console.log('Registro exitoso', data);
        alert('registro exitoso');
    } catch (error) {
        console.error('Error en el registro', error);
        alert('Error al registrar el profesor');
    }
}