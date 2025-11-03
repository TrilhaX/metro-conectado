import React from 'react';
import { useNavigate } from 'react-router-dom';
import './mapa.css';

export default function HomeScreen() {
  const navigate = useNavigate();

  const handlePress = (station) => {
    navigate('/detail', { state: { station } });
  };

  return (
    <div className="container">
      <div
        className="mapa"
        style={{
          backgroundImage:
            "url('https://i0.wp.com/diariodostrilhos.com/wp-content/uploads/2024/01/mapa-transporte-2024-.jpeg?fit=1080%2C713&ssl=1')",
        }}
      >
        <h2 className="titulo">
          CLIQUE NA ESTAÇÃO DESEJADA PARA VER O STATUS DO METRÔ
        </h2>

        <button
          className="botao"
          style={{ top: '190px', left: '50px' }}
          onClick={() => handlePress('Metrô Para Guarulhos')}
        >
          🚇 Metrô Para Guarulhos
        </button>

        <button
          className="botao"
          style={{ top: '250px', left: '30px' }}
          onClick={() => handlePress('Metrô Para Congonhas')}
        >
          🚇 Metrô Para Congonhas
        </button>

        <button
          className="botao"
          style={{ top: '140px', right: '40px' }}
          onClick={() => handlePress('Metrô Para Liberdade')}
        >
          🚇 Metrô Para Liberdade
        </button>
      </div>
    </div>
  );
}