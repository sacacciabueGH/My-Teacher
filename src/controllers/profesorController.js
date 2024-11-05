import { crearProfesor, obtenerProfesores, obtenerProfesorPorId, obtenerProfesorPorMateria } from '../model/profesorModel.js'; 

export const registrarProfesor = (req, res) => {
    const profesor = req.body;  
    crearProfesor(profesor, (err) => {
        if (err) {
            console.error("Error al crear el profesor:", err);
            return res.status(500).send({ error: JSON.stringify(err) });
        }
        res.status(200).send({ message: 'Profesor creado con éxito!', profesor });
    });
};

export const traerProfesores = (req,res) =>{
    obtenerProfesores((err,resultados)=>{
        if(err) return res.status(500).send(err);
        res.json(resultados);
    })
}

export const buscarProfesorPorId = (req, res) => {
    const { id } = req.params;
    obtenerProfesorPorId(id, (err, profesor) => {
        if (err) {
            console.error("Error al obtener el profesor:", err);
            return res.status(500).json({ error: 'Error al obtener el profesor' });
        }
        if (!profesor) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }
        res.status(200).json(profesor);
    });
};

export const buscarProfesorPorMateria = (req, res) => {
    const { materia } = req.params;  
    obtenerProfesorPorMateria(materia, (err, profesores) => {
        if (err) {
            console.error("Error al obtener los profesores:", err);
            return res.status(500).json({ error: 'Error al obtener los profesores' });
        }
        if (profesores.length === 0) {
            return res.status(404).json({ error: 'No se encontraron profesores para esta materia' });
        }
        res.status(200).json(profesores);
    });
};