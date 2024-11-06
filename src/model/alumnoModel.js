import db from '../DB/db.js';

export const crearAlumno = (alumno,callback) => {
    console.log(alumno)
    const query = 'INSERT INTO alumnos (email, password, nombre, apellido, ciudad, direccion, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [alumno.email, alumno.password, alumno.nombre, alumno.apellido, alumno.ciudad, alumno.direccion, alumno.telefono];
    db.query(query, values,callback);
};

export const obtenerAlumnos = (callback) => {
    db.query('SELECT * FROM alumnos',callback);
};

export const obtenerAlumnoPorId = (id, callback) =>{
    const query = 'SELECT * FROM alumnos WHERE id = ?';
    db.query(query,[id],(err,results)=>{
        if(err) return callback(err,null);
        callback(null,results[0]);
    })
}
