import React from 'react';
import AnimeCard from './AnimeCard';

const AnimeList = ({ animes }) => {
  if (!animes || animes.length === 0) {
    return <p>No hay animes disponibles.</p>;
  }

  return (
    <div className="anime-list">
      {animes.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
};

export default AnimeList;
