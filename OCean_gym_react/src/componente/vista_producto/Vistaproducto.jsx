import "./vistaproducto.css";
import  { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);  // Estado para almacenar los productos

  useEffect(() => {
    // Reemplaza esta URL con la de tu API
    fetch('http://localhost:8000/productos/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error al cargar productos:', error));
  }, []);

  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map(product => (
          <div key={product.id} className="product-card">
            <div className="price">${product.precio}</div>
            <img src={product.img} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.descripcion}</p>
              <button>Añadir</button>
            </div>
          </div>
        ))
      ) : (
        <p>Cargando productos...</p>
      )}
    </div>
  );
};

export default ProductList;