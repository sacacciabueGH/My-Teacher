const agregar_materia = document.getElementById("registro_de_materias");
document.getElementById("agregar_materia").addEventListener("click", function (event) {
    event.preventDefault()
    // Selecciona el formulario
    agregar_materia.innerHTML += `<p id="textos_forms">Ingrese una materia por campo</p>
    <input type="text" name="materias[]" id="materias" placeholder="Materia a enseñar">`;

});