import React from 'react';

function Cancion({ letra }) {
  if (!letra.length) return null;
  return (
    <>
      <h2>Letra de la Canción</h2>
      <p className="letra">{ letra }</p>  
    </>
  );
}

export default Cancion;
