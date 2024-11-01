import { crearAlumno, obtenerAlumnos } from '../model/alumnoModel.js';

export const registrarAlumno = (req, res) => {
    const { alumno} = req.body;
    crearAlumno(alumno, (err) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Alumno creado con exito!',{ alumno });
    });
};

export const traerAlumnos = (req,res) =>{
    obtenerAlumnos((err,resultados)=>{
        if(err) return res.status(500).send(err);
        res.status(200).json(resultados);
    })
}