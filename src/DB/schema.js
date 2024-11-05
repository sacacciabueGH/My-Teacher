import db from './db.js'; 

//EJECUTAR UNA VEZ CUANDO SE BAJA EL PROYECTO CON EL COMANDO:
//node schema.js    (estando previamente ubicado con el fichero en la carpeta DB)

const crearTablas = () => {
    // Definir la tabla de usuarios
    // const usuariosTable = `
    //     CREATE TABLE usuarios (
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     email VARCHAR(100) UNIQUE NOT NULL,
    //     password VARCHAR(255) NOT NULL,
    //     nombre VARCHAR(50) NOT NULL,
    //     apellido VARCHAR(50) NOT NULL,
    //     ciudad VARCHAR(50),
    //     direccion VARCHAR(100),
    //     telefono VARCHAR(15),
    //     tipo ENUM('alumno', 'profesor') NOT NULL,
    //     creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    //     );
    // `;

    // Definir la tabla de alumnos
    const alumnosTable = `
        CREATE TABLE IF NOT EXISTS alumnos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            nombre VARCHAR(50) NOT NULL,
            apellido VARCHAR(50) NOT NULL,
            ciudad VARCHAR(50),
            direccion VARCHAR(100),
            telefono VARCHAR(15),
            creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    // Definir la tabla de profesores
    const profesoresTable = `
        CREATE TABLE IF NOT EXISTS profesores (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            nombre VARCHAR(50) NOT NULL,
            apellido VARCHAR(50) NOT NULL,
            ciudad VARCHAR(50),
            direccion VARCHAR(100),
            telefono VARCHAR(50),
            creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            materia VARCHAR(255),
            disponibilidad INT,
            descripcion TEXT,
            foto VARCHAR(255)
        );
    `;
    
    //Definir la tabla de los chats
    const chatTable = `
        CREATE TABLE chat (
        id INT AUTO_INCREMENT PRIMARY KEY,
        alumno_id INT NOT NULL,  
        profesor_id INT NOT NULL,
        iniciado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        mensaje TEXT,
        CONSTRAINT fk_alumno_chat FOREIGN KEY (alumno_id) REFERENCES alumnos(id),
        CONSTRAINT fk_profesor_chat FOREIGN KEY (profesor_id) REFERENCES profesores(id)
        );
    `

    const valoracionTable = `
        CREATE TABLE valoraciones (
        id INT AUTO_INCREMENT PRIMARY KEY,
        profesor_id INT NOT NULL,
        alumno_id INT NOT NULL,
        puntuacion INT CHECK (puntuacion BETWEEN 1 AND 5),  -- Puntuación del 1 al 5
        comentario TEXT,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (profesor_id) REFERENCES profesores(id),
        FOREIGN KEY (alumno_id) REFERENCES alumnos(id),
        UNIQUE KEY (alumno_id, profesor_id)  -- Para evitar valoraciones duplicadas
        );
    `

    //Querys que cran las tablas

    db.query(profesoresTable, (err) => {
        if (err) console.error('Error al crear tabla profesores:', err);
        else console.log('Tabla profesores creada o ya existente.');
    });

    db.query(alumnosTable,(err)=>{
        if (err) console.error('Error al crar tabla alumnos: ', err);
        else console.log('Tabla alumnos creada o ya existente.')
    })

    db.query(chatTable,(err)=>{
        if (err) console.error('Error al crar tabla chat: ', err);
        else console.log('Tabla chat creada o ya existente.')
    })
    
    db.query(valoracionTable,(err)=>{
        if (err) console.error('Error al crar tabla valoracion: ', err);
        else console.log('Tabla valoracion creada o ya existente.')
    })

    // db.query(usuariosTable, (err) => {
    //     if (err) console.error('Error al crear tabla usuarios:', err);
    //     else console.log('Tabla usuarios creada o ya existente.');
    // });

};

crearTablas();