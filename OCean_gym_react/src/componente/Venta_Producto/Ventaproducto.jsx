import './ventaproducto.css'
import protehwhey from '../img/protehwhey.png'

function Ventaproducto() {
  const products = [
    {
      id: 1,
      name: 'Proteina Whey',
      description: 'Proteína de suero de alta calidad para el desarrollo y la recuperación muscular.',
      price: '15,000',
      image: 'https://vitalikecr.com/wp-content/uploads/2023/01/100whey-5lb-van.jpeg', // Reemplaza con la URL de la imagen correcta
    },
    {
      id: 2,
      name: 'Guantes',
      description: 'Guantes cómodos y duraderos para un mejor agarre durante los entrenamientos.',
      price: '10,000',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLnpx1YfYeZtnb2Mkix3a2lhS7hTyTKsC3YQ&s', // Reemplaza con la URL de la imagen correcta
    },
    {
      id: 3,
      name: 'Botella',
      description: 'Botella mezcladora a prueba de fugas para mezclar batidos de proteínas y suplementos.',
      price: '5,000',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ55myYnNhnqGpl9Ws6pJtAdv6U2NhYpUELPg&s', // Reemplaza con la URL de la imagen correcta
    },
  ];

  return (
      <div className="products-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span>{product.price}</span>
            <button>Comprar</button>
          </div>
        ))}
      </div>
  );
}

export default Ventaproducto;