import './cards.css'
import imgfit from '../img/imgfit.png'
import imginfo from '../img/imginfo.png'

const Card = ({ title, info, image }) => {
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
        <Card 
          title="RUTINA" 
          image={imgfit}
        />
        <Card 
          title="INFORMACIÓN" 
          image={imginfo}
        />
      </div>
    </div>
  );
};

export default App;
