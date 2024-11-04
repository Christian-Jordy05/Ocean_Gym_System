import React from 'react';
import './cards.css';
import imgfit from '../img/imgfit.png';
import imginfo from '../img/imginfo.png';
import { Link } from 'react-router-dom';

const Cards = ({ title, info, image }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-info">{info}</p>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <div className="cards-container">
        <Link to="/Seleccion_de_Rutinas" style={{ textDecoration: 'none' }}>
          <Cards
            title="RUTINA"
            info="Descubre tu rutina personalizada"
            image={imgfit}
          />
        </Link>
      </div>
    </div>
  );
};

export { Cards };
export default App;