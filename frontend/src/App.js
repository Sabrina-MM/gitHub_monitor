import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchingData();
    /*
    axios.get('http://localhost:5000/api/hello')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error al llamar a la API:', error);
      });*/
  }, []);

  function fetchingData(){
    fetch("http://localhost:5000/api/hello",{
      method: "GET",
      headers:{},
    }).then((response)=> response.json()).then((data))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Frontend React</h1>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
