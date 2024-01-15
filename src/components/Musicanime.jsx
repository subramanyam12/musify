import React from 'react';

const MusicAnime = () => {
  return (
    <ul className="wave-menu">
      {Array(5)
        .fill(1)
        .map((_, i) => (
          <li key={i}></li>
        ))}
    </ul>
  );
};

export default MusicAnime;
