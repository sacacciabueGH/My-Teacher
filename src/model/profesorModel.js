import db from '../DB/db.js';

export const crearProfesor = (profesor,callback) => {
    const query = 'INSERT INTO profesores (email, password, nombre, apellido, ciudad, direccion, telefono, materia, disponibilidad, descripcion, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [profesor.email, profesor.password, profesor.nombre, profesor.apellido, profesor.ciudad, profesor.direccion, profesor.telefono, profesor.materia, profesor.disponibilidad, profesor.descripcion, profesor.foto];
    db.query(query, values,callback);
};

export const obtenerProfesores = (callback) => {
    db.query('SELECT * FROM profesores',callback);
};