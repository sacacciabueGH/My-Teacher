import express from 'express';
import db from './src/DB/db.js';

const app = express();
const PORT = 8080;


const server = app.listen(PORT,()=>{
    console.log('Escuchando en '+PORT);
})

app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios'; 
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener datos:', err);
            res.status(500).send('Error al obtener datos');
            return;
        }
        res.json(results);
    });
});

