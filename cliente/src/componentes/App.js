import '../css/App.css';
import { PlayCircleFilled } from "@material-ui/icons";
import React, { useState } from "react";
import youtube from '../imagenes/youtube.svg';

// URL backend (servidor)
const backend_uri = "http://localhost:5000"

async function downloadRequest(url, downloadFormat) {
  // Envía la petición de descarga a una URL personalizada
  let customUrl = `${backend_uri}/download?url=${url}&format=${downloadFormat}`;
  const res = await fetch(customUrl);

  try {
    if (res.status === 200) {
      // Abre la URL personalizada para iniciar la descarga
      window.location.assign(customUrl);
    }
  } catch (e) {
    console.error(e);
  }
}



function App() {
  // Estado
  const [selectedDownloadOption, setSelectedDownloadOption] = useState("mp4");
  

  // HTML
  return (

    <div className="App">
      <div className="container1">
            <img className ="imagen1" src={youtube} />
            <h3> Introduzca la URL del vídeo de YouTube: </h3>
      </div>
      <div className="container2">
      <button id="downloadBtn" onClick={() => downloadRequest(document.getElementById("url_input").value, selectedDownloadOption)}>
          <PlayCircleFilled className="playBtnIcon" />
        </button>

        <div className="row">
          <input type="text" id="url_input" autoComplete="off" placeholder="Paste video URL here"></input>
        </div>

        <div className="row" id="buttonRow">
          <button 
            className={selectedDownloadOption === "mp4" ? "selectedDownloadOption" : "downloadOption"} 
            onClick={() => {setSelectedDownloadOption("mp4")}}
          >
            mp4
          </button>

          <button 
            className={selectedDownloadOption === "mp3" ? "selectedDownloadOption" : "downloadOption"} 
            onClick={() => {setSelectedDownloadOption("mp3")}}
          >
            mp3
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;