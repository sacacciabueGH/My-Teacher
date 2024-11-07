const data = JSON.parse(localStorage.getItem('data'));

if (data) {
    console.log('Bienvenido, ' + data.nombre);
} else {
    console.log('No se encontró el email en el localStorage');
}
const nombreEstudiante = document.getElementById('nombreEstudiante');
nombreEstudiante.innerHTML = `Hola ${data.nombre} ${data.apellido}!`;

document.querySelectorAll(".btnVerProfesor").forEach(button =>{
    button.addEventListener('click', function(){
        const idProfesor = this.getAttribute('data-profesor');

        localStorage.setItem('profesorSeleccionado', idProfesor);

        window.location.href = 'verPerfilProfe.html';
    })
})

const obtenerProfesores = () => {
    return fetch(`http://localhost:8080/profesores`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el profesor por ID: ' + response.statusText);
            }
            return response.json(); // Retorna el profesor
        });
};

const listaProfesores = document.getElementById("listaProfesores");
const listarProfesores = async () => {
    try {
        const profesores = await obtenerProfesores();
        
        if (profesores.length === 0) {
            document.getElementById('resultado').innerText = 'No se encontraron profesores.';
            return;
        }
        
        listaProfesores.innerHTML = '';
        profesores.forEach(profesor =>{
            listaProfesores.innerHTML += ` 
            <div class="profesor-design">
                    <img src="../img/persona.png" alt="persona">
                    <p>${profesor.nombre} ${profesor.apellido}</p>
                    <img src="../img/check-profesor.png" alt="check-profesor">
                    <button class="btnVerProfesor" data-profesor="${profesor.id}">Ver</button>
                </div>
            `
            localStorage.setItem('idProfesor',profesor.id)
        })
        
        document.querySelectorAll(".btnVerProfesor").forEach(button =>{
            button.addEventListener('click', function(){
                const idProfesor = this.getAttribute('data-profesor');
        
                localStorage.setItem('profesorSeleccionado', idProfesor);
        
                window.location.href = 'verPerfilProfe.html';
            })
        })

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



const botonH = document.getElementById("botonH");
const dropdownMenu = document.getElementById("dropdown-menu");

botonH.addEventListener("click", (event) => {

    event.stopPropagation();

    dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
});

document.addEventListener("click", () => {
    dropdownMenu.style.display = "none";
});

listarProfesores();