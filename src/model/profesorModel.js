import db from '../DB/db.js';

export const crearProfesor = (profesor,callback) => {
    const query = 'INSERT INTO profesores (email, password, nombre, apellido, ciudad, direccion, telefono, materia, disponibilidad, descripcion, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [profesor.email, profesor.password, profesor.nombre, profesor.apellido, profesor.ciudad, profesor.direccion, profesor.telefono, profesor.materia, profesor.disponibilidad, profesor.descripcion, profesor.foto];
    db.query(query, values, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

export const obtenerProfesores = (callback) => {
    db.query('SELECT * FROM profesores',callback);
};

export const obtenerProfesorPorId = (id, callback) => {
    const query = 'SELECT nombre,apellido,email FROM profesores WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0]); 
    });
};

export const obtenerProfesorPorMateria = (materia,callback) =>{
    const query = 'SELECT id FROM profesores WHERE materia = ?';
    db.query(query,[materia],(err,results)=>{
        if(err) return callback(err,null);
        callback(null,results);
    })
}