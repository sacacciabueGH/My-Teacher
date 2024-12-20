

const botonH = document.getElementById("botonH");
const dropdownMenu = document.getElementById("dropdown-menu");

botonH.addEventListener("click", (event) => {

    event.stopPropagation();

    dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
});

document.addEventListener("click", () => {
    dropdownMenu.style.display = "none";
});

document.getElementById('buscarMateria').addEventListener('click', () => {
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

        const modalProfesor = document.getElementById("modal-profesores");
        modalProfesor.innerHTML = '';
        detallesProfesores.forEach(profesor =>{
            modalProfesor.innerHTML += ` 
            <div class="profesor-design">
                <img src="../img/persona.png" alt="persona">
                <p>${profesor.nombre} ${profesor.apellido}</p> <!-- Aquí es donde añades el nombre del profesor -->
                <img src="../img/check-profesor.png" alt="check-profesor">
                <button class="btnVerProfesor" data-profesor="${profesor.id}">Ver</button>
            </div>
            <div class="estrella-valoracion">
                <img src="../img/estrella-enNegro.png" alt="estrella-valoracion">  
                <img src="../img/estrella-enNegro.png" alt="estrella-valoracion">  
                <img src="../img/estrella-enNegro.png" alt="estrella-valoracion">  
                <img src="../img/estrella-enNegro.png" alt="estrella-valoracion">  
                <img src="../img/estrella-enNegro.png" alt="estrella-valoracion">  
            </div>`;
            localStorage.setItem('idProfesor',profesor.id)
        })
        
        document.querySelectorAll(".btnVerProfesor").forEach(button =>{
            button.addEventListener('click', function(){
                const idProfesor = this.getAttribute('data-profesor');
        
                localStorage.setItem('profesorSeleccionado', idProfesor);
        
                window.location.href = 'verPerfilProfe.html';
            })
        })

        console.log(detallesProfesores)

    } catch (error) {
        console.error('Hubo un problema:', error);
        document.getElementById('resultado').innerText = 'Ocurrió un error al buscar profesores.';
        
        document.querySelectorAll("#btnBuscarMaterias button").forEach(button =>{
            button.style.backgroundColor = '';
        })

        const modalProfesor = document.getElementById("modal-profesores");
        modalProfesor.innerHTML = '';

        setTimeout(() => {
            document.getElementById('resultado').innerText = '';
        },2000)
    }
};

//Filtrar profes por los botones de materias seleccionados
document.querySelectorAll("#btnBuscarMaterias button").forEach( button =>{
    button.addEventListener("click", function(){
        
        document.querySelectorAll("#btnBuscarMaterias button").forEach(button =>{
            button.style.backgroundColor = '';
        })

        button.style.backgroundColor = 'gray';
        const btnMateria = button.value;
        buscarProfesoresDetallesPorMateria(btnMateria);
    })
})

document.addEventListener("click", function(event) {
    // Verificar si el clic fue fuera de los botones de materias
    if (!event.target.closest("#btnBuscarMaterias button")) {
        document.querySelectorAll("#btnBuscarMaterias button").forEach(button => {
            button.style.backgroundColor = ""; // Restablece el color inicial
        });
    }
});




document.getElementById('buscarHora').addEventListener('click',()=>{
    const hora = document.getElementById('disponibilidad').value;
    const horaParseada = parseInt(hora);

    if (!horaParseada) {
        alert("Por favor, ingresa un horario."); // Validar que se haya ingresado un valor
        return;
    }

    buscarProfesoresDetallesPorHorario(horaParseada);

})

// Función para obtener profesores por horario
const obtenerProfesoresPorHorario = (horario) => {
    
    return fetch(`http://localhost:8080/profesores/disponibilidad/${horario}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los profesores por materia: ' + response.statusText);
            }
            return response.json(); // Retorna el array de profesores
            
        });
};

// Función para buscar profesores y sus detalles por materia
const buscarProfesoresDetallesPorHorario = async (disponibilidad) => {
  
    try {
        const profesores = await obtenerProfesoresPorHorario(disponibilidad);
        
        if (profesores.length === 0) {
            document.getElementById('resultado').innerText = 'No se encontraron profesores para este horario.';
            return;
        }

        const detallesPromesas = profesores.map(profesor => obtenerProfesorPorId(profesor.id));
        const detallesProfesores = await Promise.all(detallesPromesas);
          const modalProfesor = document.getElementById("modal-profesores");
          modalProfesor.innerHTML = '';
        detallesProfesores.forEach(profesor => {
            modalProfesor.innerHTML += `
                <div class="profesor-design">
                    <img src="../img/persona.png" alt="persona">
                    <p>${profesor.nombre} ${profesor.apellido}</p> <!-- Aquí es donde añades el nombre del profesor -->
                    <img src="../img/check-profesor.png" alt="check-profesor">
                    <button class="btnVerProfesor" data-profesor="${profesor.id}">Ver</button>
                </div>
                <div class="estrella-valoracion">
                    <img src="../img/estrella-enNegro.png" alt="estrella-valoracion">  
                    <img src="../img/estrella-enNegro.png" alt="estrella-valoracion">  
                    <img src="../img/estrella-enNegro.png" alt="estrella-valoracion">  
                    <img src="../img/estrella-enNegro.png" alt="estrella-valoracion">  
                    <img src="../img/estrella-enNegro.png" alt="estrella-valoracion">  
                </div>`;
        });


        document.querySelectorAll(".btnVerProfesor").forEach(button =>{
            button.addEventListener('click', function(){
                const idProfesor = this.getAttribute('data-profesor');
        
                localStorage.setItem('profesorSeleccionado', idProfesor);
        
                window.location.href = 'verPerfilProfe.html';
            })
        })

        console.log(detallesProfesores)

    } catch (error) {
        console.error('Hubo un problema:', error);
    }
};
