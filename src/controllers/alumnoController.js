import { crearAlumno, obtenerAlumnos, obtenerAlumnoPorId } from '../model/alumnoModel.js';
import bcrypt from 'bcrypt';

export const registrarAlumno = async (req, res) => {
    const alumno = req.body;
    try {
        const saltRounds = 10;
        alumno.password = await bcrypt.hash(alumno.password, saltRounds);
        crearAlumno(alumno, (err) => {
            if (err) {
                console.error("Error al crear el alumno:", err);
                return res.status(500).send({ error: JSON.stringify(err) });
            }
            res.status(200).send({ message: 'Alumno creado con éxito!', alumno });
        });

    } catch (error) {
        console.error("Error al hashear la contraseña:", error);
        res.status(500).json({ message: "Error al hashear la contraseña" });
    }
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

