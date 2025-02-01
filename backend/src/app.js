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

// CRUD de Juegos

// Obtener todos los videojuegos
app.get('/games', async (req, res) => {
    try {
        const games = await db('videogames').select('*');
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los videojuegos' });
    }
});

// Obtener un videojuego por ID
app.get('/games/:gameId', async (req, res) => {
    const { gameId } = req.params;
    try {
        const game = await db('videogames').where({ id_videogame: gameId }).first();
        if (!game) return res.status(404).json({ error: 'Videojuego no encontrado' });
        res.json(game);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el videojuego' });
    }
});

// Agregar un nuevo videojuego
app.post('/games', async (req, res) => {
    try {
        const { title, genre, year } = req.body;
        await db('videogames').insert({ title, genre, year });
        res.status(201).json({ message: 'Videojuego agregado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el videojuego' });
    }
});

// Actualizar un videojuego
app.put('/games/:gameId', async (req, res) => {
    const { gameId } = req.params;
    const { title, genre, year } = req.body;
    try {
        const updated = await db('videogames').where({ id_videogame: gameId }).update({ title, genre, year });
        if (!updated) return res.status(404).json({ error: 'Videojuego no encontrado' });
        res.json({ message: 'Videojuego actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el videojuego' });
    }
});

// Eliminar un videojuego
app.delete('/games/:gameId', async (req, res) => {
    const { gameId } = req.params;
    try {
        const deleted = await db('videogames').where({ id_videogame: gameId }).del();
        if (!deleted) return res.status(404).json({ error: 'Videojuego no encontrado' });
        res.json({ message: 'Videojuego eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el videojuego' });
    }
});

// CRUD de Plataformas

// Obtener todas las plataformas
app.get('/platforms', async (req, res) => {
    try {
        const platforms = await db('platforms').select('*');
        res.json(platforms);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las plataformas' });
    }
});

// Obtener una plataforma por ID
app.get('/platforms/:platformId', async (req, res) => {
    const { platformId } = req.params;
    try {
        const platform = await db('platforms').where({ id_platform: platformId }).first();
        if (!platform) return res.status(404).json({ error: 'Plataforma no encontrada' });
        res.json(platform);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la plataforma' });
    }
});

// Agregar una nueva plataforma
app.post('/platforms', async (req, res) => {
    try {
        const { name } = req.body;
        await db('platforms').insert({ name });
        res.status(201).json({ message: 'Plataforma agregada con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la plataforma' });
    }
});

// Actualizar una plataforma
app.put('/platforms/:platformId', async (req, res) => {
    const { platformId } = req.params;
    const { name } = req.body;
    try {
        const updated = await db('platforms').where({ id_platform: platformId }).update({ name });
        if (!updated) return res.status(404).json({ error: 'Plataforma no encontrada' });
        res.json({ message: 'Plataforma actualizada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la plataforma' });
    }
});

// Eliminar una plataforma
app.delete('/platforms/:platformId', async (req, res) => {
    const { platformId } = req.params;
    try {
        const deleted = await db('platforms').where({ id_platform: platformId }).del();
        if (!deleted) return res.status(404).json({ error: 'Plataforma no encontrada' });
        res.json({ message: 'Plataforma eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la plataforma' });
    }
});

// Iniciar el servidor
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`El backend ha iniciado en el puerto ${PORT}`);
});