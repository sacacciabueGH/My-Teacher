document.querySelectorAll(".btnVerProfesor").forEach(button =>{
    button.addEventListener('click', function(){
        const nombreProfesor = this.getAttribute('data-profesor');

        localStorage.setItem('profesorSeleccionado', nombreProfesor);

        window.location.href = 'verPerfilProfe.html';
    })
})

const botonH = document.getElementById("botonH");
const dropdownMenu = document.getElementById("dropdown-menu");

botonH.addEventListener("click", (event) => {

    event.stopPropagation();

    dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
});

document.addEventListener("click", () => {
    dropdownMenu.style.display = "none";
});

// document.getElementById('buscarButton').addEventListener('click', () => {
//     const materia = document.getElementById('materiaInput').value; // Captura el valor del input

//     if (!materia) {
//         alert("Por favor, ingresa una materia."); // Validar que se haya ingresado un valor
//         return;
//     }

//     // Realiza la solicitud fetch
//     fetch(`http://localhost:8080/profesores/materia/${materia}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error de respuesta' + response.statusText);
//             }
//             return response.json(); // Convierte la respuesta en JSON
//         })
//         .then(data => {
//             // Maneja la respuesta y muestra los resultados
//             data.forEach(element => {
//                 fetch(`http://localhost:8080/profesores/${element.id}`)
//                     .then(response=>{
//                         if(!response.ok){
//                             throw new Error('Error de respuesta' + response.statusText);
//                         }
//                         console.log(response)
//                         return response.json();
//                     })
//                     .catch(error=>{
//                         console.log('Hubo un problema con la solicitud fetch:', error);
//                     })
//             });
//         })
//         .catch(error => {
//             console.error('Hubo un problema con la solicitud fetch:', error);
//         });
// });

document.getElementById('buscarButton').addEventListener('click', () => {
    const materia = document.getElementById('materiaInput').value; // Captura el valor del input

    if (!materia) {
        alert("Por favor, ingresa una materia."); // Validar que se haya ingresado un valor
        return;
    }

    buscarProfesoresDetallesPorMateria(materia); // Llama a la función de búsqueda
});

// Función para obtener profesores por materia
const obtenerProfesoresPorMateria = (materia) => {
    return fetch(`http://localhost:8080/profesores/materia/${materia}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los profesores por materia: ' + response.statusText);
            }
            return response.json(); // Retorna el array de profesores
        });
};

// Función para obtener un profesor por ID
const obtenerProfesorPorId = (id) => {
    return fetch(`http://localhost:8080/profesores/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el profesor por ID: ' + response.statusText);
            }
            return response.json(); // Retorna el profesor
        });
};

// Función para buscar profesores y sus detalles por materia
const buscarProfesoresDetallesPorMateria = async (materia) => {
    try {
        const profesores = await obtenerProfesoresPorMateria(materia);
        
        if (profesores.length === 0) {
            document.getElementById('resultado').innerText = 'No se encontraron profesores para esta materia.';
            return;
        }

        const detallesPromesas = profesores.map(profesor => obtenerProfesorPorId(profesor.id));
        const detallesProfesores = await Promise.all(detallesPromesas);
        console.log(detallesProfesores)

    } catch (error) {
        console.error('Hubo un problema:', error);
        document.getElementById('resultado').innerText = 'Ocurrió un error al buscar profesores.';
    }
};
