const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mssql');

// Crear una aplicación Express
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));  // Permitir solicitudes desde tu frontend
app.use(bodyParser.json());


const corsOptions = {
  origin: "http://localhost:3000", // Tu frontend
  methods: "GET,POST,PUT,DELETE", // Los métodos permitidos
  allowedHeaders: "Content-Type,Authorization", // Los encabezados permitidos
  optionsSuccessStatus: 200, // Para navegadores más antiguos
};
app.use(cors(corsOptions)); // Usar la configuración de CORS


// Configuración de la conexión a SQL Server
const dbConfig = {
  user: 'Enmanuel', // Usuario de la base de datos
  password: 'enmanuel0805', // Contraseña de la base de datos
  server: 'DESKTOP-IVQK8SO', // Dirección del servidor SQL Server
  database: 'Midori', // Nombre de la base de datos
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Ruta para obtener los géneros
app.get('/api/generos', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute('GetGeneros');
    res.json(result.recordset);  // Retorna la lista de géneros
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener géneros');
  }
});

// Ruta para obtener animes por género
app.get('/api/animes', async (req, res) => {
  const generoId = req.query.generoId ? parseInt(req.query.generoId) : null;
  const searchTerm = req.query.search || ''; // Obtener el término de búsqueda

  try {
    const pool = await sql.connect(dbConfig);
    const request = pool.request();
    if (generoId) {
      request.input('GeneroId', sql.Int, generoId);
    }
    // Si hay un término de búsqueda, agregarlo a la consulta
    if (searchTerm) {
      request.input('SearchTerm', sql.NVarChar, `%${searchTerm}%`);
    }

    const result = await request.execute('GetAnimes');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener animes');
  }
});


// Configuración del puerto
const port = 3001;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});