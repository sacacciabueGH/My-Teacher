import { crearProfesor, obtenerProfesores } from '../model/profesorModel.js'; 

export const registrarProfesor = (req, res) => {
    const profesor = req.body;  
    crearProfesor(profesor, (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Profesor creado con exito!',{ profesor });
     });
};

export const traerProfesores = (req,res) =>{
    obtenerProfesores((err,resultados)=>{
        if(err) return res.status(500).send(err);
        res.status(200).json(resultados);
    })
}