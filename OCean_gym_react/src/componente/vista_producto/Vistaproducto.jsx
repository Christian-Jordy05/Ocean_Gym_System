import { useState, useEffect } from 'react';
import './vistaproducto.css';
import Navegar from '../navegacion/navegar';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.img} alt={product.nombre} className="product-image" />
        <div className="highlight-icon">⚡</div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.nombre}</h3>
        <div className="product-rating">
        </div>
        <p className="product-description">{product.descripcion}</p>
        <div className="product-price">  ₡{product.precio}</div>
      </div>
    </div>
  );
};

const Vistaproducto = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/productos/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <Navegar/>
    <div className="product-list">
      <Navegar/>
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </div>
    </>
  );
};

export default Vistaproducto;
