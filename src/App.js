import React, { useState, useEffect, Fragment } from 'react';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Informacion from './components/Informacion';


function App() {
  
  const [artista, setArtista] = useState('');
  const [letra, setLetra] = useState([]);
  const [info, setInfo] = useState({});

  const consultarAPILetras = async busqueda => {
    const { artista, cancion } = busqueda;
    const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
    console.log('consultando...', url);
    const response = await fetch(url);
    if(response.status !== 200){
      console.log('status : ', response.status);
      console.log('Text : ', response.statusText);
      return false;
    }
    const data = await response.json();
    setArtista(artista);
    setLetra(data.lyrics);
  };

  
  useEffect(
    () => {
      if (Object.keys(artista).length){
        const consultarAPIInfo = async () => {
          const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
          console.log('consultando...', url);
          const response = await fetch(url);
          if(response.status !== 200){
            console.log('status : ', response.status);
            console.log('Text : ', response.statusText);
            return false;
          }
          const data = await response.json();
          if (data.artists.length) setInfo(data.artists[0]);
        }
        consultarAPIInfo(artista);
      }
    }, [artista]);

  return (
    <Fragment>
      <Formulario 
        onSubmit={consultarAPILetras}
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Informacion 
              info={info}
            />
          </div>
          <div className="col-md-6">
            <Cancion 
              letra={letra}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
