const express = require('express');
const cors = require('cors');
const knex = require('knex'); 

const app = express();
app.use(cors());
app.use(express.json());

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'game.db'
    },
    useNullAsDefault: true
});

//CRUD GAMES
// Obtener todos los videojuegos -> OK
app.get('/games', async (req, res) => {
    try {
        const game = await db('videogames').select('*');
        res.json(game);
    } catch (error) {
        res.status(500).json({ error: 'Error, video games not found' });
    }
});

// Obtener un videojuego por ID -> OK
app.get('/games/:gameId', async (req, res) => {
    const {id_videogame} = req.params;
    try {
        const game = await db('game').select('*').from('videogames').where({ id_videogame: req.params.gameId });
        if (!game) return res.status(404).json({ error: 'Error, video game not found' });
        res.json(game);
    } catch (error) {
        res.status(500).json({ error: 'Error, video game not found' });
    }
});

// Agregar un nuevo videojuego
app.post('/games', async (req, res) => {
    try{
        await db('videogames').insert({
            title: req.body.title,
            genre: req.body.genre,
            year: req.body.year
        });
        res.status(201).json({message: 'Game added successfuly'});
    } catch (error) {
        res.status(500).json({error: 'Error adding a game'})
    }
});

// Actualizar un videojuego
app.put('/games/:gameId', async (req, res) => {
    const { title, genre, year } = req.body;
    try {
        const updated = await db('game').select('*').from('videogames').where({ id_videogame: req.params.gameId }).update({ title, genre, year });
        if (!updated) return res.status(404).json({ error: 'Error, video game not found' });
        res.json({ mensaje: 'Updated video game' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating video game' });
    }
});

// Eliminar un videojuego -> OK
app.delete('/games/:gameId', async (req, res) => {
    try {
        const deleted = await db('game').select('*').from('videogames').where({ id_videogame: req.params.gameId }).del();
        if (!deleted) return res.status(404).json({ error: 'Error, video game not found' });
        res.json({ mensaje: 'Video game deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting video game' });
    }
});




//CRUD 2 ------------------------------------------------------------

app.get('/platforms', async (req, res) => {
    try {
        const game = await db('platforms').select('*');
        res.json(game);
    } catch (error) {
        res.status(500).json({ error: 'Error, platforms not found' });
    }
});

app.get('/platforms/:platformId', async (req, res) => {
    const {id_videogame} = req.params;
    try {
        const game = await db('platforms').select('*').from('platforms').where({ id_platform: req.params.platformId });
        if (!game) return res.status(404).json({ error: 'Error, platform not found' });
        res.json(game);
    } catch (error) {
        res.status(500).json({ error: 'Error, platform not found' });
    }
});

app.post('/platforms', async (req, res) => {
    try{
        await db('platforms').insert({
            name: req.body.name
        });
        res.status(201).json({message: 'platform added successfuly'});
    } catch (error) {
        res.status(500).json({error: 'Error adding a platform'})
    }
});


app.put('/platforms/:platformId', async (req, res) => {
    const { name } = req.body;
    try {
        const updated = await db('game').select('*').from('platforms').where({ id_platform: req.params.platformId }).update({ name });
        if (!updated) return res.status(404).json({ error: 'Error, video game not found' });
        res.json({ mensaje: 'Updated platform' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating video game' });
    }
});

app.delete('/platforms/:platformId', async (req, res) => {
    try {
        const deleted = await db('game').select('*').from('platforms').where({ id_platform: req.params.platformId }).del();
        if (!deleted) return res.status(404).json({ error: 'Error, video game not found' });
        res.json({ mensaje: 'platform deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting video game' });
    }
});

app.listen(8080, () => {
    console.log('El backend ha iniciado en el puerto 8080');
});
