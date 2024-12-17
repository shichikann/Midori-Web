import React from 'react';
import './styles/AnimeCard.css';  // Ruta correcta aquí

const AnimeCard = ({ anime }) => {
  return (
    <div className="anime-card">
      <img src={anime.imagen_url} alt={anime.titulo} className="anime-card-image" />
      <div className="anime-card-info">
        <h3>{anime.titulo}</h3>
        <p>{anime.descripcion}</p>
      </div>
    </div>
  );
};

export default AnimeCard;
