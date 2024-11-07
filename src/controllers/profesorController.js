import { crearProfesor, obtenerProfesores, obtenerProfesorPorId, obtenerProfesorPorMateria,obtenerProfesorPorHora,logueoProfesor } from '../model/profesorModel.js'; 
import { authPassword } from '../utils/authPsw.js';
import bcrypt from 'bcrypt';

export const registrarProfesor = async (req, res) => {
    const profesor = req.body; 
    try {
        const saltRounds = 10;
        profesor.password = await bcrypt.hash(profesor.password, saltRounds);
        crearProfesor(profesor, (err) => {
            if (err) {
                console.error("Error al crear el profesor:", err);
                return res.status(500).send({ error: JSON.stringify(err) });
            }
            res.status(200).send({ message: 'Profesor creado con éxito!', profesor });
        });

    } catch (error) {
        console.error("Error al hashear la contraseña:", error);
        res.status(500).json({ message: "Error al hashear la contraseña" });
    }
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

export const buscarProfesorPorHora = (req,res)=>{
    const {disponibilidad} = req.params;
    obtenerProfesorPorHora(disponibilidad,(err,profesores)=>{
        if(err){
            console.error("Error al obtener los profesores: ",err);
            return res.status(500).json({error: 'Error al obtener los profesores'});
        }
        if(profesores.length === 0){
            return res.status(404).json({error: 'No se encontraron profesores para esa hora'});
        }
        res.status(200).json(profesores);
    })
}

export const loguearProfesor = (req,res)=>{
    const {email,password} = req.body;
    logueoProfesor(email,(err,profesor)=>{
        if(err){
            console.error("Error al loguear profesor: ",err);
            return res.status(500).json({error: 'Error al loguear profesor'});
        }
        if(profesor.length === null){
            return res.status(404).json({error: 'No se encontraro profesor'});
        }
        authPassword(password,profesor[0].password)
            .then(results => {
                console.log(results)
                let user = {
                    id: profesor[0].id,
                    email: profesor[0].email,
                    nombre: profesor[0].nombre,
                    apellido: profesor[0].apellido,
                    telefono: profesor[0].telefono,
                    direccion: profesor[0].direccion,
                    ciudad: profesor[0].ciudad,
                    materia:profesor[0].materia,
                    disponibilidad:profesor[0].disponibilidad,
                    foto:profesor[0].foto
                }
                res.send(user);
            })
            .catch(err => {
                console.log(err);
                res.send(err);
            })
    })
}