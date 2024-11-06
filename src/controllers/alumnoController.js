import { crearAlumno, obtenerAlumnos, obtenerAlumnoPorId } from '../model/alumnoModel.js';

export const registrarAlumno = (req, res) => {
    const alumno = req.body;
    crearAlumno(alumno, (err) => {
        if (err) return res.status(500).send(err);
        res.send('Alumno creado con exito!',{ alumno });
    });
};

export const traerAlumnos = (req,res) =>{
    obtenerAlumnos((err,resultados)=>{
        if(err) return res.status(500).send(err);
        res.json(resultados);
    })
}

export const buscarAlumnoPorId = (req,res)=>{
    const {id} = req.params;
    obtenerAlumnoPorId(id,(err,alumno)=>{
        if(err){
            console.error("Error al obtener el alumno:", err);
            return res.status(500).json({ error: 'Error al obtener el alumno' });
        }
        if (!alumno) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }
        res.status(200).json(alumno);
    })
}

