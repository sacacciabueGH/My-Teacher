import db from '../DB/db.js';

export const crearAlumno = (alumno,callback) => {
    console.log(alumno)
    const query = 'INSERT INTO alumnos (email, password, nombre, apellido, ciudad, direccion, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [alumno.email, alumno.password, alumno.nombre, alumno.apellido, alumno.ciudad, alumno.direccion, alumno.telefono];
    db.query(query, values,callback);
};

export const obtenerAlumnos = () => {
    db.query('SELECT * FROM alumnos',callback);
};