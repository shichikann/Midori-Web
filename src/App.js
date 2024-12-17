import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './styles/App.css';  // Cambié la ruta a ./styles/App.css

import AnimeList from './Components/AnimeList';
import Header from './Components/Header';

function App() {
  const [generos, setGeneros] = useState([]);
  const [animes, setAnimes] = useState([]);  // Asegúrate de que animes sea un array vacío
  const [selectedGenero, setSelectedGenero] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el search bar

  useEffect(() => {
    // Obtener géneros
    const fetchGeneros = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/api/generos');
        setGeneros(response.data);
      } catch (error) {
        console.error("Error al obtener géneros:", error);
      }
    };

    fetchGeneros();
  }, []);

  useEffect(() => {
    // Obtener animes dependiendo del género seleccionado o búsqueda
    const fetchAnimes = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/api/animes', {
          params: { generoId: selectedGenero, search: searchTerm }
        });
        console.log(response.data);  // Agrega esto para verificar lo que recibes de la API
        setAnimes(response.data);  // Asigna la respuesta al estado
      } catch (error) {
        console.error("Error al obtener animes:", error);
      }
    };

    fetchAnimes();
  }, [selectedGenero, searchTerm]);  // Agregar searchTerm en la dependencia

  return (
    <div className="App">
      <Header />
      <div className="filters">
        <input 
          type="text" 
          placeholder="Busca un anime..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="search-bar" 
        />
        <select onChange={(e) => setSelectedGenero(e.target.value)} value={selectedGenero || ""} className="genre-dropdown">
          <option value="">Selecciona un género</option>
          {generos.map(genero => (
            <option key={genero.id} value={genero.id}>{genero.nombre}</option>
          ))}
        </select>
      </div>
      <AnimeList animes={animes} />
    </div>
  );
}

export default App;
